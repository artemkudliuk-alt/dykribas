import os
import sys
import json
import requests

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')

def download_file(file_id, dest_path):
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 10000:
        print(f"Already exists: {os.path.basename(dest_path)}")
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
                print(f"Downloaded: {os.path.basename(dest_path)} ({len(r.content)} bytes)")
                return True
        except Exception as e:
            pass
    print(f"FAILED to download: {file_id}")
    return False

def main():
    with open("e:/ribas_Dyk/combined_all_items.json", "r", encoding="utf-8") as f:
        all_items = json.load(f)

    target_dir = "e:/ribas_Dyk/exterior_photos/facade_best"
    os.makedirs(target_dir, exist_ok=True)

    # Find all items from folders containing "фасад" or "балкон"
    selected = []
    for it in all_items:
        parent = it.get("parent_folder", "").lower()
        name = it.get("text", "").lower()
        if it.get("isFolder"):
            continue
            
        # Only image files
        if not name.endswith(('.jpg', '.jpeg', '.png', '.webp')):
            continue

        if "фасад" in parent or "фасад" in name or "балкон" in parent or "балкон" in name or "фото отель_ноябрь 2020" in parent:
            selected.append(it)

    print(f"Found {len(selected)} high-priority facade & balcony images!")
    for it in selected:
        print(f" - [{it['parent_folder']}] {it['text']} ({it['id']})")
        parent_clean = it['parent_folder'].replace('/', '_').replace('\\', '_').replace(' ', '_').replace(':', '_')
        fname = f"{parent_clean}__{it['text']}".replace(' ', '_')
        dest = os.path.join(target_dir, fname)
        download_file(it['id'], dest)

if __name__ == "__main__":
    main()
