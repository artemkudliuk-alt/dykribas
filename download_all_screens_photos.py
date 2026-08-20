import os
import sys
import json
import requests
import shutil

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
            r = requests.get(u, headers={"User-Agent": "Mozilla/5.0"}, timeout=25)
            if r.status_code == 200 and len(r.content) > 5000 and not b"<!DOCTYPE html>" in r.content[:100]:
                with open(dest_path, "wb") as f:
                    f.write(r.content)
                print(f"  + Downloaded: {os.path.basename(dest_path)} ({len(r.content):,} bytes)")
                return True
        except Exception as e:
            pass
    print(f"  - FAILED: {file_id}")
    return False

def main():
    base_dir = "e:/ribas_Dyk/screens_photos"
    os.makedirs(base_dir, exist_ok=True)

    with open("e:/ribas_Dyk/combined_all_items.json", "r", encoding="utf-8") as f:
        all_items = json.load(f)

    screens_config = {
        "screen_1_welcome_facade": {
            "name": "ЭКРАН 1: Фасад и Приветствие",
            "folders": ["Фасад", "фасад"],
            "copy_from": "e:/ribas_Dyk/exterior_photos/facade_primary"
        },
        "screen_2_restaurant_bar": {
            "name": "ЭКРАН 2: Ресторан LenMar & Бар",
            "folders": ["Ресторан / Ленмар", "Duke интерьер 2026 / Ресторан", "Ресторан / Фото блюд", "Ресторан / Сезонное меню", "Зйомка банкетного меню Ленмар", "Ресторан / Десерты", "Ресторан / Индивидуальные завтраки", "Роберто готує 15.07.2025"]
        },
        "screen_3_spa_wellness": {
            "name": "ЭКРАН 3: SPA & Wellness",
            "folders": ["Duke интерьер 2026 / Spa", "Передача справ / спа центр"]
        },
        "screen_4_conference_events": {
            "name": "ЭКРАН 4: Конференц-сервис & Бизнес-ивенты",
            "folders": ["Duke интерьер 2026 / Конференц-хол", "Конференц зал", "Івент/ конференц", "Передача справ / english hall", "Передача справ / marine hall", "Передача справ / meeting room _RV", "Передача справ / meeting room_PR", "Передача справ / Photo_Conference_банкет фото", "Саша подушки конференції зал"]
        },
        "screen_5_rooms_pillows": {
            "name": "ЭКРАН 5: Номерной фонд & Меню подушек",
            "folders": ["Duke интерьер 2026 / Люкс (202)", "Duke интерьер 2026 / Люкс з балконом (302)", "Duke интерьер 2026 / Напівлюкс (301)", "Duke интерьер 2026 / Стандарт покращенний (304)", "Duke интерьер 2026 / Стандарт твін (207)", "Duke интерьер 2026 / Стандарт мансардний (603)", "Номера по категория", "Фотоконтент/видеоконтент / Номера"]
        },
        "screen_6_leisure_odessa": {
            "name": "ЭКРАН 6: Досуг & Культурная Одесса",
            "folders": ["Зйомка балкон жовтень 2025", "Старые кадры / 3 номер + Одесса", "Дівчина / Одеса 27.09.2025", "одеса собака", "Duke x Giardini", "UGC"]
        },
        "screen_7_lobby_reception": {
            "name": "ЭКРАН 7: Лобби, Рецепция & Консьерж-сервис",
            "folders": ["Duke интерьер 2026 / Рецепція", "Передача справ / рецепция", "Передача справ / lobby", "Передача справ / Лестница", "Передача справ / hall _2fl", "Фотоконтент/видеоконтент / Модели"]
        }
    }

    # First copy screen 1
    s1_dir = os.path.join(base_dir, "screen_1_welcome_facade")
    os.makedirs(s1_dir, exist_ok=True)
    src_s1 = "e:/ribas_Dyk/exterior_photos/facade_primary"
    if os.path.exists(src_s1):
        for f in os.listdir(src_s1):
            shutil.copy2(os.path.join(src_s1, f), os.path.join(s1_dir, f))
        print(f"[OK] Populated screen_1_welcome_facade with {len(os.listdir(s1_dir))} photos.")

    # Process screens 2 to 7
    for s_key, s_data in list(screens_config.items())[1:]:
        s_dir = os.path.join(base_dir, s_key)
        os.makedirs(s_dir, exist_ok=True)
        print(f"\n==========================================")
        print(f"Processing {s_data['name']} -> {s_key}")
        print(f"==========================================")

        matched_items = []
        for it in all_items:
            parent = it.get("parent_folder", "")
            name = it.get("text", "")
            if it.get("isFolder"):
                continue
            if not name.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                continue

            # Check if parent folder matches any of the screen's target folders
            for tf in s_data["folders"]:
                if tf.lower() in parent.lower():
                    matched_items.append(it)
                    break

        print(f"Found {len(matched_items)} matching images for {s_key}.")

        # Download images (limit to top 25 high quality per screen to keep fast and focused)
        count = 0
        for it in matched_items[:30]:
            fid = it["id"]
            fname = it["text"]
            p_clean = it["parent_folder"].split("/")[-1].strip().replace(" ", "_")
            dest_name = f"{p_clean}__{fname}".replace(" ", "_")
            dest_path = os.path.join(s_dir, dest_name)
            if download_file(fid, dest_path):
                count += 1

        print(f"Downloaded {count} images to {s_dir}")

if __name__ == "__main__":
    main()
