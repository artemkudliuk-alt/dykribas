import json

with open("e:/ribas_Dyk/all_nested_items.json", "r", encoding="utf-8") as f:
    nested = json.load(f)

for it in nested:
    if "фасад" in it.get("parent_folder", "").lower():
        print(f"Parent: {it['parent_folder']} | File: {it['text']} | ID: {it['id']} | Aria: {it.get('aria')}")
