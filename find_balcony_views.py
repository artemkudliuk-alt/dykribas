import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

with open("e:/ribas_Dyk/all_nested_items.json", "r", encoding="utf-8") as f:
    items = json.load(f)

print("=== Searching for balcony / view items ===")
for it in items:
    p = it.get("parent_folder", "")
    t = it.get("text", "")
    if any(k in p.lower() or k in t.lower() for k in ["балкон", "вид", "view", "опер", "вулиц", "улиц"]):
        print(f"[{p}] -> {t} (id: {it.get('id')})")
