import json
import sys
import requests

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

folders = {
    "Giardini_Video": "1wm1pde4NTnsBaLGD5ZEyqcbtfL9b569y",
    "UGC_Mari_Foto": "1kJsf9jkCnbOumSzzvoSqJ1yXkt8IMC-j",
    "UGC_Mari_Video": "1g6tyILNqW93V54bR551sjS8twIkB3B45",
    "Model_Dve_Devushki": "15gfQsizuoxbvs05ppVTI9s5QAiFJ2_j5",
    "Model_Devushka": "1kWSrXFniXfeHmz-VYnvurLdTjtwXLXk_",
    "Model_Parochka": "17mA92LyXZGV3tFwNGf09Cv7KkpGeJUHy"
}

def list_folder_contents(folder_id):
    url = f"https://drive.google.com/embeddedfolderview?id={folder_id}#grid"
    headers = {"User-Agent": "Mozilla/5.0"}
    r = requests.get(url, headers=headers, timeout=15)
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(r.text, "html.parser")
    items = []
    for div in soup.find_all("div", class_="flip-entry"):
        id_div = div.get("id", "")
        file_id = id_div.replace("entry-", "") if id_div.startswith("entry-") else id_div
        text_div = div.find("div", class_="flip-entry-title")
        title = text_div.text.strip() if text_div else ""
        is_f = "flip-entry-folder" in div.get("class", [])
        items.append({"id": file_id, "title": title, "isFolder": is_f})
    return items

for name, fid in folders.items():
    res = list_folder_contents(fid)
    print(f"=== {name} ({len(res)} items) ===")
    for it in res[:10]:
        print(f"  - {it['title']} (id: {it['id']}, folder: {it['isFolder']})")
