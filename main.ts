// The Word You'd Delete From the Dictionary — make.fun entry.
// Writes the single word to delete to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt). Deterministic, no network.
//
// The pick: "Monday". Delete the word and the week loses its most hated
// day: no more "Monday blues", no "case of the Mondays", no Monday-morning
// meeting to dread — Tuesday just follows Sunday. The word even sounds
// like what it is: moan-day.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = `Monday`;

// Kit gate: 1-77 UTF-8 chars, not only whitespace, and exactly one word
// (no spaces, nothing attached). Fail loudly instead of writing an entry
// the judge would reject.
const len = [...ENTRY].length;
const words = ENTRY.trim().split(/\s+/).filter(Boolean);
if (len < 1 || len > 77 || ENTRY.trim().length === 0 || words.length !== 1) {
  console.error(`Entry rejected by local gate: ${len} chars, ${words.length} words (must be 1-77 chars, non-blank, exactly one word).`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote ${[...ENTRY].length} characters to ${join(outDir, "entry.txt")}`);
