// One dad joke, written to /output/entry.txt.
// Deterministic: no network, no randomness, no timestamps, no input.
// Node 22 runs this TypeScript as-is.
import { mkdirSync, writeFileSync } from "node:fs";

const joke =
  "I asked my son if he wanted to hear a construction joke. He said, 'No thanks, Dad — I'm still working on it.'";

// The sealed scorer only accepts 1–200 characters of non-whitespace
// UTF-8 text. Fail loudly here instead of shipping an invalid entry.
const chars = [...joke].length;
if (chars < 1 || chars > 200 || joke.trim().length === 0) {
  throw new Error(`joke is ${chars} characters, outside the 1-200 gate`);
}

// The grader runs this in a sandbox with /output ready. Outside the
// grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, joke, "utf8");
