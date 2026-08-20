import os
import subprocess
import sys
import shutil

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

realesrgan_exe = r"e:\ribas_Dyk\upscale_tools\realesrgan-ncnn-vulkan.exe"
input_video = r"e:\ribas_Dyk\Photo_screens\Hero.mp4"
output_video = r"e:\ribas_Dyk\Photo_screens\Hero_4K.mp4"

temp_in = r"e:\ribas_Dyk\upscale_temp\frames_in"
temp_out = r"e:\ribas_Dyk\upscale_temp\frames_out"

os.makedirs(temp_in, exist_ok=True)
os.makedirs(temp_out, exist_ok=True)

print("Step 1: Extracting frames from Hero.mp4...")
# Clean previous frames
for f in os.listdir(temp_in): os.remove(os.path.join(temp_in, f))
for f in os.listdir(temp_out): os.remove(os.path.join(temp_out, f))

# Extract at original framerate
subprocess.run([
    "ffmpeg", "-y", "-i", input_video,
    "-qscale:v", "1", "-qmin", "1",
    os.path.join(temp_in, "frame_%05d.png")
], check=True)

num_frames = len(os.listdir(temp_in))
print(f"  ✓ Extracted {num_frames} frames.")

print("Step 2: AI Neural Upscaling via Real-ESRGAN x4plus (Vulkan GPU)...")
# Scale 2x from 1080p -> 4K (3840x2160)
cmd = [
    realesrgan_exe,
    "-i", temp_in,
    "-o", temp_out,
    "-n", "realesrgan-x4plus",
    "-s", "2",
    "-f", "png",
    "-g", "0"  # Use GPU 0 (GTX 1060)
]
subprocess.run(cmd, check=True)
print(f"  ✓ AI Upscaling completed! {len(os.listdir(temp_out))} frames enhanced.")

print("Step 3: Encoding 4K master video with FFmpeg (High Bitrate H.264)...")
# Detect input FPS
fps_cmd = ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=r_frame_rate", "-of", "default=noprint_wrappers=1:nokey=1", input_video]
fps_out = subprocess.check_output(fps_cmd).decode('utf-8').strip()
print(f"  Source FPS: {fps_out}")

encode_cmd = [
    "ffmpeg", "-y",
    "-r", fps_out,
    "-i", os.path.join(temp_out, "frame_%05d.png"),
    "-c:v", "libx264",
    "-crf", "15",
    "-preset", "slow",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "-an",
    output_video
]
subprocess.run(encode_cmd, check=True)
print(f"\n✓ Successfully created 4K Enhanced Video: {output_video}")
print(f"  Original: {os.path.getsize(input_video)/(1024*1024):.2f} MB")
print(f"  4K AI Master: {os.path.getsize(output_video)/(1024*1024):.2f} MB")

# Clean temp directory
shutil.rmtree(r"e:\ribas_Dyk\upscale_temp", ignore_errors=True)
print("  Temp files cleaned.")
