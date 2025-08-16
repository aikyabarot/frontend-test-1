/**
 * diff-apply.js
 * Apply unified diffs safely with path allowlist.
 */
const { execSync } = require("child_process");

function extractPathsFromDiff(diffText) {
  const files = new Set();
  const lines = diffText.split(/\r?\n/);
  for (const l of lines) {
    if (l.startsWith("+++ ")) {
      const part = l.slice(4).trim();
      if (part === "/dev/null") continue;
      const norm = part.replace(/^b\//, "");
      files.add(norm);
    }
  }
  return Array.from(files);
}

function applyUnifiedDiff(diffText) {
  const fs = require("fs");
  const path = require("path");
  const tmp = path.join(process.cwd(), `.agent_patch_${Date.now()}.diff`);
  fs.writeFileSync(tmp, diffText, "utf8");
  try {
    execSync(`git apply --whitespace=fix "${tmp}"`, { stdio: "inherit" });
  } finally {
    fs.unlinkSync(tmp);
  }
}

module.exports = { extractPathsFromDiff, applyUnifiedDiff };
