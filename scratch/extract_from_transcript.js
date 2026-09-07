const fs = require('fs');
const readline = require('readline');

async function extractFromTranscript() {
  const fileStream = fs.createReadStream('C:\\Users\\aruns\\.gemini\\antigravity-ide\\brain\\716a1067-0478-4de4-b1a2-53aee5505243\\.system_generated\\logs\\transcript_full.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineIndex = 0;
  for await (const line of rl) {
    lineIndex++;
    if (line.includes('service-details.html') || line.includes('contact.html') || line.includes('insurance.html')) {
      try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
          obj.tool_calls.forEach(tc => {
            console.log(`Line ${lineIndex} ToolCall: ${tc.function?.name || tc.name} args:`, JSON.stringify(tc.function?.arguments || tc.args).substring(0, 120));
          });
        }
        if (obj.content && typeof obj.content === 'string') {
          if (obj.content.includes('<!DOCTYPE html>') && obj.content.includes('service-details.html')) {
            console.log(`Line ${lineIndex} has DOCTYPE and service-details.html (length: ${obj.content.length})`);
          }
        }
      } catch (e) {}
    }
  }
}

extractFromTranscript();
