from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "logo-icon.png"
OUTPUT = ROOT / "public" / "logo-icon-transparent.png"


def remove_white_background(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    cleaned_pixels = []

    for red, green, blue, alpha in rgba.get_flattened_data():
        whiteness = min(red, green, blue)

        if whiteness >= 245:
            edge_alpha = round(((255 - whiteness) / 10) * 255)
            alpha = min(alpha, max(0, edge_alpha))

        cleaned_pixels.append((red, green, blue, alpha))

    rgba.putdata(cleaned_pixels)
    bounds = rgba.getchannel("A").getbbox()

    if bounds is None:
        raise ValueError("O símbolo ficou totalmente transparente.")

    cropped = rgba.crop(bounds)
    padding = max(12, round(max(cropped.size) * 0.04))
    canvas = Image.new(
        "RGBA",
        (cropped.width + padding * 2, cropped.height + padding * 2),
        (0, 0, 0, 0),
    )
    canvas.alpha_composite(cropped, (padding, padding))
    canvas.thumbnail((256, 256), Image.Resampling.LANCZOS)
    return canvas


def main() -> None:
    with Image.open(SOURCE) as source:
        icon = remove_white_background(source)
        icon.save(OUTPUT, "PNG", optimize=True)

    print(f"Logo transparente criada em {OUTPUT} ({icon.width}x{icon.height})")


if __name__ == "__main__":
    main()
