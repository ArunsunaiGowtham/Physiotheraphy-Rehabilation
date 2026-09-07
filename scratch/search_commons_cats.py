import requests
import json
import sys

requests.packages.urllib3.disable_warnings()

headers = {'User-Agent': 'PhysioRehabApp/1.0 (test@physiolife.com)'}

# Let's search categories
def check_category(cat_name):
    url = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "format": "json",
        "list": "categorymembers",
        "cmtitle": f"Category:{cat_name}",
        "cmlimit": 50
    }
    try:
        r = requests.get(url, params=params, headers=headers, verify=False, timeout=10)
        members = r.json().get('query', {}).get('categorymembers', [])
        return members
    except Exception as e:
        return []

def search_categories(term):
    url = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "format": "json",
        "list": "search",
        "srsearch": term,
        "srnamespace": 14, # Category namespace
        "srlimit": 10
    }
    r = requests.get(url, params=params, headers=headers, verify=False, timeout=10)
    cats = [x['title'] for x in r.json().get('query', {}).get('search', [])]
    return cats

print("Categories for 'exercise':", search_categories("exercise")[:5])
print("Categories for 'physical therapy':", search_categories("physical therapy")[:5])
print("Categories for 'stretching':", search_categories("stretching")[:5])
print("Categories for 'calisthenics':", search_categories("calisthenics")[:5])
