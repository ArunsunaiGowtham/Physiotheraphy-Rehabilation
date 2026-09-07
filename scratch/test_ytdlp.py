import subprocess
import json

def search_yt(query, max_results=3):
    cmd = [
        'yt-dlp',
        f'ytsearch{max_results}:{query}',
        '--dump-single-json',
        '--flat-playlist',
        '--no-warnings'
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
    if res.returncode == 0:
        data = json.loads(res.stdout)
        entries = data.get('entries', [])
        print(f"=== Results for '{query}' ===")
        for e in entries:
            print(f"Title: {e.get('title')}")
            print(f"ID: {e.get('id')}, Duration: {e.get('duration')}s")
            print(f"URL: https://www.youtube.com/watch?v={e.get('id')}")
    else:
        print("Error:", res.stderr[:200])

search_yt("McKenzie prone press up physical therapy demonstration", 3)
search_yt("seated sciatic nerve flossing demonstration physical therapy", 3)
