from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "fotos novas"
OUTPUT_DIR = ROOT / "public" / "remedios" / "novos"

IMAGE_MAP = {
    "akkermat.png": "akkermat.webp",
    "melatonina.png": "melatonina.webp",
    "verisol.png": "verisol.webp",
    "morosil.png": "morosil.webp",
    "relora.png": "relora.webp",
    "vit d 50000.png": "vitamina-d-50000.webp",
    "creatina.png": "creatina.webp",
    "amora.png": "amora.webp",
    "exsy.png": "exsynutriment-bioarct.webp",
    "b12.png": "b12.webp",
    "UCII.png": "uc-ii.webp",
    "condro.png": "glucosamina-condroitina-capsulas.webp",
    "antiqueda.png": "antiqueda-100ml.webp",
    "antiqueda 60ml.png": "antiqueda-spray-60ml.webp",
    "lugol.png": "lugol.webp",
    "clari maoes.png": "clari-maos.webp",
    "mousse corporal.png": "mousse-corporal.webp",
    "creme para rachadura.png": "creme-rachadura.webp",
    "diosmina.png": "diosmina-hesperidina.webp",
    "composto afrodisiaco.png": "composto-afrodisiaco.webp",
    "omega3.png": "omega-3.webp",
    "cond 1,2.png": "glucosamina-condroitina-saches.webp",
    "hidratante.png": "hidratante-maos-fps15.webp",
    "tribulus.png": "tribulus.webp",
    "maca peruana.png": "maca-peruana.webp",
    "vit d 2000.png": "vitamina-d-2000.webp",
    "celulite.png": "creme-redutor-celulite.webp",
    "hydralume.png": "hydralume.webp",
}


def prepare_image(source_name: str, output_name: str) -> None:
    source = SOURCE_DIR / source_name
    destination = OUTPUT_DIR / output_name

    if not source.is_file():
        raise FileNotFoundError(f"Foto de origem ausente: {source}")

    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        image.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=84, method=6)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for source_name, output_name in IMAGE_MAP.items():
        prepare_image(source_name, output_name)

    print(f"{len(IMAGE_MAP)} fotos preparadas em {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
