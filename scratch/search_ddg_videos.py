import requests
import re
from urllib.parse import quote, unquote

requests.packages.urllib3.disable_warnings()
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

queries = [
    'glute bridge filetype:mp4',
    'bird dog exercise filetype:mp4',
    'mckenzie press up filetype:mp4',
    'sciatic nerve floss filetype:mp4'
]

for q in queries:
    url = f'https://html.duckduckgo.com/html/?q={quote(q)}'
    try:
        r = requests.get(url, headers=headers, verify=False, timeout=10)
        # duckduckgo redirects links via //duckduckgo.com/l/?uddg=...
        uddg_links = re.findall(r'//duckduckgo\.com/l/\?uddg=([^&"\']+)', r.text)
        print(f"Results for '{q}': {len(uddg_links)} links")
        for u in uddg_links[:5]:
            decoded = unquote(u)
            if '.mp4' in decoded.lower():
                print("  MP4:", decoded)
            else:
                print("  Link:", decoded[:80])
    except Exception as e:
        print(f"Error for {q}: {e}")
