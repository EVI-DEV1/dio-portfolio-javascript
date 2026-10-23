# EVI — Portfólio JavaScript

Página responsiva desenvolvida para o desafio **Publicando Seu Portfólio Profissional no GitHub Pages**, da Formação JavaScript Developer da DIO.

HTML semântico, CSS mobile e desktop e JavaScript sem framework. O conteúdo vem de `data/profile.json`, por `fetch` com async/await. Há filtros de projetos, acordeões acessíveis, estado de carregamento, tratamento de falha e nova tentativa. Não há formulário nem coleta de dados.

## Executar

Sirva esta pasta por HTTP (por exemplo, `python -m http.server 8000`) e abra `http://localhost:8000`. Abrir diretamente pelo protocolo file não permite carregar o JSON em todos os navegadores.

## Personalizar

Edite `data/profile.json`. Os links de projetos devem usar HTTPS. Textos são inseridos com textContent, sem interpretar HTML do JSON. Os dados de identidade foram referenciados no portfólio público EVI-DEV1/portfolio; os projetos apontam para repositórios públicos existentes. Não foram acrescentadas experiências profissionais, datas ou níveis de idiomas não confirmados.

## Publicar no GitHub Pages

No repositório, acesse Settings → Pages → Deploy from a branch → main → /(root). Salve e aguarde a confirmação do endereço. Os caminhos relativos funcionam em subdiretórios do GitHub Pages.

## Referências

- [Projeto oficial e aulas da DIO](https://github.com/digitalinnovationone/js-developer-portfolio): referência pedagógica para JSON, atualização do DOM e acordeões. Implementação visual e código desta entrega foram desenvolvidos para este portfólio; o conteúdo de exemplo do instrutor não foi copiado como biografia.
- [Formação JavaScript Developer](https://web.dio.me/track/formacao-javascript-developer).
- Fontes DM Sans e Manrope via Google Fonts; o layout mantém fontes de sistema como alternativa.

Os projetos de aprendizagem preservam seu contexto e referências nos respectivos repositórios. O estudo Ritmo é documental e não representa entrevistas realizadas.
