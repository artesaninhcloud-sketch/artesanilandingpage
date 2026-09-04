# Mapa MapLibre da Artesani

## Objetivo

Substituir somente o iframe atual do Google Maps por um mapa interativo MapLibre, preservando a seção de localização, os dados reais da farmácia e o botão externo para abrir a rota no Google Maps.

## Direção escolhida

O componente enviado como referência será adaptado à arquitetura existente. O projeto continuará em React com JavaScript e CSS próprio; não serão adicionados TypeScript, Tailwind ou shadcn apenas para esta funcionalidade.

## Interface

- Mapa claro e discreto, coerente com a paleta atual.
- Um único marcador nas coordenadas cadastradas em `src/data/store.js`.
- Marcador no verde escuro da Artesani, com identificação visível da farmácia.
- Ao interagir com o marcador, será exibido o nome Artesani e o endereço.
- O botão existente `Abrir no Google Maps` continuará abrindo a busca/rota em uma nova aba.
- O mapa manterá os mesmos limites e arredondamento da seção atual em desktop e celular.
- A rolagem do mouse não controlará o zoom, evitando prender a navegação da página.

## Arquitetura

- Adicionar somente a dependência `maplibre-gl`.
- Criar um componente local e reutilizável para inicializar e destruir corretamente a instância MapLibre.
- A seção `Location` fornecerá ao mapa nome, endereço e coordenadas vindos de `store`.
- Os estilos do mapa e do marcador permanecerão em CSS próprio, seguindo os tokens visuais existentes.
- O mapa-base usará o estilo claro público do CARTO Positron indicado pela referência enviada.

## Estados e falhas

- Durante o carregamento, o espaço do mapa exibirá um indicador discreto.
- Se o mapa ou o estilo externo falhar, a seção continuará exibindo endereço, WhatsApp e o botão do Google Maps.
- O mapa será removido no desmontar do componente para evitar listeners e instâncias duplicadas.

## Responsividade e acessibilidade

- Altura mínima aproximada de 420 px em telas maiores e 330 px no celular, como no mapa atual.
- Marcador e conteúdo interativo acessíveis por teclado.
- Nome e endereço legíveis sem depender apenas da cor.
- O mapa não criará rolagem horizontal na página.

## Verificação

- Teste automatizado para confirmar que as coordenadas e os dados da loja chegam ao componente.
- Teste do link externo para o Google Maps.
- Execução da suíte, lint e build.
- Validação visual local em desktop e celular antes de qualquer publicação.

## Fora do escopo

- Migração do projeto para TypeScript, Tailwind ou shadcn.
- Cálculo de rota dentro do site.
- Vários endereços ou marcadores.
- Publicação no Cloudflare antes da aprovação visual do teste local.
