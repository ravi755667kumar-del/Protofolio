import os
import sys
from PIL import Image

def process():
    input_path = r"e:\Protfolio\frontend-react\public\homeimg.jpeg"
    output_path = r"e:\Protfolio\frontend-react\public\homeimg-nobg.png"

    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found!")
        return

    print(f"Loading {input_path}...")
    img = Image.open(input_path)
    print(f"Original size: {img.size}")

    try:
        from rembg import remove
        print("Removing background with AI u2net model...")
        nobg = remove(img)
    except Exception as e:
        print(f"rembg error: {e}")
        return

    # Auto-crop transparent boundaries to frame subject nicely
    bbox = nobg.getbbox()
    if bbox:
        print(f"Bounding box: {bbox}")
        # Add modest padding if inside boundaries
        pad = 20
        w, h = nobg.size
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(w, bbox[2] + pad),
            min(h, bbox[3] + pad)
        )
        cropped = nobg.crop(crop_box)
    else:
        cropped = nobg

    cropped.save(output_path, "PNG")
    print(f"Successfully saved transparent cropped image to: {output_path}")

    # Also copy to dist if dist exists
    dist_path = r"e:\Protfolio\frontend-react\dist\homeimg-nobg.png"
    if os.path.exists(r"e:\Protfolio\frontend-react\dist"):
        cropped.save(dist_path, "PNG")
        print(f"Also saved to dist: {dist_path}")

if __name__ == "__main__":
    process()
