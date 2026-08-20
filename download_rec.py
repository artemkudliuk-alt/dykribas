import os
import sys
import json
import requests

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')

def download_file(file_id, dest_path):
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 10000:
        return True
    urls = [
        f"https://drive.usercontent.google.com/download?id={file_id}&export=download&authuser=0",
        f"https://lh3.googleusercontent.com/u/0/d/{file_id}=w2400-h1600",
        f"https://drive.google.com/uc?export=download&id={file_id}"
    ]
    for u in urls:
        try:
            r = requests.get(u, headers={"User-Agent": "Mozilla/5.0"}, timeout=20)
            if r.status_code == 200 and len(r.content) > 5000 and not b"<!DOCTYPE html>" in r.content[:100]:
                with open(dest_path, "wb") as f:
                    f.write(r.content)
                print(f"  + Downloaded: {os.path.basename(dest_path)} ({len(r.content):,} bytes)")
                return True
        except Exception as e:
            pass
    return False

with open("e:/ribas_Dyk/all_nested_items.json", "r", encoding="utf-8") as f:
    nested = json.load(f)

for it in nested:
    p = it.get("parent_folder", "")
    fname = it.get("text", "")
    if "рецеп" in p.lower():
        dest = os.path.join("e:/ribas_Dyk/screens_photos/screen_7_lobby_reception", f"Rec_2026__{fname}".replace(" ", "_"))
        download_file(it["id"], dest)
