// Export a lesson's teacher's notes to Markdown:  node tools/notes_md.js u1-01 > transcripts/en/u1-01.md
const fs = require("fs"), path = require("path");
const id = process.argv[2];
global.window = global; global.LESSONS = [];
eval(fs.readFileSync(path.join(__dirname, "..", "src", "lessons", id + ".js"), "utf8"));
const L = LESSONS[0], N = L.notes;
if (!N) { console.error("no notes in " + id); process.exit(1); }
const md = s => s.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, a, b) => `**${b || a}**`)
  .replace(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g, "[$2]($1)").replace(/<\/?(i|em)>/g, "*").replace(/<\/?b>/g, "**")
  .replace(/<code>([^<]+)<\/code>/g, "`$1`").replace(/<[^>]+>/g, "");
let out = `# Teacher's notes · Unit ${L.unit}, Lesson ${L.num}: ${L.title} (${L.titleTr})\n\n`;
out += `*${L.covers}* · Video: ${L.video}\n\n${md(N.intro).replace(" Tap any bold Turkish word to hear it.", "")}\n\n## In short\n\n${N.summary.map(s => "- " + md(s)).join("\n")}\n\n`;
for (const s of N.sections) out += `## ${s.h}${s.ref ? ` *(${s.ref})*` : ""}\n\n${s.p.map(md).join("\n\n")}\n\n`;
out += `---\n\n${md(N.source)}\n`;
process.stdout.write(out);
