import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

p = "e:/ribas_Dyk/screens_photos/screen_7_lobby_reception"
files = os.listdir(p)
print(f"Total files in lobby_reception: {len(files)}")
for f in files[:20]:
    size_mb = os.path.getsize(os.path.join(p, f)) / (1024*1024)
    print(f"  {f} ({size_mb:.2f} MB)")

with open("e:/ribas_Dyk/all_nested_items.json", "r", encoding="utf-8") as f:
    items = json.load(f)

print("\n=== Searching Drive for Receptionist / Luggage / Model checkin ===")
for it in items:
    p_f = it.get("parent_folder", "")
    t = it.get("text", "")
    if any(k in p_f.lower() or k in t.lower() for k in ["рецепц", "reception", "лобб", "lobby", "багаж", "luggage", "check", "стойк", "персонал", "вільні руки", "свободные руки"]):
        print(f"[{p_f}] -> {t} (id: {it.get('id')})")
