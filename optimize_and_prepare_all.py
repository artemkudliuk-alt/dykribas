import os
import subprocess
import sys
import shutil
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

p = "e:/ribas_Dyk/Photo_screens"

print("--- 1. Processing Updated Video 1-2 ---")
new_12 = os.path.join(p, "1-2(1).mp4")
target_12 = os.path.join(p, "1-2.mp4")
if os.path.exists(new_12):
    if os.path.exists(target_12):
        os.remove(target_12)
    os.rename(new_12, target_12)
    print("  ✓ Replaced 1-2.mp4 with updated version.")

print("\n--- 2. Creating 1 - Hero.webp from Hero.png ---")
hero_png = os.path.join(p, "Hero.png")
hero_webp = os.path.join(p, "1 - Hero.webp")
if os.path.exists(hero_png):
    im = Image.open(hero_png)
    target_w = 3840
    if im.size[0] > target_w:
        scale = target_w / im.size[0]
        im = im.resize((target_w, int(im.size[1] * scale)), Image.Resampling.LANCZOS)
    im_rgb = im.convert('RGB') if im.mode != 'RGB' else im
    im_rgb.save(hero_webp, "WEBP", quality=92, method=6)
    os.remove(hero_png)
    print(f"  ✓ 1 - Hero.webp created ({os.path.getsize(hero_webp)/(1024*1024):.2f} MB)")

print("\n--- 3. Optimizing Videos with FFmpeg (H.264 FastStart 60FPS) ---")
videos = [
    "Hero_banner.mp4",
    "1-2.mp4",
    "2-3.mp4",
    "3-4.mp4",
    "4-5.mp4",
    "5-6.mp4",
    "6-7.mp4"
]

temp_dir = "e:/ribas_Dyk/opt_temp"
os.makedirs(temp_dir, exist_ok=True)

for v in videos:
    src_v = os.path.join(p, v)
    if not os.path.exists(src_v):
        continue
    temp_v = os.path.join(temp_dir, v)
    orig_sz = os.path.getsize(src_v) / (1024*1024)
    print(f"Optimizing {v} (Original: {orig_sz:.2f} MB)...")
    
    cmd = [
        "ffmpeg", "-y",
        "-i", src_v,
        "-c:v", "libx264",
        "-crf", "18",
        "-preset", "medium",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-an",
        temp_v
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    new_sz = os.path.getsize(temp_v) / (1024*1024)
    shutil.move(temp_v, src_v)
    print(f"  ✓ {v} optimized: {orig_sz:.2f} MB -> {new_sz:.2f} MB")

print("\n--- 4. Generating 60FPS Reverse Transitions ---")
transitions = [
    ("1-2.mp4", "2-1.mp4"),
    ("2-3.mp4", "3-2.mp4"),
    ("3-4.mp4", "4-3.mp4"),
    ("4-5.mp4", "5-4.mp4"),
    ("5-6.mp4", "6-5.mp4"),
    ("6-7.mp4", "7-6.mp4")
]

for src, rev in transitions:
    src_path = os.path.join(p, src)
    rev_path = os.path.join(p, rev)
    print(f"Generating reverse: {src} -> {rev}...")
    cmd = [
        "ffmpeg", "-y",
        "-i", src_path,
        "-vf", "reverse",
        "-c:v", "libx264",
        "-crf", "18",
        "-preset", "fast",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-an",
        rev_path
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    rev_sz = os.path.getsize(rev_path) / (1024*1024)
    print(f"  ✓ Created {rev} ({rev_sz:.2f} MB)")

shutil.rmtree(temp_dir, ignore_errors=True)

print("\n--- Final Files in Photo_screens ---")
for f in sorted(os.listdir(p)):
    sz = os.path.getsize(os.path.join(p, f)) / (1024*1024)
    print(f"  {f:25} ({sz:.2f} MB)")

print("\nAll videos & photos successfully prepared and optimized!")
