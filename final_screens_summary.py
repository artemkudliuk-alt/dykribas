import os
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

screens_dir = "e:/ribas_Dyk/screens_photos"
screens = [d for d in os.listdir(screens_dir) if os.path.isdir(os.path.join(screens_dir, d))]
screens.sort()

for s in screens:
    p = os.path.join(screens_dir, s)
    files = [f for f in os.listdir(p) if os.path.isfile(os.path.join(p, f))]
    total_size = sum(os.path.getsize(os.path.join(p, f)) for f in files)
    print(f"\n📂 {s}: {len(files)} files ({total_size / (1024*1024):.1f} MB)")
    # Print first 5 files
    for f in files[:8]:
        size_mb = os.path.getsize(os.path.join(p, f)) / (1024*1024)
        print(f"   • {f} ({size_mb:.2f} MB)")
