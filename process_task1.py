import os
import subprocess
import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

p = "e:/ribas_Dyk/Photo_screens"
tools_exe = "e:/ribas_Dyk/upscale_tools/realesrgan-ncnn-vulkan.exe"
models_dir = "e:/ribas_Dyk/upscale_tools/models"

src_hall = os.path.join(p, "New Hall photo.png")
dst_4k = os.path.join(p, "4 - Hall_4K.png")
dst_webp = os.path.join(p, "4 - Hall.webp")
dst_png = os.path.join(p, "4 - Hall.png")
dst_jpg = os.path.join(p, "4 - Hall.jpg")

print("--- TASK 1: Processing New Hall Photo ---")
print("1. Running Real-ESRGAN x4plus AI Upscale...")
cmd = [
    tools_exe,
    "-i", src_hall,
    "-o", dst_4k,
    "-n", "realesrgan-x4plus",
    "-s", "4",
    "-m", models_dir,
    "-g", "0"
]
subprocess.run(cmd, check=True)
print("  ✓ 4K/8K Upscale generated!")

print("2. Optimizing 4K WebP & JPEG for Web Engine...")
im = Image.open(dst_4k)
orig_w, orig_h = im.size
target_w = 3840

if orig_w > target_w:
    scale = target_w / orig_w
    im_resized = im.resize((target_w, int(orig_h * scale)), Image.Resampling.LANCZOS)
else:
    im_resized = im

im_rgb = im_resized.convert('RGB') if im_resized.mode != 'RGB' else im_resized

# Save WebP, JPG, PNG
im_rgb.save(dst_webp, "WEBP", quality=92, method=6)
im_rgb.save(dst_jpg, "JPEG", quality=90, optimize=True, progressive=True, subsampling=0)
im_rgb.save(dst_png, "PNG", optimize=True)

print(f"  ✓ 4 - Hall.webp : {os.path.getsize(dst_webp)/(1024*1024):.2f} MB ({im_resized.size[0]}x{im_resized.size[1]})")
print(f"  ✓ 4 - Hall.jpg  : {os.path.getsize(dst_jpg)/(1024*1024):.2f} MB")
print(f"  ✓ 4 - Hall.png  : {os.path.getsize(dst_png)/(1024*1024):.2f} MB")
print("TASK 1 COMPLETED SUCCESSFULLY!")
