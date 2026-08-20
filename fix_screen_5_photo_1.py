import os
import shutil

for root, dirs, files in os.walk("e:/ribas_Dyk"):
    for f in files:
        if "4822" in f:
            full = os.path.join(root, f)
            print("Found 4822:", full)
            shutil.copy2(full, "e:/ribas_Dyk/selected_21_photos/screen_5_photo_1_suite_302_king_bed.jpg")
            shutil.copy2(full, "C:/Users/Jaku/.gemini/antigravity/brain/6ca1e297-358e-42e1-a4d1-ed8c43dec42b/selected_21_photos/screen_5_photo_1_suite_302_king_bed.jpg")
            print("Copied successfully!")
