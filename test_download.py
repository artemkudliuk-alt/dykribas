import os
import requests
import json

test_id = "1Z8u0dBhSuoKLZCn_c0AWF1tquFp61u6E" # from Duke x Giardini (0O8A6025.jpg)
urls = [
    f"https://drive.usercontent.google.com/download?id={test_id}&export=download&authuser=0",
    f"https://lh3.googleusercontent.com/u/0/d/{test_id}=w2400-h1600",
    f"https://drive.google.com/uc?export=download&id={test_id}"
]

for u in urls:
    try:
        r = requests.get(u, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
        print(f"URL: {u[:60]}... Status: {r.status_code}, Length: {len(r.content)}, ContentType: {r.headers.get('content-type')}")
        if r.status_code == 200 and len(r.content) > 5000:
            with open("e:/ribas_Dyk/test_img.jpg", "wb") as f:
                f.write(r.content)
            print("Successfully saved test_img.jpg!")
            break
    except Exception as e:
        print(f"Error {u}: {e}")
