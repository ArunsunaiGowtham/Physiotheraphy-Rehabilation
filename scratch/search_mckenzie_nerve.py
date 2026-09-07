import requests
import json
import urllib.parse

requests.packages.urllib3.disable_warnings()
headers = {'User-Agent': 'Mozilla/5.0'}

queries = [
    'mckenzie press',
    'prone press up',
    'prone press',
    'lumbar extension exercise',
    'nerve floss',
    'sciatic nerve',
    'sciatic stretch',
    'seated nerve floss',
    'sciatica exercise'
]

for q in queries:
    url = f"https://archive.org/advancedsearch.php?q={urllib.parse.quote(q)}+AND+mediatype:(movies)&fl[]=identifier,title,description&output=json&rows=10"
    r = requests.get(url, headers=headers, verify=False)
    docs = r.json().get('response', {}).get('docs', [])
    print(f"=== {q} ({len(docs)} matches) ===")
    for d in docs[:5]:
        print(" ", d.get('identifier'), "|", d.get('title'))
