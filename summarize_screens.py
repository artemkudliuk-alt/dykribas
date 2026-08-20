import os
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')

base_dir = "e:/ribas_Dyk/screens_photos"
screens = [
    "screen_1_welcome_facade",
    "screen_2_restaurant_bar",
    "screen_3_spa_wellness",
    "screen_4_conference_events",
    "screen_5_rooms_pillows",
    "screen_6_leisure_odessa",
    "screen_7_lobby_reception"
]

print("=== Summary of Downloaded Photos per Screen ===")
for s in screens:
    s_path = os.path.join(base_dir, s)
    if os.path.exists(s_path):
        files = [f for f in os.listdir(s_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
        print(f"\n[FOLDER] {s} ({len(files)} files):")
        for f in sorted(files)[:12]:
            f_size = os.path.getsize(os.path.join(s_path, f)) / (1024*1024)
            print(f"   - {f} ({f_size:.2f} MB)")
        if len(files) > 12:
            print(f"   ... and {len(files)-12} more files.")
