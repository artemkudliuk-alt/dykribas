import os
import subprocess
import sys
import shutil
import time
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

p = "e:/ribas_Dyk/Photo_screens"
temp_dir = "e:/ribas_Dyk/opt_temp"
os.makedirs(temp_dir, exist_ok=True)

# 1. Check Hero.png -> 1 - Hero.webp
hero_png = os.path.join(p, "Hero.png")
hero_webp = os.path.join(p, "1 - Hero.webp")
if os.path.exists(hero_png):
    print("Processing Hero.png -> 1 - Hero.webp...")
    im = Image.open(hero_png)
    target_w = 3840
    if im.size[0] > target_w:
        scale = target_w / im.size[0]
        im = im.resize((target_w, int(im.size[1] * scale)), Image.Resampling.LANCZOS)
    im_rgb = im.convert('RGB') if im.mode != 'RGB' else im
    im_rgb.save(hero_webp, "WEBP", quality=92, method=6)
    try:
        os.remove(hero_png)
    except Exception:
        pass
    print(f"  ✓ 1 - Hero.webp created ({os.path.getsize(hero_webp)/(1024*1024):.2f} MB)")

# 2. Identify source videos
# If 1-2(1).mp4 exists, use it as source for 1-2
source_videos = {
    "Hero_banner.mp4": os.path.join(p, "Hero_banner.mp4"),
    "1-2.mp4": os.path.join(p, "1-2(1).mp4") if os.path.exists(os.path.join(p, "1-2(1).mp4")) else os.path.join(p, "1-2.mp4"),
    "2-3.mp4": os.path.join(p, "2-3.mp4"),
    "3-4.mp4": os.path.join(p, "3-4.mp4"),
    "4-5.mp4": os.path.join(p, "4-5.mp4"),
    "5-6.mp4": os.path.join(p, "5-6.mp4"),
    "6-7.mp4": os.path.join(p, "6-7.mp4")
}

print("\n--- Optimizing Videos with FFmpeg (H.264 FastStart 60FPS) ---")
for v_name, src_path in source_videos.items():
    if not os.path.exists(src_path):
        print(f"Source not found: {src_path}")
        continue
    
    out_temp = os.path.join(temp_dir, v_name)
    orig_sz = os.path.getsize(src_path) / (1024*1024)
    print(f"Optimizing {v_name} from {os.path.basename(src_path)} ({orig_sz:.2f} MB)...")
    
    cmd = [
        "ffmpeg", "-y",
        "-i", src_path,
        "-c:v", "libx264",
        "-crf", "18",
        "-preset", "medium",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-an",
        out_temp
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    new_sz = os.path.getsize(out_temp) / (1024*1024)
    print(f"  ✓ {v_name} optimized ({new_sz:.2f} MB)")

# Copy optimized videos into Photo_screens
for v_name in source_videos.keys():
    src_temp = os.path.join(temp_dir, v_name)
    dst_final = os.path.join(p, v_name)
    if os.path.exists(src_temp):
        try:
            if os.path.exists(dst_final):
                os.remove(dst_final)
            shutil.move(src_temp, dst_final)
        except Exception as e:
            # If still locked, copy over
            shutil.copyfile(src_temp, dst_final)

# Clean up 1-2(1).mp4
try:
    if os.path.exists(os.path.join(p, "1-2(1).mp4")):
        os.remove(os.path.join(p, "1-2(1).mp4"))
except Exception:
    pass

print("\n--- Generating 60FPS Reverse Transitions ---")
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

print("\nAll videos & photos successfully optimized and connected!")
