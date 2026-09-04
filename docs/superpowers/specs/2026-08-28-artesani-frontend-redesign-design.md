# Redesign do frontend da Artesani

## Objetivo

Reformular a vitrine digital da Artesani Farmácia de Manipulação para transmitir uma presença premium, acolhedora e confiável, sem alterar o fluxo comercial já validado: o cliente encontra produtos, monta o carrinho e finaliza o pedido pelo WhatsApp.

O redesign deve eliminar a inconsistência visual das fotos de produto, especialmente fundos retangulares cinza ou divergentes, e criar uma experiência mais refinada em desktop e celular.

## Escopo

O trabalho inclui:

- atualização do sistema visual global;
- reformulação do cabeçalho, hero, benefícios, catálogo, área institucional, processo de compra, avaliações, localização, perguntas frequentes e rodapé;
- padronização das fotos dos produtos;
- refinamento do carrinho, feedbacks e estados de interface;
- revisão responsiva e de acessibilidade;
- manutenção do catálogo local e da integração opcional com Worker/D1;
- build, validação funcional e publicação no Cloudflare.

Não fazem parte do escopo:

- cadastro ou autenticação de clientes;
- checkout ou pagamento dentro do site;
- painel administrativo;
- alteração de nomes, preços, dosagens ou alegações dos produtos;
- criação de novas informações médicas ou comerciais não confirmadas.

## Direção visual

A linguagem será de farmácia premium com inspiração botânica contemporânea. A interface usará:

- verde Artesani profundo como cor principal;
- marfim quente como fundo predominante;
- cinzas levemente esverdeados para texto secundário e bordas;
- verde-lima da marca apenas em pequenos detalhes;
- superfícies suaves, sombras discretas e iluminação coerente;
- títulos expressivos e compactos combinados com texto altamente legível;
- cantos arredondados controlados, evitando excesso de cartões ou cápsulas decorativas.

O resultado deve parecer profissional e humano, sem a estética clínica fria e sem o aspecto genérico de uma landing page montada por blocos independentes.

## Estrutura da página

### Cabeçalho

O cabeçalho continuará fixo e manterá marca, navegação, orçamento de receita e carrinho. A hierarquia será refinada para destacar a marca e a ação “Orçar receita” sem competir com o carrinho. No celular, a marca será compacta e o menu continuará acessível por botão.

### Hero

O hero usará uma composição integrada entre conteúdo e imagem, abandonando a sensação de caixa de vidro solta sobre uma fotografia. A mensagem principal, o acesso ao catálogo e o contato pelo WhatsApp serão os pontos de maior destaque. Endereço e sinais de confiança aparecerão de maneira discreta.

### Benefícios

Laboratório próprio, rapidez de resposta, pedido pelo WhatsApp e ausência de cadastro serão preservados, mas apresentados como uma faixa editorial de confiança, com menos aparência de quatro cartões repetidos.

### Catálogo

O catálogo será o centro da página. Busca, ordenação e categorias formarão uma barra organizada e legível. Em telas menores, as categorias terão rolagem horizontal, evitando múltiplas linhas que consomem a área útil.

Cada card de produto terá:

- área de imagem uniforme;
- categoria discreta;
- nome com altura visual consistente;
- quantidade ou apresentação;
- preço em destaque;
- botão de adicionar com estado confirmado.

Os cards devem manter alturas coerentes sem esconder informações e oferecer resposta visual clara em hover, foco, toque e adição ao carrinho.

### Conteúdo institucional

A história e a foto da equipe serão apresentadas em composição editorial, equilibrando texto, imagem e números de confiança. O processo de compra será mais compacto. Avaliações, localização e perguntas frequentes serão integradas à mesma linguagem visual, evitando mudanças abruptas de fundo ou densidade.

### Rodapé e ações flutuantes

O rodapé reunirá marca, endereço, WhatsApp, Instagram e crédito de desenvolvimento. O botão flutuante de WhatsApp e a barra móvel do carrinho deverão respeitar áreas seguras e nunca encobrir controles ou conteúdo importante.

