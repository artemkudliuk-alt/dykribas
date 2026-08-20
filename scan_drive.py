import os
import sys
import time
from playwright.sync_api import sync_playwright

def scan_drive():
    target_url = "https://drive.google.com/drive/folders/1ju6QMl_lkV1aEiatNolKuNEsL3gNkcMb"
    os.makedirs("e:/ribas_Dyk/exterior_photos", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1400, "height": 900})
        page.goto(target_url, wait_until="networkidle")
        time.sleep(3)

        # Get folder list
        print("Page title:", page.title())
        
        # Take screenshot of main folder
        page.screenshot(path="e:/ribas_Dyk/drive_main.png")

        # Let's extract all folder rows/elements
        folders = page.evaluate("""() => {
            const rows = Array.from(document.querySelectorAll('[role="row"], [role="treeitem"], [data-id], div[data-target="item"]'));
            return rows.map(r => {
                const text = r.innerText || '';
                const id = r.getAttribute('data-id') || '';
                return { text, id };
            });
        }""")
        
        print("Found items:", len(folders))
        for f in folders[:40]:
            if f['text'].strip():
                print("Item:", f['text'].replace('\\n', ' | '))

        browser.close()

if __name__ == "__main__":
    scan_drive()
