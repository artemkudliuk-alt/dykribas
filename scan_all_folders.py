import os
import sys
import time
import json
import urllib.request
import requests
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')

def download_file(file_id, dest_path):
    # Try high-res Google CDN url first
    urls = [
        f"https://drive.usercontent.google.com/download?id={file_id}&export=download&authuser=0",
        f"https://drive.google.com/uc?export=download&id={file_id}",
        f"https://lh3.googleusercontent.com/u/0/d/{file_id}=w2400-h1600"
    ]
    for u in urls:
        try:
            r = requests.get(u, timeout=15, headers={"User-Agent": "Mozilla/5.0"})
            if r.status_code == 200 and len(r.content) > 2000 and not b"<!DOCTYPE html>" in r.content[:100]:
                with open(dest_path, "wb") as f:
                    f.write(r.content)
                print(f"Downloaded {dest_path} ({len(r.content)} bytes)")
                return True
        except Exception as e:
            pass
    return False

def scan_and_collect():
    manifest_path = "e:/ribas_Dyk/folders_manifest.json"
    with open(manifest_path, "r", encoding="utf-8") as f:
        folders = json.load(f)

    exterior_dir = "e:/ribas_Dyk/exterior_photos"
    os.makedirs(exterior_dir, exist_ok=True)
    all_discovered = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1600, "height": 1000})

        # Process each folder
        for folder in folders:
            folder_id = folder["id"]
            folder_name = folder["name"]
            folder_url = f"https://drive.google.com/drive/folders/{folder_id}"
            
            print(f"\n[FOLDER] {folder_name} ({folder_id})")
            try:
                page.goto(folder_url, wait_until="networkidle", timeout=20000)
                time.sleep(2)
            except Exception as e:
                print(f"Navigation timeout/error for {folder_name}: {e}")
                continue

            # Scroll down to load all items in folder
            for _ in range(3):
                page.mouse.wheel(0, 1000)
                time.sleep(0.5)

            items = page.evaluate("""() => {
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
                        const isImage = /\\.(jpe?g|png|webp|heic|raw|cr2|nef)$/i.test(text) || aria.includes('Изображение') || aria.includes('Зображення') || aria.includes('Image');
                        list.push({ id, text, aria, isFolder, isImage });
                    }
                });
                return list;
            }""")

            print(f"  -> Found {len(items)} items in {folder_name}")
            for it in items:
                it["parent_folder"] = folder_name
                it["parent_folder_id"] = folder_id
                all_discovered.append(it)
                print(f"     {'[DIR]' if it['isFolder'] else '[FILE]'} {it['text']} ({it['id']})")

        with open("e:/ribas_Dyk/all_discovered_items.json", "w", encoding="utf-8") as f:
            json.dump(all_discovered, f, ensure_ascii=False, indent=2)

        browser.close()

if __name__ == "__main__":
    scan_and_collect()
