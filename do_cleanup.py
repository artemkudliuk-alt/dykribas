import os
import sys
import shutil

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

p = "e:/ribas_Dyk"
photo_dir = os.path.join(p, "Photo_screens")

# 1. Clean temporary directories
for temp_folder in ["pipeline_temp", "upscale_temp"]:
    full_temp = os.path.join(p, temp_folder)
    if os.path.exists(full_temp):
        print(f"Deleting temp directory: {temp_folder}...")
        shutil.rmtree(full_temp, ignore_errors=True)

# 2. Clean stray test images in root
for stray in ["drive_main.png", "test_img.jpg"]:
    full_stray = os.path.join(p, stray)
    if os.path.exists(full_stray):
        print(f"Deleting stray image: {stray}...")
        os.remove(full_stray)

# 3. Clean all non-4K-optimized photos in Photo_screens
# The 7 4K-optimized photos to keep:
KEEP_PHOTOS = {
    "1 - Hero.webp",
    "2 - Restaurant.webp",
    "3 - Spa.webp",
    "4 - Hall.webp",
    "5 - Balcony.webp",
    "6 - Lobby.webp",
    "7 - Footer.webp"
}

print("\nCleaning Photo_screens...")
for f in os.listdir(photo_dir):
    full_f = os.path.join(photo_dir, f)
    # If it's an image file
    if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        if f not in KEEP_PHOTOS:
            print(f"  ❌ Deleting: {f}")
            os.remove(full_f)
        else:
            sz = os.path.getsize(full_f) / (1024*1024)
            print(f"  ⭐ KEEPING 4K Master: {f} ({sz:.2f} MB)")

print("\n--- Final List of Files in Photo_screens ---")
for f in sorted(os.listdir(photo_dir)):
    sz = os.path.getsize(os.path.join(photo_dir, f)) / (1024*1024)
    print(f"  {f:25} ({sz:.2f} MB)")

print("\nCleanup completed successfully!")
