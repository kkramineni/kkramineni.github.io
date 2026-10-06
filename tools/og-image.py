"""Generate the Open Graph / Twitter card image (1200x630) for cloudbricks.dev.

Run from the project root:  python tools/og-image.py
Writes static/images/og-default.png, which hugo.toml points at via
params.ogImage. Social platforms want 1200x630 at under 5 MB.

The mark is the same three-hexagon logo used in the navbar; it is redrawn here
with Pillow rather than composited from the PNG so the card does not depend on
a transparent logo being present at build time.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (0, 42, 79)        # --background inverse, brand navy
FG = (234, 242, 251)     # foreground
ACCENT = (0, 121, 255)   # --primary
MUTED = (150, 178, 208)

OUT = Path(__file__).resolve().parent.parent / "static" / "images" / "og-default.png"


def hexagon(cx, cy, r):
    """Flat-top hexagon points, matching the navbar mark's proportions."""
    from math import cos, pi, sin

    return [
        (cx + r * cos(pi / 6 + i * pi / 3), cy + r * sin(pi / 6 + i * pi / 3))
        for i in range(6)
    ]


def load_font(size, bold=False):
    # Prefer a real UI font; fall back to Pillow's bundled bitmap if absent.
    names = (
        ["seguisb.ttf", "segoeuib.ttf", "arialbd.ttf"]
        if bold
        else ["segoeui.ttf", "arial.ttf", "DejaVuSans.ttf"]
    )
    for n in names:
        try:
            return ImageFont.truetype(n, size)
        except OSError:
            continue
    return ImageFont.load_default(size)


def main():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # Three overlapping hexagons, bottom-left to top-right.
    r = 46
    for cx, cy, colour in ((300, 330, (126, 191, 60)), (356, 292, (13, 106, 173)), (412, 254, (0, 121, 255))):
        d.polygon(hexagon(cx, cy, r), fill=colour)

    d.text((530, 250), "Cloudbricks.dev", font=load_font(76, bold=True), fill=FG)
    d.text(
        (534, 350),
        "Hands-on infrastructure and automation notes",
        font=load_font(30),
        fill=MUTED,
    )
    d.text(
        (534, 400),
        "VMware  ·  containers  ·  storage  ·  CI/CD",
        font=load_font(26),
        fill=ACCENT,
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT} ({OUT.stat().st_size / 1024:.1f} KB, {img.size[0]}x{img.size[1]})")


if __name__ == "__main__":
    main()