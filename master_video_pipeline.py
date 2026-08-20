import os
import subprocess
import sys
import shutil
import time

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

BASE_DIR = "e:/ribas_Dyk"
PHOTO_DIR = os.path.join(BASE_DIR, "Photo_screens")
TEMP_DIR = os.path.join(BASE_DIR, "pipeline_temp")
LOG_FILE = os.path.join(BASE_DIR, "master_pipeline_log.txt")

REALESRGAN_EXE = os.path.join(BASE_DIR, "upscale_tools", "realesrgan-ncnn-vulkan.exe")
MODELS_DIR = os.path.join(BASE_DIR, "upscale_tools", "models")

RIFE_EXE = os.path.join(BASE_DIR, "upscale_tools", "rife", "rife-ncnn-vulkan-20221029-windows", "rife-ncnn-vulkan.exe")
RIFE_MODELS = os.path.join(BASE_DIR, "upscale_tools", "rife", "rife-ncnn-vulkan-20221029-windows", "rife-v4.6")

VIDEOS_TO_PROCESS = [
    {"name": "1-2.mp4", "reverse": "2-1.mp4"},
    {"name": "2-3.mp4", "reverse": "3-2.mp4"},
    {"name": "3-4.mp4", "reverse": "4-3.mp4"},
    {"name": "4-5.mp4", "reverse": "5-4.mp4"},
    {"name": "5-6.mp4", "reverse": "6-5.mp4"},
    {"name": "6-7.mp4", "reverse": "7-6.mp4"},
    {"name": "Hero.mp4", "reverse": None}
]

def log(msg):
    t_stamp = time.strftime("[%H:%M:%S]")
    line = f"{t_stamp} {msg}"
    print(line)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(line + "\n")

with open(LOG_FILE, "w", encoding="utf-8") as f:
    f.write("=== RIBAS DUKE MASTER 4K VIDEO PIPELINE (HIGH-SPEED GPU) ===\n")

log("Starting Fast GPU 4-Step Video Processing Pipeline for all 7 Videos...")
total_start = time.time()

for idx, item in enumerate(VIDEOS_TO_PROCESS, start=1):
    v_start = time.time()
    v_name = item["name"]
    rev_name = item["reverse"]
    src_video = os.path.join(PHOTO_DIR, v_name)
    
    log(f"\n==========================================")
    log(f"Processing [{idx}/7]: {v_name}")
    log(f"==========================================")
    
    frames_in = os.path.join(TEMP_DIR, "frames_in")
    frames_upscaled = os.path.join(TEMP_DIR, "frames_upscaled")
    frames_interpolated = os.path.join(TEMP_DIR, "frames_interpolated")
    
    shutil.rmtree(TEMP_DIR, ignore_errors=True)
    os.makedirs(frames_in, exist_ok=True)
    os.makedirs(frames_upscaled, exist_ok=True)
    os.makedirs(frames_interpolated, exist_ok=True)
    
    # 1. Extract Frames (at native 30fps/source rate)
    log(f"Step 1/4: Extracting raw frames from {v_name}...")
    subprocess.run([
        "ffmpeg", "-y", "-i", src_video,
        "-qscale:v", "1", "-qmin", "1",
        os.path.join(frames_in, "frame_%05d.png")
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    num_frames = len(os.listdir(frames_in))
    log(f"  ✓ Extracted {num_frames} frames.")
    
    # 2. Real-ESRGAN 4K Super-Resolution (Native GPU Scale)
    log(f"Step 2/4: AI Super-Resolution (Real-ESRGAN x4plus, full frame GPU mode)...")
    cmd_upscale = [
        REALESRGAN_EXE,
        "-i", frames_in,
        "-o", frames_upscaled,
        "-n", "realesrgan-x4plus",
        "-s", "2",
        "-t", "0",
        "-m", MODELS_DIR,
        "-g", "0",
        "-j", "1:2:2"
    ]
    subprocess.run(cmd_upscale, check=True)
    log(f"  ✓ 4K Super-Resolution completed ({len(os.listdir(frames_upscaled))} frames enhanced).")
    
    # 3. RIFE 60 FPS Interpolation
    log(f"Step 3/4: AI Frame Interpolation to 60 FPS (RIFE Flow Engine)...")
    cmd_rife = [
        RIFE_EXE,
        "-i", frames_upscaled,
        "-o", frames_interpolated,
        "-m", RIFE_MODELS,
        "-g", "0",
        "-j", "1:2:2"
    ]
    subprocess.run(cmd_rife, check=True)
    num_interpolated = len(os.listdir(frames_interpolated))
    log(f"  ✓ 60 FPS Interpolation completed ({num_interpolated} frames total).")
    
    # 4. Master Web Encoding (H.264 CRF 17, 60fps)
    log(f"Step 4/4: Encoding 4K 60fps Master Video...")
    out_master = os.path.join(PHOTO_DIR, v_name)
    temp_out = os.path.join(TEMP_DIR, "master_output.mp4")
    
    encode_cmd = [
        "ffmpeg", "-y",
        "-r", "60",
        "-i", os.path.join(frames_interpolated, "%08d.png"),
        "-c:v", "libx264",
        "-crf", "17",
        "-preset", "medium",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-an",
        temp_out
    ]
    subprocess.run(encode_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    # Replace master video
    shutil.move(temp_out, out_master)
    sz_mb = os.path.getsize(out_master) / (1024*1024)
    log(f"  ✓ Master 4K 60FPS Video created: {v_name} ({sz_mb:.2f} MB)")
    
    # Generate Reverse video if needed
    if rev_name:
        log(f"  Generating matching 60FPS reverse transition: {rev_name}...")
        rev_path = os.path.join(PHOTO_DIR, rev_name)
        rev_cmd = [
            "ffmpeg", "-y",
            "-i", out_master,
            "-vf", "reverse",
            "-c:v", "libx264",
            "-crf", "17",
            "-preset", "fast",
            "-pix_fmt", "yuv420p",
            "-movflags", "+faststart",
            "-an",
            rev_path
        ]
        subprocess.run(rev_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        rev_sz = os.path.getsize(rev_path) / (1024*1024)
        log(f"  ✓ Reverse 60FPS Video created: {rev_name} ({rev_sz:.2f} MB)")
        
    shutil.rmtree(TEMP_DIR, ignore_errors=True)
    v_elapsed = time.time() - v_start
    log(f"✓ Video [{idx}/7] completed in {v_elapsed:.1f}s!")

total_elapsed = time.time() - total_start
log(f"\n=======================================================")
log(f"ALL 7 VIDEOS SUCCESSFULLY PROCESSED IN {total_elapsed/60:.1f} MINUTES!")
log("=======================================================")
