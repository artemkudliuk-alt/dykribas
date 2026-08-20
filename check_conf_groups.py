import os
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

p = "e:/ribas_Dyk/screens_photos/screen_4_conference_events"
files = os.listdir(p)

groups = {}
for f in files:
    prefix = f.split("__")[0]
    groups[prefix] = groups.get(prefix, 0) + 1

for k, v in groups.items():
    print(f"{k}: {v} files")
