import os
import sys
import time
import json
import requests
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')

def deep_scan():
    with open("e:/ribas_Dyk/all_discovered_items.json", "r", encoding="utf-8") as f:
        items = json.load(f)

    # Filter out actual subfolders to visit
    subfolders_to_visit = []
    seen_ids = set()
    for it in items:
        if it.get("isFolder") and it["id"] not in seen_ids:
            # Check it's not the same folder id as its parent
            if it["id"] != it.get("parent_folder_id"):
                subfolders_to_visit.append(it)
                seen_ids.add(it["id"])

    print(f"Total nested subfolders to scan: {len(subfolders_to_visit)}")

    all_nested_items = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1600, "height": 1000})

        for sf in subfolders_to_visit:
            sf_id = sf["id"]
            sf_name = sf["text"]
            parent_name = sf.get("parent_folder", "")
            full_path_name = f"{parent_name} / {sf_name}"
            sf_url = f"https://drive.google.com/drive/folders/{sf_id}"

            print(f"\nScanning: [{full_path_name}] ({sf_id})")
            try:
                page.goto(sf_url, wait_until="networkidle", timeout=20000)
                time.sleep(1.5)
            except Exception as e:
                print(f"Error opening {full_path_name}: {e}")
                continue

            for _ in range(3):
                page.mouse.wheel(0, 1000)
                time.sleep(0.4)

            sub_items = page.evaluate("""() => {
                const elements = Array.from(document.querySelectorAll('[data-id], div[data-target="item"], [role="row"]'));
                const list = [];
                const seen = new Set();
                elements.forEach(el => {
                    const id = el.getAttribute('data-id');
                    const text = (el.innerText || '').split('\\n')[0].trim();
                    const aria = el.getAttribute('aria-label') || '';
                    if (id && text && !seen.has(id) && id !== '_gd') {
                        seen.add(id);
                        const isFolder = aria.includes('папка') || aria.includes('Folder') || !text.includes('.');
                        const isImage = /\\.(jpe?g|png|webp|heic|raw|cr2|nef|mov|mp4)$/i.test(text) || aria.includes('Изображение') || aria.includes('Зображення') || aria.includes('Image') || aria.includes('Видео') || aria.includes('Відео');
                        list.push({ id, text, aria, isFolder, isImage });
                    }
                });
                return list;
            }""")

            print(f"  -> Found {len(sub_items)} items in {full_path_name}")
            for it in sub_items:
                it["parent_folder"] = full_path_name
                it["parent_folder_id"] = sf_id
                all_nested_items.append(it)

        browser.close()

    with open("e:/ribas_Dyk/all_nested_items.json", "w", encoding="utf-8") as f:
        json.dump(all_nested_items, f, ensure_ascii=False, indent=2)

    print("\nSaved all_nested_items.json successfully!")

if __name__ == "__main__":
    deep_scan()
