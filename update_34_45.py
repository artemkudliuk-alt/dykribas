import os
import subprocess
import sys
import shutil

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

p = "e:/ribas_Dyk/Photo_screens"
temp_dir = "e:/ribas_Dyk/opt_temp"
os.makedirs(temp_dir, exist_ok=True)

targets = [
    ("3-4.mp4", "4-3.mp4"),
    ("4-5.mp4", "5-4.mp4")
]

for forward_name, reverse_name in targets:
    src_fwd = os.path.join(p, forward_name)
    temp_fwd = os.path.join(temp_dir, forward_name)
    rev_path = os.path.join(p, reverse_name)
    
    orig_sz = os.path.getsize(src_fwd) / (1024*1024)
    print(f"\nProcessing {forward_name} (Original: {orig_sz:.2f} MB)...")
    
    # 1. Optimize forward video
    cmd_fwd = [
        "ffmpeg", "-y",
        "-i", src_fwd,
        "-c:v", "libx264",
        "-crf", "18",
        "-preset", "medium",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-an",
        temp_fwd
    ]
    subprocess.run(cmd_fwd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    # Safely replace forward video
    shutil.copyfile(temp_fwd, src_fwd)
    fwd_sz = os.path.getsize(src_fwd) / (1024*1024)
    print(f"  ✓ Optimized {forward_name}: {fwd_sz:.2f} MB")
    
    # 2. Generate reverse video
    print(f"  Generating reverse: {reverse_name}...")
    cmd_rev = [
        "ffmpeg", "-y",
        "-i", src_fwd,
        "-vf", "reverse",
        "-c:v", "libx264",
        "-crf", "18",
        "-preset", "fast",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-an",
        rev_path
    ]
    subprocess.run(cmd_rev, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    rev_sz = os.path.getsize(rev_path) / (1024*1024)
    print(f"  ✓ Created {reverse_name}: {rev_sz:.2f} MB")

shutil.rmtree(temp_dir, ignore_errors=True)

print("\n--- Final Files in Photo_screens ---")
for f in sorted(os.listdir(p)):
    sz = os.path.getsize(os.path.join(p, f)) / (1024*1024)
    print(f"  {f:25} ({sz:.2f} MB)")

print("\nUpdate completed successfully!")
