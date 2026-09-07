const fs = require('fs');
const readline = require('readline');

async function getEdits() {
  const fileStream = fs.createReadStream('C:\\Users\\aruns\\.gemini\\antigravity-ide\\brain\\716a1067-0478-4de4-b1a2-53aee5505243\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.includes('therapist-details.html') || line.includes('blog-details.html')) {
      try {
        const parsed = JSON.parse(line);
        if (parsed.tool_calls) {
          parsed.tool_calls.forEach(tc => {
            const args = tc.function?.arguments || tc.args;
            if (args && (args.TargetFile?.endsWith('therapist-details.html') || args.TargetFile?.endsWith('blog-details.html'))) {
              console.log('--- EDIT FOR ' + args.TargetFile + ' ---');
              console.log('TargetContent:\n' + args.TargetContent);
              console.log('ReplacementContent:\n' + args.ReplacementContent);
            }
          });
        }
      } catch (e) {}
    }
  }
}

getEdits();
