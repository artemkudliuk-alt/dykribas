import os
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

p = "e:/ribas_Dyk/Photo_screens"

transitions = [
    ("1-2.mp4", "2-1.mp4"),
    ("2-3.mp4", "3-2.mp4"),
    ("3-4.mp4", "4-3.mp4"),
    ("4-5.mp4", "5-4.mp4"),
    ("5-6.mp4", "6-5.mp4"),
    ("6-7.mp4", "7-6.mp4")
]

for src, dst in transitions:
    src_path = os.path.join(p, src)
    dst_path = os.path.join(p, dst)
    print(f"Generating reverse video: {src} -> {dst}")
    cmd = [
        "ffmpeg", "-y",
        "-i", src_path,
        "-vf", "reverse",
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-an",
        dst_path
    ]
    subprocess.run(cmd, check=True)
    print(f"  ✓ Created {dst} ({os.path.getsize(dst_path) / (1024*1024):.2f} MB)")

print("\nAll reverse transition videos generated successfully!")
