import os
import sys
import requests
import zipfile

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

tools_dir = "e:/ribas_Dyk/upscale_tools"
os.makedirs(tools_dir, exist_ok=True)

url = "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesrgan-ncnn-vulkan-20220424-windows.zip"
zip_path = os.path.join(tools_dir, "realesrgan.zip")

print("Downloading Real-ESRGAN NCNN Vulkan binary...")
r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=60)
if r.status_code == 200:
    with open(zip_path, "wb") as f:
        f.write(r.content)
    print(f"Downloaded {len(r.content):,} bytes. Extracting...")
    with zipfile.ZipFile(zip_path, "r") as z:
        z.extractall(tools_dir)
    print("Extracted successfully!")
    print("Files in tools dir:", os.listdir(tools_dir))
else:
    print("Download failed with status:", r.status_code)
