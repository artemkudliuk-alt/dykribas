import os
import sys
import time
import json
import urllib.request
from playwright.sync_api import sync_playwright

def run():
    root_url = "https://drive.google.com/drive/folders/1ju6QMl_lkV1aEiatNolKuNEsL3gNkcMb"
    out_dir = "e:/ribas_Dyk/exterior_photos"
    os.makedirs(out_dir, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1600, "height": 1000})
        
        print("Navigating to root folder...")
        page.goto(root_url, wait_until="networkidle")
        time.sleep(3)

        # Get list of folders and items in root
        folders_data = page.evaluate("""() => {
            const rows = Array.from(document.querySelectorAll('c-wiz div[data-id], [role="row"][data-id], div[data-target="item"]'));
            const map = {};
            rows.forEach(r => {
                const id = r.getAttribute('data-id');
                const text = (r.innerText || '').split('\\n')[0].trim();
                const isFolder = r.getAttribute('aria-label')?.includes('папка') || r.getAttribute('aria-label')?.includes('Folder') || !text.includes('.');
                if (id && text && !map[id]) {
                    map[id] = { id, name: text, isFolder };
                }
            });
            return Object.values(map);
        }""")

        print(f"Discovered {len(folders_data)} items in root:")
        for fd in folders_data:
            print(f" - [{fd['id']}] {fd['name']} (Folder: {fd['isFolder']})")

        # Save the list
        with open("e:/ribas_Dyk/folders_manifest.json", "w", encoding="utf-8") as f:
            json.dump(folders_data, f, ensure_ascii=False, indent=2)

        browser.close()

if __name__ == "__main__":
    run()
