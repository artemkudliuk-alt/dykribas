import os
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

p = "e:/ribas_Dyk"
print("Scanning directories and image files in:", p)

for item in os.listdir(p):
    full_path = os.path.join(p, item)
    if os.path.isdir(full_path):
        count = sum([len(files) for r, d, files in os.walk(full_path)])
        print(f"📁 [DIR] {item:25} ({count} files)")
    elif item.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        sz = os.path.getsize(full_path) / (1024*1024)
        print(f"📄 [IMG] {item:25} ({sz:.2f} MB)")

print("\n--- Files in Photo_screens ---")
photo_p = os.path.join(p, "Photo_screens")
if os.path.exists(photo_p):
    for f in sorted(os.listdir(photo_p)):
        sz = os.path.getsize(os.path.join(photo_p, f)) / (1024*1024)
        print(f"  {f:30} ({sz:.2f} MB)")
