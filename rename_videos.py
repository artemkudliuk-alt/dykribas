import os
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

p = "e:/ribas_Dyk/Photo_screens"
files = os.listdir(p)

print("Renaming files in:", p)
for f in files:
    if "(1)" in f or " (1)" in f:
        new_name = f.replace("(1)", "").replace(" (1)", "").strip()
        # if a space was left before extension e.g. "Hero .mp4", fix it
        new_name = new_name.replace(" .mp4", ".mp4")
        old_path = os.path.join(p, f)
        new_path = os.path.join(p, new_name)
        
        if os.path.exists(new_path) and old_path != new_path:
            os.remove(new_path)
            
        os.rename(old_path, new_path)
        print(f"  ✓ {f} -> {new_name}")

print("\nFinal list of files in Photo_screens:")
for f in sorted(os.listdir(p)):
    sz = os.path.getsize(os.path.join(p, f)) / (1024*1024)
    print(f"  {f:25} ({sz:.2f} MB)")
