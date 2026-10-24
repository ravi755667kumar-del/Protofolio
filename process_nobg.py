import cv2
import numpy as np
from PIL import Image

def process():
    input_path = r"e:\Protfolio\frontend-react\public\homeimg.jpeg"
    output_path = r"e:\Protfolio\frontend-react\public\homeimg-nobg.png"
    dist_path = r"e:\Protfolio\frontend-react\dist\homeimg-nobg.png"

    print("Loading image...")
    img = cv2.imread(input_path)
    if img is None:
        print("Could not load image!")
        return
    h, w = img.shape[:2]

    # Initialize mask: subject is roughly inside rectangle
    # Give 30px margin from top/left/right, 20px from bottom
    rect = (25, 20, w - 50, h - 30)
    mask = np.zeros((h, w), np.uint8)
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)

    print("Running GrabCut segmentation...")
    cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 6, cv2.GC_INIT_WITH_RECT)

    # 0 = Background, 1 = Foreground, 2 = Probable Background, 3 = Probable Foreground
    binary_mask = np.where((mask == 1) | (mask == 3), 255, 0).astype(np.uint8)

    # Clean up small noise and fill holes inside subject
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    binary_mask = cv2.morphologyEx(binary_mask, cv2.MORPH_CLOSE, kernel, iterations=2)
    binary_mask = cv2.morphologyEx(binary_mask, cv2.MORPH_OPEN, kernel, iterations=1)

    # Soft feathering on the edges for smooth anti-aliased cutout
    alpha = cv2.GaussianBlur(binary_mask, (7, 7), 0)

    # Combine BGR image with Alpha channel to create RGBA
    b, g, r = cv2.split(img)
    rgba = cv2.merge([r, g, b, alpha]) # PIL expects RGB

    # Find bounding box of foreground
    non_zero = np.where(alpha > 15)
    if len(non_zero[0]) > 0:
        y_min, y_max = np.min(non_zero[0]), np.max(non_zero[0])
        x_min, x_max = np.min(non_zero[1]), np.max(non_zero[1])
        print(f"Bounding box: y=({y_min}, {y_max}), x=({x_min}, {x_max})")

        # Add modest padding (15px)
        pad = 15
        y_min = max(0, y_min - pad)
        y_max = min(h, y_max + pad)
        x_min = max(0, x_min - pad)
        x_max = min(w, x_max + pad)

        cropped_rgba = rgba[y_min:y_max, x_min:x_max]
    else:
        cropped_rgba = rgba

    pil_img = Image.fromarray(cropped_rgba, 'RGBA')
    pil_img.save(output_path, 'PNG', optimize=True)
    print(f"Saved transparent cropped PNG to: {output_path}")

    try:
        pil_img.save(dist_path, 'PNG', optimize=True)
        print(f"Also saved to: {dist_path}")
    except Exception as e:
        print(f"Dist save note: {e}")

if __name__ == "__main__":
    process()
