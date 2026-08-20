import os
import sys
import time

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

p = "e:/ribas_Dyk"
print("Scanning for recent image files in:", p)

recent_images = []
for root, dirs, files in os.walk(p):
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.mp4')):
            full_p = os.path.join(root, f)
            try:
                mtime = os.path.getmtime(full_p)
                size = os.path.getsize(full_p)
                recent_images.append((mtime, size, full_p))
            except Exception:
                pass

recent_images.sort(key=lambda x: x[0], reverse=True)

for mtime, size, full_p in recent_images[:15]:
    t_str = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(mtime))
    size_mb = size / (1024*1024)
    rel_p = os.path.relpath(full_p, p)
    print(f"[{t_str}] {size_mb:6.2f} MB - {rel_p}")
