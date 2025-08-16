# Repo Agent Commands

## Global Flags

- `/agent direct` — Attempt direct commit (allowed only if AGENT_ALLOW_DIRECT true; may still force PR if AGENT_REQUIRE_PR true).
- `/agent dry-run` — Simulate changes; nothing written.

## Add

```
/agent add path=src/file.ts
```

```ts
export const value = 1;
```

## Update

```
/agent update path=src/file.ts
```

```ts
export const value = 2;
```

## Multi

```
/agent multi
```

```yaml
files:
  src/a.ts: |
    export const A = 1;
  src/b.ts: |
    export const B = 2;
```

## Patch

```
/agent patch
```

```diff
diff --git a/src/a.ts b/src/a.ts
--- a/src/a.ts
+++ b/src/a.ts
@@
-export const A = 1;
+export const A = 10;
```

## Direct Example

```
/agent direct add path=src/fast.ts
```

```ts
export const fast = true;
```

## Dry Run Example

```
/agent dry-run update path=src/a.ts
```

```ts
export const A = 99;
```

## Security

- Allowlist & deny list from `.agentrc.json`
- Size & count limits enforced
- Paths with `..` rejected

## Formatting

Agent runs ESLint (fix) + Prettier before commit/PR.

## Summary

Results written to `agent-summary.json` and posted in PR body or comment.

## Roadmap Ideas

- Patch reversal
- Selective test execution
- Auto labeling by verb
