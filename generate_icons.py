#!/usr/bin/env python3
"""
generate_icons.py — Run this script to generate PNG icons for the PWA.
Requires: pip install Pillow
Usage:    python3 generate_icons.py
Output:   icons/icon-192.png  and  icons/icon-512.png
"""

import os, math

def make_icon(size, outpath):
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        print("Pillow not found. Run:  pip install Pillow")
        return

    img  = Image.new("RGBA", (size, size), (8, 12, 16, 255))
    draw = ImageDraw.Draw(img)

    cx, cy = size / 2, size / 2
    r_outer = size * 0.42
    r_inner = size * 0.28

    # Outer ring
    draw.ellipse(
        [cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer],
        outline=(0, 212, 255, 180), width=max(2, size // 60)
    )
    # Inner glow ring
    draw.ellipse(
        [cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner],
        outline=(0, 212, 255, 80), width=max(1, size // 100)
    )

    # Shield body (simple polygon approximation with lines)
    sw = size * 0.22
    sh = size * 0.26
    sx, sy = cx - sw / 2, cy - sh / 2
    # Draw shield outline manually
    pts = [
        (cx, sy - sh * 0.05),
        (sx + sw, sy),
        (sx + sw, sy + sh * 0.55),
        (cx, sy + sh * 1.05),
        (sx, sy + sh * 0.55),
        (sx, sy),
    ]
    draw.polygon(pts, fill=(0, 212, 255, 30), outline=(0, 212, 255, 200))

    # "S" text fallback
    text_size = max(16, size // 6)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", text_size)
    except Exception:
        font = ImageFont.load_default()

    bbox = draw.textbbox((0, 0), "S", font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text((cx - tw / 2, cy - th / 2 - size * 0.01), "S", fill=(0, 212, 255, 255), font=font)

    os.makedirs(os.path.dirname(outpath), exist_ok=True)
    img.save(outpath, "PNG")
    print(f"  ✓ Saved {outpath}")

if __name__ == "__main__":
    print("Generating SSU Command PWA icons...")
    make_icon(192, "icons/icon-192.png")
    make_icon(512, "icons/icon-512.png")
    print("Done! Copy the icons/ folder into your ssu-command/ directory.")
