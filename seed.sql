-- Catálogo — fonte: catálogo revisado fornecido pela farmácia (nome, categoria, quantidade e
-- preço reais) + rótulos reais das imagens em /remedios.
-- active = 0 para produtos que não podem ser divulgados no site (medicamentos com prescrição).

DELETE FROM products;

INSERT INTO products (id, name, description, price, image, category, active) VALUES
  (1, 'Omeprazol 20mg', NULL, 18.00, '/remedios/1.jpg', 'Uso Geral', 0),
  (2, 'Akkermat 150mg', '30 cápsulas', 175.00, '/remedios/novos/akkermat.webp', 'Emagrecimento', 1),
  (3, 'Melatonina 5mg', '30 cápsulas', 30.00, '/remedios/novos/melatonina.webp', 'Sono', 1),
  (4, 'Verisol', '75 g', 125.00, '/remedios/novos/verisol.webp', 'Beleza e pele', 1),
  (5, 'Morosil 500mg', '30 cápsulas', 115.00, '/remedios/novos/morosil.webp', 'Emagrecimento', 1),
  (6, 'Relora 250mg', '60 cápsulas', 125.00, '/remedios/novos/relora.webp', 'Estresse e bem-estar', 1),
  (7, 'Vitamina D 50.000 UI', '4 cápsulas (1 por semana)', 35.00, '/remedios/novos/vitamina-d-50000.webp', 'Vitaminas e minerais', 1),
  (8, 'Creatina', '150 g', 55.00, '/remedios/novos/creatina.webp', 'Esporte e desempenho', 1),
  (9, 'Amora 300mg + Cimicífuga 80mg', '60 cápsulas', 45.00, '/remedios/novos/amora.webp', 'Menopausa', 1),
  (10, 'Exsynutriment + Bioarct', '30 cápsulas', 125.00, '/remedios/novos/exsynutriment-bioarct.webp', 'Beleza de dentro para fora', 1),
  (11, 'B12 1000mcg', '60 cápsulas', 40.00, '/remedios/novos/b12.webp', 'Vitaminas e minerais', 1),
  (12, 'UC-II', '30 cápsulas', 75.00, '/remedios/novos/uc-ii.webp', 'Saúde das articulações', 1),
  (13, 'Glucosamina 500mg + Condroitina 400mg', '120 cápsulas (60 doses)', 55.00, '/remedios/novos/glucosamina-condroitina-capsulas.webp', 'Saúde das articulações', 1),
  (14, 'Ivermectina 6mg', NULL, 20.00, '/remedios/14.jpg', 'Uso Geral', 0),
  (15, 'Solução Anti-queda (Minoxidil 5%)', '100 ml', 45.00, '/remedios/novos/antiqueda-100ml.webp', 'Cuidados capilares', 1),
  (16, 'Solução Anti-queda Spray (Minoxidil 5%)', '60 ml', 30.00, '/remedios/novos/antiqueda-spray-60ml.webp', 'Cuidados capilares', 1),
  (17, 'Lugol', '15 ml', 15.00, '/remedios/novos/lugol.webp', 'Iodo', 1),
  (18, 'Clari Mãos Rosa Mosqueta', '30 g', 45.00, '/remedios/novos/clari-maos.webp', 'Cuidados com as mãos', 1),
  (19, 'Mousse Corporal Manteiga de Cacau', '250 ml', 35.00, '/remedios/novos/mousse-corporal.webp', 'Cuidados corporais', 1),
  (20, 'Creme para Rachadura', '60 g', 20.00, '/remedios/novos/creme-rachadura.webp', 'Cuidados com a pele', 1),
  (21, 'Diosmina 450mg + Hesperidina 50mg', '60 cápsulas', 65.00, '/remedios/novos/diosmina-hesperidina.webp', 'Circulação', 1),
  (22, 'Composto Afrodisíaco', '60 cápsulas', 55.00, '/remedios/novos/composto-afrodisiaco.webp', 'Saúde sexual', 1),
  (23, 'Ômega 3', '60 cápsulas', 30.00, '/remedios/novos/omega-3.webp', 'Saúde cardiovascular', 1),
  (24, 'Glucosamina 1,5g + Condroitina 1,2g', '30 sachês', 95.00, '/remedios/novos/glucosamina-condroitina-saches.webp', 'Saúde das articulações', 1),
  (25, 'Hidratante para Mãos FPS 15', '50 g', 55.00, '/remedios/novos/hidratante-maos-fps15.webp', 'Cuidados com as mãos', 1),
  (26, 'Tribulus Terrestris 500mg', '60 cápsulas', 35.00, '/remedios/novos/tribulus.webp', 'Saúde sexual', 1),
  (27, 'Maca Peruana 500mg', '60 cápsulas', 35.00, '/remedios/novos/maca-peruana.webp', 'Saúde sexual e vitalidade', 1),
  (28, 'Vitamina D 2.000 UI', '30 cápsulas', 20.00, '/remedios/novos/vitamina-d-2000.webp', 'Vitaminas e minerais', 1),
  (29, 'Creme Redutor Celulite e Medidas', '150 g', 50.00, '/remedios/novos/creme-redutor-celulite.webp', 'Celulite e cuidados corporais', 1),
  (30, 'Dimpless 40mg', '30 cápsulas', 125.00, '/remedios/novos/dimpless.webp', 'Celulite e cuidados da pele', 1),
  (31, 'Hydralume', '30 g', 65.00, '/remedios/novos/hydralume.webp', 'Cuidados com a pele', 1);
