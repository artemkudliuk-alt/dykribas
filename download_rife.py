import os
import sys
import requests
import zipfile

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

tools_dir = "e:/ribas_Dyk/upscale_tools/rife"
os.makedirs(tools_dir, exist_ok=True)

url = "https://github.com/nihui/rife-ncnn-vulkan/releases/download/20221029/rife-ncnn-vulkan-20221029-windows.zip"
zip_path = os.path.join(tools_dir, "rife.zip")

print("Downloading RIFE NCNN Vulkan binary...")
try:
    r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=60)
    if r.status_code == 200:
        with open(zip_path, "wb") as f:
            f.write(r.content)
        print(f"Downloaded {len(r.content):,} bytes. Extracting...")
        with zipfile.ZipFile(zip_path, "r") as z:
            z.extractall(tools_dir)
        print("Extracted RIFE successfully!")
        print("Files in RIFE dir:", os.listdir(tools_dir))
    else:
        print("Download failed with status:", r.status_code)
except Exception as e:
    print("Error:", e)
