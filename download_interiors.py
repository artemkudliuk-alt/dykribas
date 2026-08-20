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

def main():
    with open("e:/ribas_Dyk/all_nested_items.json", "r", encoding="utf-8") as f:
        nested = json.load(f)

    # Let's target specific interior folders from Duke интерьер 2026 & Передача справ
    targets = {
        "screen_2_restaurant_bar": ["Ресторан", "Ленмар", "ЛенМар_Банкет"],
        "screen_3_spa_wellness": ["Spa", "спа центр"],
        "screen_4_conference_events": ["Конференц-хол", "english hall", "marine hall", "meeting room"],
        "screen_5_rooms_pillows": ["Люкс (202)", "Люкс з балконом (302)", "Напівлюкс (301)", "Стандарт покращенний (304)"],
        "screen_7_lobby_reception": ["Рецепція", "рецепция", "lobby", "hall _2fl", "Лестница"]
    }

    base_dir = "e:/ribas_Dyk/screens_photos"
    for s_key, match_keys in targets.items():
        s_dir = os.path.join(base_dir, s_key)
        os.makedirs(s_dir, exist_ok=True)
        print(f"\nScanning for {s_key}...")
        
        for it in nested:
            parent = it.get("parent_folder", "")
            fname = it.get("text", "")
            if it.get("isFolder") or not fname.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                continue
                
            for mk in match_keys:
                if mk.lower() in parent.lower():
                    clean_p = parent.split("/")[-1].strip().replace(" ", "_")
                    dest_file = f"{clean_p}__{fname}".replace(" ", "_")
                    dest_path = os.path.join(s_dir, dest_file)
                    download_file(it["id"], dest_path)
                    break

    print("\nAll interior targets downloaded!")

if __name__ == "__main__":
    main()
