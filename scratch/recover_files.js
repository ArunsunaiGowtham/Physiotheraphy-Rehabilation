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

const transcripts = [
  'C:\\Users\\aruns\\.gemini\\antigravity-ide\\brain\\292637d6-ddda-4248-a0c2-5d3a1f86cab3\\.system_generated\\logs\\transcript_full.jsonl',
  'C:\\Users\\aruns\\.gemini\\antigravity-ide\\brain\\293880fc-c9e2-4dfb-af46-5d6af8b3a249\\.system_generated\\logs\\transcript_full.jsonl'
];

async function recoverFiles() {
  for (const tr of transcripts) {
    if (!fs.existsSync(tr)) continue;
    console.log(`Searching in ${tr}...`);
    const fileStream = fs.createReadStream(tr);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    for await (const line of rl) {
      if (!line.includes('write_to_file') && !line.includes('replace_file_content') && !line.includes('view_file')) continue;
      
      targetFiles.forEach(tf => {
        if (line.includes(tf)) {
          try {
            const parsed = JSON.parse(line);
            // check tool_calls
            if (parsed.tool_calls) {
              parsed.tool_calls.forEach(tc => {
                const args = tc.function?.arguments || tc.args;
                if (args && (args.CodeContent || args.Code)) {
                  const content = args.CodeContent || args.Code;
                  if (content.includes('<!DOCTYPE html>')) {
                    console.log(`FOUND FULL FILE write_to_file for ${tf}! length: ${content.length}`);
                    fs.writeFileSync(`scratch/recovered_${tf}`, content, 'utf8');
                  }
                }
              });
            }
            // check response content
            if (parsed.content && typeof parsed.content === 'string' && parsed.content.includes('<!DOCTYPE html>')) {
              // Could be view_file output
              if (parsed.content.includes(tf)) {
                console.log(`FOUND view_file content for ${tf}!`);
              }
            }
          } catch (e) {}
        }
      });
    }
  }
}

recoverFiles();
