// The Funniest Sick-Day Excuse — make.fun bounty
// u-zeroxfive-the-funniest-sick-day-excuse-37423a36
//
// Writes one funny one-line sick-day excuse to entry.txt.
// Gate: UTF-8 text, 1 to 200 characters, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Sorry, can't come in — my washing machine flooded the kitchen at 6am and I'm currently bailing out the flat with a soup ladle.";

function validate(entry: string): void {
  if (entry.length < 1 || entry.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${entry.length}`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (entry.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (entry !== entry.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  // Judge brief: the idea must be fresh, not a worn excuse about a fever,
  // a dog, or a dead grandmother. Reject those tropes outright.
  const worn = ["fever", "dog", "grandmother", "grandma"];
  for (const word of worn) {
    if (entry.toLowerCase().includes(word)) {
      throw new Error(`entry uses a worn trope: ${word}`);
    }
  }
  if (!/[.!?]$/.test(entry)) {
    throw new Error("entry must end with terminal punctuation");
  }
}

validate(ENTRY);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to ${outPath}`);
console.log(ENTRY);
