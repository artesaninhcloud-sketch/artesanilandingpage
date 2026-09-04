UPDATE products
SET image = CASE id
  WHEN 2 THEN '/remedios/novos/akkermat.webp'
  WHEN 3 THEN '/remedios/novos/melatonina.webp'
  WHEN 4 THEN '/remedios/novos/verisol.webp'
  WHEN 5 THEN '/remedios/novos/morosil.webp'
  WHEN 6 THEN '/remedios/novos/relora.webp'
  WHEN 7 THEN '/remedios/novos/vitamina-d-50000.webp'
  WHEN 8 THEN '/remedios/novos/creatina.webp'
  WHEN 9 THEN '/remedios/novos/amora.webp'
  WHEN 10 THEN '/remedios/novos/exsynutriment-bioarct.webp'
  WHEN 11 THEN '/remedios/novos/b12.webp'
  WHEN 12 THEN '/remedios/novos/uc-ii.webp'
  WHEN 13 THEN '/remedios/novos/glucosamina-condroitina-capsulas.webp'
  WHEN 15 THEN '/remedios/novos/antiqueda-100ml.webp'
  WHEN 16 THEN '/remedios/novos/antiqueda-spray-60ml.webp'
  WHEN 17 THEN '/remedios/novos/lugol.webp'
  WHEN 18 THEN '/remedios/novos/clari-maos.webp'
  WHEN 19 THEN '/remedios/novos/mousse-corporal.webp'
  WHEN 20 THEN '/remedios/novos/creme-rachadura.webp'
  WHEN 21 THEN '/remedios/novos/diosmina-hesperidina.webp'
  WHEN 22 THEN '/remedios/novos/composto-afrodisiaco.webp'
  WHEN 23 THEN '/remedios/novos/omega-3.webp'
  WHEN 24 THEN '/remedios/novos/glucosamina-condroitina-saches.webp'
  WHEN 25 THEN '/remedios/novos/hidratante-maos-fps15.webp'
  WHEN 26 THEN '/remedios/novos/tribulus.webp'
  WHEN 27 THEN '/remedios/novos/maca-peruana.webp'
  WHEN 28 THEN '/remedios/novos/vitamina-d-2000.webp'
  WHEN 29 THEN '/remedios/novos/creme-redutor-celulite.webp'
  ELSE image
END
WHERE id IN (2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29);

INSERT INTO products (id, name, description, price, image, category, active)
VALUES (31, 'Hydralume', '30 g', 65.00, '/remedios/novos/hydralume.webp', 'Cuidados com a pele', 1)
ON CONFLICT(id) DO UPDATE SET
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  image = excluded.image,
  category = excluded.category,
  active = excluded.active;

