import subprocess

def download_video(video_id, output_name):
    url = f"https://www.youtube.com/watch?v={video_id}"
    cmd = [
        'yt-dlp',
        '-f', 'best[ext=mp4]/best',
        '--no-mtime',
        '-o', output_name,
        url
    ]
    print(f"Downloading {url} to {output_name}...")
    res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
    print("Return code:", res.returncode)
    print("STDOUT:", res.stdout[-300:] if res.stdout else '')
    print("STDERR:", res.stderr[-300:] if res.stderr else '')

download_video("tIZppe-RB0g", "scratch/mckenzie_pressup.mp4")
download_video("-Q-L8zoKCus", "scratch/sciatic_floss.mp4")
