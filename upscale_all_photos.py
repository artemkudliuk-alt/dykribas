import os
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

p = "e:/ribas_Dyk/Photo_screens"
tools_exe = "e:/ribas_Dyk/upscale_tools/realesrgan-ncnn-vulkan.exe"
models_dir = "e:/ribas_Dyk/upscale_tools/models"

images = [
    "1 - Hero.png",
    "2 - Restaurant.png",
    "3 - Spa.png",
    "4 - Hall.png",
    "5 - Balcony.png",
    "6 - Lobby.png",
    "7 - Footer.png"
]

print("Batch AI 4K/8K Upscaling for all 7 screens...")
for img in images:
    src = os.path.join(p, img)
    dst = os.path.join(p, img.replace(".png", "_4K.png"))
    
    if os.path.exists(dst):
        print(f"  ✓ Already exists: {os.path.basename(dst)}")
        continue
        
    print(f"Upscaling {img} -> {os.path.basename(dst)}...")
    cmd = [
        tools_exe,
        "-i", src,
        "-o", dst,
        "-n", "realesrgan-x4plus",
        "-s", "4",
        "-m", models_dir,
        "-g", "0"
    ]
    subprocess.run(cmd, check=True)
    sz = os.path.getsize(dst) / (1024*1024)
    print(f"  ✓ Created {os.path.basename(dst)} ({sz:.2f} MB)")

print("\nAll 7 photos upscaled to Ultra HD / 8K resolution successfully!")
