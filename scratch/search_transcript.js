const fs = require('fs');
const readline = require('readline');

const targetFiles = [
  'service-details.html',
  'therapist-details.html',
  'insurance.html',
  'contact.html',
  'blog-details.html'
];

async function checkTranscript() {
  const fileStream = fs.createReadStream('C:\\Users\\aruns\\.gemini\\antigravity-ide\\brain\\716a1067-0478-4de4-b1a2-53aee5505243\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const found = {};

  for await (const line of rl) {
    targetFiles.forEach(tf => {
      if (line.includes(tf)) {
        found[tf] = (found[tf] || 0) + 1;
      }
    });
  }

  console.log('Matches in transcript_full.jsonl:', found);
}

checkTranscript();
