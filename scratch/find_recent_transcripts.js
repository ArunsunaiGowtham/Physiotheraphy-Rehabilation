const fs = require('fs');
const path = require('path');
const base = 'C:\\Users\\aruns\\.gemini\\antigravity-ide\\brain';

const dirs = fs.readdirSync(base).filter(d => fs.statSync(path.join(base, d)).isDirectory());

// Sort dirs by last modified time of transcript_full.jsonl
const transcriptList = [];
dirs.forEach(d => {
  const p = path.join(base, d, '.system_generated', 'logs', 'transcript_full.jsonl');
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    transcriptList.push({ dir: d, mtime: stat.mtime, path: p });
  }
});

transcriptList.sort((a, b) => b.mtime - a.mtime);

console.log('Most recent conversations:');
transcriptList.slice(0, 5).forEach(t => console.log(t.dir, t.mtime));
