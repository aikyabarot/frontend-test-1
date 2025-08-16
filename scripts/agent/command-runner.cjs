/**
 * Enhanced Agent Command Runner
 * Supports: add, update, patch, multi, direct, dry-run.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
let yaml;
try {
  yaml = require("js-yaml");
} catch {
  yaml = {
    load: () => {
      throw new Error("js-yaml not installed");
    },
  };
}
const { extractPathsFromDiff, applyUnifiedDiff } = require("./diff-apply.cjs");

const commentBody = process.env.COMMENT_BODY || "";
const defaultBranch = process.env.DEFAULT_BRANCH || "main";
const allowDirect = (process.env.AGENT_ALLOW_DIRECT || "true") === "true";
const requirePRByDefault = (process.env.AGENT_REQUIRE_PR || "true") === "true";

const CONFIG_FILE = ".agentrc.json";
const DEFAULT_ALLOWED = [
  "src/",
  ".github/workflows/",
  ".github/",
  "scripts/",
  "README.md",
  "docs/",
  "tailwind.config.ts",
  "postcss.config.js",
  ".eslintrc.cjs",
  ".prettierrc",
  ".agentrc.json",
  "package.json",
  "tsconfig.json",
];
let config = {
  allowedPrefixes: DEFAULT_ALLOWED,
  deny: [],
  maxFilesPerComment: 50,
  maxBytesPerFile: 200000,
};
if (fs.existsSync(CONFIG_FILE)) {
  try {
    config = { ...config, ...JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8")) };
  } catch (e) {
    console.warn("Invalid .agentrc.json ignored:", e.message);
  }
}
const norm = (p) => p.replace(/^\.?\/*/, "");
function isAllowedPath(filePath) {
  const n = norm(filePath);
  if (n.includes("..")) return false;
  if (config.deny.some((d) => n === d || n.startsWith(d))) return false;
  return config.allowedPrefixes.some(
    (prefix) => n === prefix || n.startsWith(prefix),
  );
}
function writeOutput(k, v) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`);
}
function flagPresent(flag) {
  const first = commentBody.split(/\r?\n/)[0];
  return first.includes(flag);
}
const DIRECT_MODE = flagPresent("/agent direct") && allowDirect;
const DRY_RUN = flagPresent("/agent dry-run");

function parseCommands(body) {
  const lines = body.split(/\r?\n/);
  const cmds = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (!line.startsWith("/agent")) continue;
    const verbMatch = line.match(
      /\/agent(?:\s+direct)?(?:\s+dry-run)?\s+(\w+)/,
    );
    if (!verbMatch) continue;
    const verb = verbMatch[1];
    if (["add", "update"].includes(verb)) {
      const pathMatch = line.match(/path=([^\s]+)/);
      if (!pathMatch) continue;
      const filePath = pathMatch[1];
      let j = i + 1;
      while (j < lines.length && !lines[j].startsWith("```")) j++;
      if (j >= lines.length) continue;
      j++;
      const content = [];
      while (j < lines.length && !lines[j].startsWith("```"))
        content.push(lines[j++]);
      if (j >= lines.length) continue;
      cmds.push({ type: verb, filePath, content: content.join("\n") });
      i = j;
    } else if (verb === "patch") {
      let j = i + 1;
      while (j < lines.length && !lines[j].startsWith("```")) j++;
      if (j >= lines.length) continue;
      j++;
      const diff = [];
      while (j < lines.length && !lines[j].startsWith("```"))
        diff.push(lines[j++]);
      if (j >= lines.length) continue;
      cmds.push({ type: "patch", diff: diff.join("\n") });
      i = j;
    } else if (verb === "multi") {
      let j = i + 1;
      while (j < lines.length && !lines[j].startsWith("```")) j++;
      if (j >= lines.length) continue;
      j++;
      const y = [];
      while (j < lines.length && !lines[j].startsWith("```"))
        y.push(lines[j++]);
      if (j >= lines.length) continue;
      cmds.push({ type: "multi", yaml: y.join("\n") });
      i = j;
    }
  }
  return cmds;
}
function applyAddUpdate(cmd, res) {
  const { type, filePath, content } = cmd;
  if (!isAllowedPath(filePath)) {
    res.push({
      file: filePath,
      action: type,
      status: "skipped",
      reason: "path-not-allowed",
    });
    return;
  }
  if (type === "add" && fs.existsSync(filePath)) {
    res.push({
      file: filePath,
      action: "add",
      status: "skipped",
      reason: "exists",
    });
    return;
  }
  if (type === "update" && !fs.existsSync(filePath)) {
    res.push({
      file: filePath,
      action: "update",
      status: "skipped",
      reason: "not-found",
    });
    return;
  }
  if (!DRY_RUN) {
    const dir = path.dirname(filePath);
    if (dir && dir !== "." && !fs.existsSync(dir))
      fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, content, "utf8");
  }
  res.push({
    file: filePath,
    action: type,
    status: DRY_RUN ? "dry-run" : type === "add" ? "created" : "updated",
  });
}
function applyMulti(cmd, res) {
  try {
    const data = yaml.load(cmd.yaml);
    if (!data || typeof data !== "object" || !data.files) {
      res.push({ action: "multi", status: "skipped", reason: "invalid-yaml" });
      return;
    }
    const entries = Object.entries(data.files);
    if (entries.length > config.maxFilesPerComment)
      throw new Error("too-many-files");
    for (const [fp, val] of entries) {
      applyAddUpdate(
        {
          type: fs.existsSync(fp) ? "update" : "add",
          filePath: fp,
          content: String(val),
        },
        res,
      );
    }
  } catch (e) {
    res.push({
      action: "multi",
      status: "skipped",
      reason: "yaml-parse-error",
      error: e.message,
    });
  }
}
function applyPatch(cmd, res) {
  const diffText = cmd.diff;
  const files = extractPathsFromDiff(diffText);
  if (!files.length) {
    res.push({ action: "patch", status: "skipped", reason: "no-files" });
    return;
  }
  for (const f of files) {
    if (!isAllowedPath(f)) {
      res.push({
        action: "patch",
        status: "skipped",
        reason: `path-not-allowed: ${f}`,
      });
      return;
    }
  }
  if (!DRY_RUN) {
    try {
      applyUnifiedDiff(diffText);
    } catch (e) {
      res.push({
        action: "patch",
        status: "skipped",
        reason: "apply-failed",
        error: e.message,
      });
      return;
    }
  }
  res.push({ action: "patch", status: DRY_RUN ? "dry-run" : "applied", files });
}
function main() {
  const commands = parseCommands(commentBody);
  if (!commands.length) {
    writeOutput("has_changes", "false");
    writeOutput("direct", "false");
    writeOutput("branch", "");
    return;
  }
  const results = [];
  for (const cmd of commands) {
    if (cmd.type === "add" || cmd.type === "update")
      applyAddUpdate(cmd, results);
    else if (cmd.type === "multi") applyMulti(cmd, results);
    else if (cmd.type === "patch") applyPatch(cmd, results);
    else
      results.push({ action: cmd.type, status: "skipped", reason: "unknown" });
  }
  const changed = results.some((r) =>
    ["created", "updated", "applied"].includes(r.status),
  );
  const summary = {
    directModeRequested: DIRECT_MODE,
    dryRun: DRY_RUN,
    changed,
    results,
  };
  fs.writeFileSync("agent-summary.json", JSON.stringify(summary, null, 2));
  if (DRY_RUN || !changed) {
    writeOutput("has_changes", "false");
    writeOutput("direct", "false");
    writeOutput("branch", "");
    return;
  }
  if (DIRECT_MODE && allowDirect && !requirePRByDefault) {
    writeOutput("has_changes", "true");
    writeOutput("direct", "true");
    writeOutput("branch", "");
  } else if (DIRECT_MODE && allowDirect && requirePRByDefault) {
    const branch =
      "agent/" +
      crypto
        .createHash("sha256")
        .update(commentBody)
        .digest("hex")
        .slice(0, 10);
    writeOutput("has_changes", "true");
    writeOutput("direct", "false");
    writeOutput("branch", branch);
  } else {
    const branch =
      "agent/" +
      crypto
        .createHash("sha256")
        .update(commentBody)
        .digest("hex")
        .slice(0, 10);
    writeOutput("has_changes", "true");
    writeOutput("direct", "false");
    writeOutput("branch", branch);
  }
}
try {
  main();
} catch (e) {
  console.error("Agent failed:", e);
  fs.writeFileSync(
    "agent-summary.json",
    JSON.stringify({ error: e.message }, null, 2),
  );
  writeOutput("has_changes", "false");
  writeOutput("direct", "false");
  writeOutput("branch", "");
  process.exit(0);
}
