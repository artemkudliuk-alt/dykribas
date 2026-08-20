import os
import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

p = "e:/ribas_Dyk/Photo_screens"

images = [
    "1 - Hero_4K.png",
    "2 - Restaurant_4K.png",
    "3 - Spa_4K.png",
    "4 - Hall_4K.png",
    "5 - Balcony_4K.png",
    "6 - Lobby_4K.png",
    "7 - Footer_4K.png"
]

print("Optimizing 4K Master Photos for Web (Target: 1.0 - 1.8 MB per image)...")

# Target 4K dimensions (3840 max width for web standard while retaining 100% retina clarity)
TARGET_WIDTH = 3840

for img_name in images:
    src_path = os.path.join(p, img_name)
    if not os.path.exists(src_path):
        print(f"Skipping {img_name}, not found.")
        continue
    
    im = Image.open(src_path)
    orig_w, orig_h = im.size
    orig_size_mb = os.path.getsize(src_path) / (1024*1024)
    
    # Calculate aspect-ratio scale for 4K
    if orig_w > TARGET_WIDTH:
        scale = TARGET_WIDTH / orig_w
        new_w = TARGET_WIDTH
        new_h = int(orig_h * scale)
        im_resized = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
    else:
        im_resized = im

    # Standard optimized web image (PNG / JPG / WebP)
    # We will save the primary web-optimized PNG replacing 1 - Hero.png etc.
    base_name = img_name.replace("_4K.png", ".png")
    out_png_path = os.path.join(p, base_name)
    
    # Save optimized progressive WebP (lossless-grade 92% quality)
    out_webp_path = os.path.join(p, base_name.replace(".png", ".webp"))
    im_resized.save(out_webp_path, "WEBP", quality=92, method=6)
    
    # Save optimized JPEG/PNG for max compatibility (around 1.5MB)
    out_jpg_path = os.path.join(p, base_name.replace(".png", ".jpg"))
    if im_resized.mode != 'RGB':
        im_rgb = im_resized.convert('RGB')
    else:
        im_rgb = im_resized
    im_rgb.save(out_jpg_path, "JPEG", quality=90, optimize=True, progressive=True, subsampling=0)
    
    # Also save the optimized clean PNG
    im_rgb.save(out_png_path, "PNG", optimize=True)

    sz_webp_mb = os.path.getsize(out_webp_path) / (1024*1024)
    sz_jpg_mb = os.path.getsize(out_jpg_path) / (1024*1024)
    sz_png_mb = os.path.getsize(out_png_path) / (1024*1024)

    print(f"\n📸 {base_name}:")
    print(f"   Original 8K PNG : {orig_size_mb:.2f} MB ({orig_w}x{orig_h})")
    print(f"   ➔ 4K WebP       : {sz_webp_mb:.2f} MB ({im_resized.size[0]}x{im_resized.size[1]}) [92% Quality]")
    print(f"   ➔ 4K JPEG (HQ)  : {sz_jpg_mb:.2f} MB ({im_resized.size[0]}x{im_resized.size[1]}) [Subsampling 4:4:4]")
    print(f"   ➔ 4K PNG (Opt)  : {sz_png_mb:.2f} MB")

print("\nOptimization complete!")