## Tratamento das imagens de produto

Todas as imagens ativas do catálogo serão avaliadas e padronizadas. O acabamento aprovado consiste em:

- recorte limpo da embalagem;
- fundo transparente;
- preservação integral do rótulo e das proporções do produto;
- centralização e escala visual uniforme;
- sombra suave aplicada pelo layout, não gravada de forma inconsistente na foto;
- exportação otimizada para a web com transparência.

O tratamento não pode alterar texto, marca, cor do rótulo, formato da embalagem ou quantidade informada. Quando um recorte automático comprometer o produto, a imagem original será preservada e integrada por máscara/fundo visual controlado no card.

## Arquitetura e componentes

O projeto continuará em React com Vite. A implementação aproveitará a estrutura existente e fará alterações direcionadas, sem reescrever o sistema do zero.

Os componentes atuais permanecerão com responsabilidades claras:

- `Header`, `Hero` e `FeatureStrip` cuidam da entrada e confiança;
- `ProductGrid`, `SearchBar`, `CategoryPills` e `ProductCard` cuidam da descoberta de produtos;
- `CartContext`, `CartDrawer`, `CartItem` e `MobileCartBar` cuidam do carrinho;
- `About`, `HowItWorks`, `Testimonials`, `Location`, `Faq` e `Footer` cuidam do conteúdo de apoio.

Estilos serão organizados no sistema de tokens global e nos arquivos CSS de cada componente. Mudanças estruturais serão feitas somente quando melhorarem a legibilidade, a responsividade ou a separação de responsabilidades.

## Dados e comportamento

O fluxo de dados existente será preservado:

1. `useProducts` solicita o catálogo pela API configurada.
2. Em erro, indisponibilidade ou resposta vazia, o serviço usa o catálogo local.
3. Busca, categoria e ordenação atuam localmente sem recarregar a página.
4. O carrinho é mantido em `localStorage`.
5. A finalização gera a mensagem e abre o WhatsApp da unidade.

Nenhum dado pessoal será coletado pelo site. O redesign não deve alterar o telefone, o endereço ou o formato da mensagem sem necessidade funcional.

## Estados e erros

Serão mantidos ou aprimorados:

- skeleton de carregamento do catálogo;
- catálogo vazio após busca ou filtro;
- imagem ausente ou com falha de carregamento;
- carrinho vazio;
- confirmação de produto adicionado;
- fallback silencioso para catálogo local quando a API estiver indisponível;
- menu e carrinho fecháveis por teclado e toque fora;
- ausência de preço sem exibição de valor inventado.

## Responsividade e acessibilidade

O layout será validado em larguras móveis e desktop. As prioridades são:

- leitura confortável sem zoom;
- alvos de toque adequados;
- categorias roláveis horizontalmente no celular;
- cards em duas colunas apenas quando a largura permitir leitura e toque;
- conteúdo sem sobreposição com ações fixas;
- foco visível e ordem de navegação lógica;
- textos alternativos preservados;
- contraste suficiente;
- suporte a `prefers-reduced-motion` para transições não essenciais;
- bloqueio correto de rolagem ao abrir menu ou carrinho.

## Verificação

A implementação será considerada pronta somente após:

- build de produção sem erros;
- lint sem erros novos;
- ausência de erros relevantes no console;
- verificação da busca, categorias e ordenação;
- verificação de adicionar, incrementar, reduzir e remover itens;
- verificação da mensagem e do link final do WhatsApp sem enviar o pedido;
- verificação dos estados vazio e carregando;
- revisão visual do hero, catálogo, conteúdo institucional e rodapé em desktop e celular;
- confirmação de que nenhuma foto exibe fundo retangular indesejado;
- deploy no Cloudflare e resposta bem-sucedida da URL pública.

## Publicação

O token fornecido pelo usuário será usado apenas em memória durante a execução do Wrangler e não será salvo em arquivos do projeto. Antes da publicação será executado um build e, quando aplicável, um dry run. Após o deploy, a URL pública será aberta e verificada visual e funcionalmente.
