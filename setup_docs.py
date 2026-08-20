import os
import shutil
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

src_dir = "e:/ribas_Dyk/Файлы"
dst_dir = "e:/ribas_Dyk/docs"
os.makedirs(dst_dir, exist_ok=True)

files_map = {
    "Меню подушок Дюк (2).pdf": "pillow_menu.pdf",
    "дюк.pdf": "duke_guest_guide.pdf",
    "ribas Duke.pdf": "duke_hotel_info.pdf"
}

for src_name, dst_name in files_map.items():
    src_path = os.path.join(src_dir, src_name)
    dst_path = os.path.join(dst_dir, dst_name)
    if os.path.exists(src_path):
        shutil.copyfile(src_path, dst_path)
        sz_mb = os.path.getsize(dst_path) / (1024*1024)
        print(f"✓ Copied & prepared: {dst_name} ({sz_mb:.2f} MB)")

print("PDF setup complete!")
