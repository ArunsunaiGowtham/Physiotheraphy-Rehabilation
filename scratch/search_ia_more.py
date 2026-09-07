import requests
import json
import urllib.parse

requests.packages.urllib3.disable_warnings()
headers = {'User-Agent': 'Mozilla/5.0'}

terms = [
    'sciatica',
    'piriformis',
    'nerve glide',
    'lumbar extension',
    'prone cobra',
    'back extension',
    'hamstring stretch',
    'physical therapy back',
    'rehab exercise'
]

for t in terms:
    url = f"https://archive.org/advancedsearch.php?q={urllib.parse.quote(t)}+AND+mediatype:(movies)&fl[]=identifier,title&output=json&rows=8"
    r = requests.get(url, headers=headers, verify=False)
    docs = r.json().get('response', {}).get('docs', [])
    print(f"=== {t} ({len(docs)}) ===")
    for d in docs:
        print(" ", d.get('identifier'), "|", d.get('title'))
