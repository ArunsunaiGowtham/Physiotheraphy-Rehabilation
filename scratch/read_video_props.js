const { execSync } = require('child_process');

const psScript = `
$shell = New-Object -ComObject Shell.Application
$folder = $shell.Namespace('c:\\Users\\aruns\\OneDrive\\Documents\\Physiotheraphy & Rehabilation\\assets\\videos')
foreach ($item in $folder.Items()) {
    Write-Host "===================================="
    Write-Host "File: $($item.Name)"
    for ($i = 0; $i -le 320; $i++) {
        $val = $folder.GetDetailsOf($item, $i)
        $prop = $folder.GetDetailsOf($null, $i)
        if ($val -and ($prop -match 'Title|Subject|Comment|Author|Duration|Keywords|Frame|Dimensions|Width|Height|Description')) {
            Write-Host "  $prop : $val"
        }
    }
}
`;

try {
  const out = execSync('powershell -NoProfile -Command "' + psScript.replace(/"/g, '\\"') + '"', { encoding: 'utf8' });
  console.log(out);
} catch (e) {
  console.error(e);
}
