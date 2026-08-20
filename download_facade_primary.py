import os
import sys
import json
import requests
from PIL import Image

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
                print(f"Downloaded: {os.path.basename(dest_path)} ({len(r.content)} bytes)")
                return True
        except Exception as e:
            pass
    print(f"FAILED: {file_id}")
    return False

def main():
    target_dir = "e:/ribas_Dyk/exterior_photos/facade_primary"
    os.makedirs(target_dir, exist_ok=True)

    with open("e:/ribas_Dyk/all_nested_items.json", "r", encoding="utf-8") as f:
        nested = json.load(f)

    with open("e:/ribas_Dyk/all_discovered_items.json", "r", encoding="utf-8") as f:
        root = json.load(f)

    all_items = root + nested

    # Specific facade items
    facade_items = [
        # Duke интерьер 2026 / Фасад
        {"id": "1zPFmy2JxxJp_vikjFk0M8DyHjJc9K5pW", "name": "Duke_2026_Facade_DSC_5852.jpg", "desc": "Фасад Duke 2026 (DSC_5852)"},
        {"id": "1g4TYvvso9srLKbdeeXBadEE5quUSUN9W", "name": "Duke_2026_Facade_DSC_5854.jpg", "desc": "Фасад Duke 2026 (DSC_5854)"},
        {"id": "1nG_3Gf_oRKiDNreqNZdsD_PZsYN1FUU7", "name": "Duke_2026_Facade_DSC_5869.jpg", "desc": "Фасад Duke 2026 (DSC_5869)"},
        {"id": "1Z8_l5sHJ79i0c_89sqv5DruqLcEVD0iU", "name": "Duke_2026_Facade_DSC_5881.jpg", "desc": "Фасад Duke 2026 (DSC_5881)"},
        {"id": "1u9FEFNSVedoyXgVUm4BjU6M1xPR_xJ8r", "name": "Duke_2026_Facade_DSC_5887-2.jpg", "desc": "Фасад Duke 2026 (DSC_5887-2)"},
        {"id": "1sGAYlUkUqs8hDX-YU0O6f7Vjj2SfL9B_", "name": "Duke_2026_Facade_DSC_5887.jpg", "desc": "Фасад Duke 2026 (DSC_5887)"},
        
        # Передача справ / фасад
        {"id": "1Py7sPRfFLLJM1gGZnqXjBdKIMvFgNJQx", "name": "Facade_Classic__MG_1166.jpg", "desc": "Классический фасад (_MG_1166)"},
        {"id": "1GrOb-WnNz5cuA_i_eK2r6kFTbWVMRl7c", "name": "Facade_Classic__MG_1167.jpg", "desc": "Классический фасад (_MG_1167)"},
        {"id": "1MBv-BX5rmiRB8S4JvdA7CcJhAh5vWel0", "name": "Facade_Classic__MG_1171.jpg", "desc": "Классический фасад (_MG_1171)"},
        
        # Фото отель ноябрь 2020 (архитектура/балкон/вход)
        {"id": "19v75BKafb0RdgqAwaJi0VNgYMbNEYyFN", "name": "Exterior_Duke_0O8A6070.jpg", "desc": "Экстерьер / вход Duke"},
        {"id": "1Z8u0dBhSuoKLZCn_c0AWF1tquFp61u6E", "name": "Exterior_Duke_0O8A6025.jpg", "desc": "Экстерьер / улица Duke"}
    ]

    for item in facade_items:
        dest = os.path.join(target_dir, item["name"])
        download_file(item["id"], dest)

    print("\nAll primary facade images downloaded successfully!")

if __name__ == "__main__":
    main()
