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
    with open("e:/ribas_Dyk/all_nested_items.json", "r", encoding="utf-8") as f:
        nested_items = json.load(f)

    with open("e:/ribas_Dyk/all_discovered_items.json", "r", encoding="utf-8") as f:
        root_items = json.load(f)

    all_items = root_items + nested_items
    
    # Save combined
    with open("e:/ribas_Dyk/combined_all_items.json", "w", encoding="utf-8") as f:
        json.dump(all_items, f, ensure_ascii=False, indent=2)

    exterior_folders = [
        "Фасад",
        "фасад",
        "Зйомка балкон",
        "Люкс з балконом",
        "3 номер + Одесса",
        "Duke тест фотографа",
        "Дівчина / Одеса",
        "Фото отель_ноябрь 2020",
        "одеса собака"
    ]

    target_dir = "e:/ribas_Dyk/exterior_photos"
    os.makedirs(target_dir, exist_ok=True)

    exterior_files = []
    for it in all_items:
        parent = it.get("parent_folder", "")
        name = it.get("text", "")
        if it.get("isFolder"):
            continue
            
        # Check if parent folder or item name matches exterior keywords
        is_ext = any(ef.lower() in parent.lower() for ef in exterior_folders) or \
                 any(k in name.lower() for k in ["facade", "фасад", "exterior", "street", "opera", "balcony", "балкон", "house", "здание", "дом"])
                 
        if is_ext:
            exterior_files.append(it)

    print(f"Found {len(exterior_files)} exterior-related files!")

    downloaded = 0
    for it in exterior_files:
        fid = it["id"]
        fname = it["text"]
        parent = it["parent_folder"].replace("/", "_").replace("\\", "_").replace(":", "_").replace(" ", "_")
        
        # clean filename
        safe_name = f"{parent}__{fname}".replace(" ", "_").replace("\"", "").replace("'", "")
        if not safe_name.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.mov', '.mp4')):
            safe_name += ".jpg"
            
        dest = os.path.join(target_dir, safe_name)
        if download_file(fid, dest):
            downloaded += 1

    print(f"\nDone! Downloaded {downloaded} exterior files to {target_dir}")

if __name__ == "__main__":
    main()
