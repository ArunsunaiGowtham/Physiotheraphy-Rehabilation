const fs = require('fs');
const readline = require('readline');

const targetFiles = [
  'service-details.html',
  'therapist-details.html',
  'insurance.html',
  'contact.html',
  'blog-details.html'
];

async function checkCurrentConv() {
  const fileStream = fs.createReadStream('C:\\Users\\aruns\\.gemini\\antigravity-ide\\brain\\716a1067-0478-4de4-b1a2-53aee5505243\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    targetFiles.forEach(tf => {
      if (line.includes(tf) && (line.includes('replace_file_content') || line.includes('multi_replace_file_content'))) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.tool_calls) {
            parsed.tool_calls.forEach(tc => {
              const args = tc.function?.arguments || tc.args;
              if (args && args.TargetFile && args.TargetFile.endsWith(tf)) {
                console.log(`Edit to ${tf}:`, tc.function?.name || tc.name, args.Instruction || args.Description);
              }
            });
          }
        } catch (e) {}
      }
    });
  }
}

checkCurrentConv();
