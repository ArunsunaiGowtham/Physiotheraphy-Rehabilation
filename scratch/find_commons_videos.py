import urllib.request
import urllib.parse
import json

def search_commons_videos(term):
    print(f"=== Searching Commons for: {term} ===")
    query = f"filetype:video {term}"
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&prop=imageinfo&iiprop=url|mime|size&gsrlimit=10"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    import ssl
    ctx = ssl._create_unverified_context()
    try:
        with urllib.request.urlopen(req, context=ctx) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                title = p.get('title')
                info = p.get('imageinfo', [{}])[0]
                print(f"Title: {title}")
                print(f"URL: {info.get('url')}")
                print(f"MIME: {info.get('mime')}, Size: {info.get('size')}")
    except Exception as e:
        print(f"Error: {e}")

search_commons_videos("exercise")
search_commons_videos("rehabilitation")
search_commons_videos("stretching")
