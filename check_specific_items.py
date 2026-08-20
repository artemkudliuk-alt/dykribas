import json

with open("e:/ribas_Dyk/all_nested_items.json", "r", encoding="utf-8") as f:
    items = json.load(f)

for it in items:
    parent = it.get("parent_folder", "")
    if "ресторан" in parent.lower() or "ленмар" in parent.lower() or "spa" in parent.lower():
        print(f"[{parent}] -> {it['text']} ({it['id']})")
