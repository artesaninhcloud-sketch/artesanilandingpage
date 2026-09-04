# Cabeçalho de orçamento e paleta verde escura

## Objetivo

Deixar explícito no celular que o botão com ícone de documento serve para orçar uma receita, aplicar a cor oficial do WhatsApp ao botão flutuante e escurecer os verdes da interface.

## Cabeçalho

- Manter o botão existente e seu destino de orçamento pelo WhatsApp.
- Exibir o texto curto `Orçar receita` no celular, empilhado abaixo do ícone dentro do botão.
- Em telas largas, preservar o texto completo `Orçar minha receita` em formato horizontal.
- Ocultar o botão de orçamento somente abaixo de 360 px, como já ocorre, para preservar o cabeçalho em telas mínimas.
- Manter carrinho, menu, logo e navegação sem mudanças funcionais.

## Cores

- Verde principal da interface: `#4A6709`.
- Verde principal escuro: `#355006`.
- Verde principal profundo: `#243704`.
- Verde secundário de interface: `#64860C`.
- Verde oficial do WhatsApp: `#25D366`.
- Verde do WhatsApp no hover: `#1EBE5D`.
- Usar texto branco sobre botões verdes preenchidos para manter contraste.
- Preservar as cores originais dentro da imagem da logo.

## Responsividade

- O texto curto deve aparecer entre 360 e 759 px.
- A partir de 760 px, o botão volta ao layout horizontal com o texto completo.
- O cabeçalho não pode gerar rolagem horizontal entre 320 e 1440 px.

## Verificação

- Criar regressões para a presença do rótulo móvel, as cores e os breakpoints.
- Executar testes, lint e build.
- Conferir o cabeçalho em 320, 360, 390, 760, 1099 e 1100 px.
- Conferir visualmente o botão flutuante e o contraste dos botões principais.
- Publicar no Cloudflare Pages e validar `artesaninh.com.br`.

