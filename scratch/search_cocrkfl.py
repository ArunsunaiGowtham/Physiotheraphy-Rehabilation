import requests
import json

requests.packages.urllib3.disable_warnings()
headers = {'User-Agent': 'Mozilla/5.0'}

url = "https://archive.org/advancedsearch.php?q=cocrkfl+OR+creator:(cocrkfl)+OR+identifier:(cocrkfl*)&fl[]=identifier,title,description&output=json&rows=50"
r = requests.get(url, headers=headers, verify=False)
docs = r.json().get('response', {}).get('docs', [])
print(f"Total cocrkfl items: {len(docs)}")
for d in docs:
    print(d.get('identifier'), "|", d.get('title'))
