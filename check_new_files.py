import os
import sys
import time

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

root_dir = "e:/ribas_Dyk"
print("Scanning for all files and directories in", root_dir)

all_entries = []
for root, dirs, files in os.walk(root_dir):
    for f in files:
        full_p = os.path.join(root, f)
        try:
            mtime = os.path.getmtime(full_p)
            size = os.path.getsize(full_p)
            all_entries.append((mtime, size, full_p))
        except Exception:
            pass

all_entries.sort(key=lambda x: x[0], reverse=True)

print(f"\nTop 30 most recently modified / created files:")
for mtime, size, full_p in all_entries[:30]:
    t_str = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(mtime))
    size_mb = size / (1024*1024)
    rel_p = os.path.relpath(full_p, root_dir)
    print(f"[{t_str}] {size_mb:6.2f} MB - {rel_p}")
