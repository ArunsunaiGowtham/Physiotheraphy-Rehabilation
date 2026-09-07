const fs = require('fs');
const path = require('path');
const readline = require('readline');

const targetFiles = [
  'service-details.html',
  'therapist-details.html',
  'insurance.html',
  'contact.html',
  'blog-details.html'
];

const base = 'C:\\Users\\aruns\\.gemini\\antigravity-ide\\brain';
const dirs = fs.readdirSync(base).filter(d => fs.statSync(path.join(base, d)).isDirectory());

async function findPhysioFiles() {
  for (const tf of targetFiles) {
    let bestContent = null;
    let bestTime = 0;
    let bestSource = '';

    for (const d of dirs) {
      const tr = path.join(base, d, '.system_generated', 'logs', 'transcript_full.jsonl');
      if (!fs.existsSync(tr)) continue;
      
      const fileStream = fs.createReadStream(tr);
      const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

      for await (const line of rl) {
        if (!line.includes(tf) || !line.includes('PhysioLife')) continue;
        try {
          const parsed = JSON.parse(line);
          if (parsed.tool_calls) {
            parsed.tool_calls.forEach(tc => {
              const args = tc.function?.arguments || tc.args;
              if (args && args.TargetFile && args.TargetFile.endsWith(tf)) {
                if (args.CodeContent && args.CodeContent.includes('<!DOCTYPE html>') && args.CodeContent.includes('PhysioLife')) {
                  console.log(`[FOUND PHYSIOLIFE WRITE] ${tf} in ${d} (size: ${args.CodeContent.length})`);
                  bestContent = args.CodeContent;
                  bestSource = `${d} write_to_file`;
                }
              }
            });
          }
        } catch (e) {}
      }
    }

    if (bestContent) {
      fs.writeFileSync(`scratch/physio_${tf}`, bestContent, 'utf8');
      console.log(`Successfully saved scratch/physio_${tf} (${bestContent.length} bytes) from ${bestSource}`);
    } else {
      console.log(`Could not find write_to_file with PhysioLife for ${tf}`);
    }
  }
}

findPhysioFiles();
