import requests
import json
import urllib.parse

requests.packages.urllib3.disable_warnings()

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# Let's search internet archive for specific physical therapy clips with direct mp4 files
def find_ia_mp4(term):
    url = f"https://archive.org/advancedsearch.php?q={urllib.parse.quote(term)}+AND+mediatype:(movies)&fl[]=identifier,title,files&output=json&rows=15"
    try:
        r = requests.get(url, headers=headers, verify=False, timeout=10)
        docs = r.json().get('response', {}).get('docs', [])
        print(f"=== IA matches for '{term}': {len(docs)} ===")
        for d in docs:
            ident = d.get('identifier')
            title = d.get('title')
            # get file metadata
            f_url = f"https://archive.org/metadata/{ident}/files"
            fr = requests.get(f_url, headers=headers, verify=False, timeout=8)
            files = fr.json().get('result', [])
            mp4s = [f['name'] for f in files if f.get('name', '').endswith('.mp4')]
            if mp4s:
                print(f"ID: {ident} | Title: {title}")
                for m in mp4s[:2]:
                    print(f"  https://archive.org/download/{ident}/{m}")
    except Exception as e:
        print(f"Error {term}: {e}")

find_ia_mp4("glute bridge exercise")
find_ia_mp4("bird dog exercise")
find_ia_mp4("mckenzie exercise")
find_ia_mp4("nerve glide")
