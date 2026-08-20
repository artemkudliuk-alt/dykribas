import os
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

p = "e:/ribas_Dyk/screens_photos/screen_4_conference_events"
for prefix in ["english_hall", "meeting_room", "meeting_room_PR", "Photo_Conference_банкет_фото", "marine_hall"]:
    matching = [f for f in os.listdir(p) if f.startswith(prefix)]
    print(f"\n--- {prefix} (sample 3) ---")
    for f in matching[:3]:
        size_mb = os.path.getsize(os.path.join(p, f)) / (1024*1024)
        print(f"  {f} ({size_mb:.2f} MB)")
