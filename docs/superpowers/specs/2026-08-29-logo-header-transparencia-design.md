# Correções visuais da logo e do hero

## Problema

O arquivo `public/logo-icon.png` possui pixels brancos opacos dentro da área visível do ícone. Como o cabeçalho usa um fundo levemente esverdeado e translúcido, esses pixels formam um retângulo branco perceptível atrás da marca.

## Solução aprovada

Manter o arquivo e o desenho atual da marca. Aplicar ao ícone do cabeçalho uma composição CSS que faça os pixels brancos se integrarem ao fundo, preservando as partes verdes e cinzas do símbolo.

Remover também a linha vertical tracejada decorativa localizada à esquerda do conteúdo principal do hero. A remoção deve ser completa, sem deixar recuo, pseudo-elemento vazio ou desalinhamento no texto.

## Escopo

- Alterar somente a apresentação do ícone no cabeçalho.
- Remover o ornamento vertical tracejado do hero.
- Preservar textos, dimensões, navegação e funcionamento do cabeçalho.
- Preservar o restante da composição do hero, incluindo selo, imagem, botões e tipografia.
- Garantir que o ícone continue legível no estado inicial e no estado do cabeçalho após rolagem.
- Não modificar outros arquivos de imagem nem trocar a identidade visual.

## Verificação

- Criar um teste de regressão para a regra CSS aplicada ao ícone.
- Criar um teste de regressão que impeça o retorno do ornamento tracejado no hero.
- Executar testes, lint e build.
- Conferir visualmente o cabeçalho em desktop e celular.
- Publicar no Cloudflare Pages e validar o domínio `artesaninh.com.br`.
