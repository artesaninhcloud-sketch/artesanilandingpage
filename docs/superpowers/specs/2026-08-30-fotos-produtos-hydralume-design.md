# Novas fotos dos produtos e Hydralume

## Objetivo

Substituir as imagens antigas do catálogo pelas fotos presentes em `fotos novas`, adicionar o produto Hydralume e manter todos os cards visualmente alinhados em celulares e desktops.

## Catálogo

- Adicionar `Hydralume` com quantidade `30 g`, preço `R$ 65,00`, categoria `Cuidados com a pele` e imagem originada de `fotos novas/hydralume.png`.
- Manter Omeprazol e Ivermectina inativos e ocultos.
- Manter temporariamente a imagem antiga do Dimpless, pois não há uma nova foto correspondente.
- Preservar nomes, quantidades, preços, categorias e estados ativos dos demais produtos.

## Mapeamento das novas fotos

As fotos serão publicadas com nomes descritivos e sem espaços, acentos ou pontuação problemática. O catálogo apontará diretamente para esses arquivos públicos.

| Produto | Arquivo de origem |
| --- | --- |
| Akkermat | `akkermat.png` |
| Melatonina | `melatonina.png` |
| Verisol | `verisol.png` |
| Morosil | `morosil.png` |
| Relora | `relora.png` |
| Vitamina D 50.000 UI | `vit d 50000.png` |
| Creatina | `creatina.png` |
| Amora + Cimicífuga | `amora.png` |
| Exsynutriment + Bioarct | `exsy.png` |
| B12 | `b12.png` |
| UC-II | `UCII.png` |
| Glucosamina + Condroitina em cápsulas | `condro.png` |
| Solução Anti-queda 100 ml | `antiqueda.png` |
| Solução Anti-queda Spray 60 ml | `antiqueda 60ml.png` |
| Lugol | `lugol.png` |
| Clari Mãos | `clari maoes.png` |
| Mousse Corporal | `mousse corporal.png` |
| Creme para Rachadura | `creme para rachadura.png` |
| Diosmina + Hesperidina | `diosmina.png` |
| Composto Afrodisíaco | `composto afrodisiaco.png` |
| Ômega 3 | `omega3.png` |
| Glucosamina 1,5 g + Condroitina 1,2 g | `cond 1,2.png` |
| Hidratante para Mãos FPS 15 | `hidratante.png` |
| Tribulus | `tribulus.png` |
| Maca Peruana | `maca peruana.png` |
| Vitamina D 2.000 UI | `vit d 2000.png` |
| Creme Redutor Celulite e Medidas | `celulite.png` |
| Hydralume | `hydralume.png` |

## Tratamento visual

- Manter uma área de imagem com proporção idêntica em todos os cards.
- Usar `object-fit: contain` para não cortar frascos ou rótulos.
- Centralizar cada produto horizontal e verticalmente.
- Usar fundo branco uniforme, compatível com as novas fotos.
- Normalizar os arquivos para tamanho adequado à web sem alterar o enquadramento original.

## Alinhamento dos cards

- Cada card continuará preenchendo integralmente a altura da linha da grade.
- Nome e quantidade permanecem no topo do conteúdo.
- Preço e botão serão empurrados para a base do card, mantendo uma linha visual consistente mesmo quando nomes e descrições ocuparem alturas diferentes.
- Em telas pequenas, os cards continuarão legíveis sem corte ou rolagem horizontal.

## Validação

- Teste automatizado deve confirmar Hydralume, quantidade, preço, categoria e caminho da imagem.
- Teste automatizado deve confirmar que os produtos com novas fotos apontam para arquivos públicos válidos.
- Teste de componente deve confirmar a estrutura necessária para o alinhamento do conteúdo.
- Revisão visual em celular e desktop deve conferir centralização das fotos, alinhamento dos preços e botões e ausência de overflow.
- A suíte completa, o lint e o build devem ser executados antes do deploy.

## Publicação

Após a validação local, gerar o build e publicar no projeto Cloudflare Pages `artesani-farmacia`. Validar também o domínio oficial `https://artesaninh.com.br`.
