import json
from collections import defaultdict

with open("e:/ribas_Dyk/all_discovered_items.json", "r", encoding="utf-8") as f:
    items = json.load(f)

print(f"Total discovered items: {len(items)}")

folders = [it for it in items if it.get("isFolder")]
files = [it for it in items if not it.get("isFolder")]
images = [it for it in items if it.get("isImage")]

print(f"Subfolders found: {len(folders)}")
print(f"Files found: {len(files)} (Images: {len(images)})")

by_folder = defaultdict(list)
for it in items:
    by_folder[it["parent_folder"]].append(it)

print("\nBreakdown by folder:")
for parent, its in by_folder.items():
    f_count = sum(1 for x in its if x.get("isFolder"))
    img_count = sum(1 for x in its if x.get("isImage"))
    file_count = len(its) - f_count
    print(f" - {parent}: {f_count} subfolders, {img_count} images, {file_count} total files")

print("\nSubfolders to check deeper:")
for f in folders:
    if f['id'] != f.get('parent_folder_id'):
        print(f"   [{f['parent_folder']}] -> {f['text']} (ID: {f['id']})")
