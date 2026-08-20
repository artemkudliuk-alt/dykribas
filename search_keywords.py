import json
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

with open("e:/ribas_Dyk/all_nested_items.json", "r", encoding="utf-8") as f:
    nested = json.load(f)

for it in nested:
    p = it.get("parent_folder", "")
    t = it.get("text", "")
    if any(k in p.lower() or k in t.lower() for k in ["giardini", "ugc", "відео", "видео", "opera", "опер"]):
        print(f"[{p}] -> {t} (id: {it.get('id')})")
