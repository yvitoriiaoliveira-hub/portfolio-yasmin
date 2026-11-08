# Portfólio — Yasmin Vitória

Portfólio profissional de Yasmin Vitória, desenvolvedora Full Stack. Página principal com seções (apresentação, sobre, experiência, projetos, stack, formação e contato) e uma página para cada projeto.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** estrito
- **Tailwind CSS 4** com tokens próprios de cor (modo claro e escuro)
- **Motion** para animações (respeita "reduzir movimento" do sistema)
- **next-themes** (tema com persistência) · **Radix UI** (menu do celular e galeria) · **Lucide** e **React Icons** (ícones)
- **React Hook Form** + **Zod** (formulário, com a mesma validação no navegador e no servidor) · **Sonner** (avisos)
- E-mails por **SMTP** com **Nodemailer** (aviso para você + resposta automática para quem escreveu)
- **Vercel Web Analytics** para estatísticas de acesso (sem cookies e sem dados pessoais). Para ver os números: projeto na Vercel → aba **Analytics** → **Enable**.

## Rodar no computador

Requer Node.js 20.9 ou mais novo.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Ambiente de desenvolvimento |
| `npm run build` | Compila para produção (inclui verificação de tipos) |
| `npm start` | Sobe a versão compilada |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript sem gerar arquivos |

## Onde editar o conteúdo

Nenhum texto fica preso nos componentes. Tudo está em `src/content/`:

| Arquivo | Conteúdo |
|---|---|
| `site.ts` | Nome, chamada, apresentação, e-mail, links, **disponibilidade** (`availability.open`), currículo e foto |
| `about.ts` | Texto "Sobre mim", destaques, "Como eu trabalho" e linha do tempo |
| `experience.ts` | Experiência profissional (sistemas, atividades, tecnologias) |
| `projects.ts` | Projetos: problema, objetivo, funcionalidades, arquitetura, tecnologias, telas e links |
| `stack.ts` | Grupos de tecnologias e a faixa animada |
| `education.ts` | Formação |

**Links de projeto:** preencha `links.demo` e/ou `links.github` em `projects.ts`. Campo vazio não gera botão.
**Telas reais:** coloque as imagens em `public/projetos/<projeto>/` e liste em `images`. Sem imagens, o projeto usa a ilustração em código (`mockup`).
**Currículo:** substitua `public/curriculo-yasmin-vitoria.pdf` (o botão "Currículo" baixa esse arquivo).

## Variáveis de ambiente

Copie `.env.example` para `.env.local` (no computador) ou configure no painel da hospedagem.

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Endereço público (SEO, sitemap, Open Graph, compartilhamento). Precisa existir no momento do build. |
| `DATABASE_URL` | Banco PostgreSQL onde as mensagens do formulário são guardadas |
| `EVOLUTION_API_URL`, `EVOLUTION_API_KEY`, `EVOLUTION_INSTANCE`, `CONTACT_WHATSAPP_NUMBER` | Aviso de nova mensagem no WhatsApp (Evolution API v2) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | E-mails por SMTP: aviso completo para você e resposta automática para quem escreveu |

### Formulário de contato

Cada mensagem é **guardada no banco** (tabela `mensagens_contato`, criada automaticamente), **avisada no WhatsApp** pela Evolution e **por e-mail** (SMTP). Quem escreveu recebe uma **resposta automática** confirmando o recebimento — sem repetir o texto enviado e no máximo 2 por endereço a cada 24 horas, para o formulário não ser usado para mandar e-mail a terceiros. Se um aviso falhar, a mensagem continua no banco e nada se perde.

Sem nenhum canal configurado, o formulário mostra "o envio de mensagens ainda não está disponível" e sugere o e-mail direto, sem quebrar a página.
Proteções: validação no servidor, campo invisível contra robôs, limite de 5 mensagens a cada 10 minutos por IP e bloqueio de envios de outra origem.

## Publicar (VPS)

O site roda na VPS em Docker (`/opt/portfolio`): contêiner do site + PostgreSQL próprio, com o Nginx na frente e HTTPS do Let's Encrypt. Os arquivos ficam em `deploy/`:

| Arquivo | Para quê |
|---|---|
| `deploy/docker-compose.yml` | Site + banco (o banco não fica exposto para a internet) |
| `deploy/.env.vps.example` | Modelo do `.env` do servidor (segredos ficam só lá) |
| `deploy/deploy.sh` | Recebe a imagem pronta, troca a versão e confere se subiu |
| `deploy/nginx-yvtech.com.br.conf` | Endereço no Nginx (o HTTPS é acrescentado pelo certbot) |
| `deploy/publicar-daqui.sh` | Publica a partir deste computador: monta a imagem aqui e envia pronta |
| `deploy/ativar-publicacao-automatica.sh` | Rodar uma vez: cria a chave restrita de publicação, cadastra na VPS e guarda nos segredos do GitHub |
| `deploy/github-actions-publicar.yml.modelo` | Publicação automática a cada push (ativa depois do script acima) |

Publicar uma versão nova:

```bash
bash deploy/publicar-daqui.sh
```

A VPS não compila nada: só recebe a imagem e troca, em segundos.

## Estrutura

```
src/
  app/                 páginas, layout, SEO (sitemap, robots, Open Graph, manifesto), 404, erro
    api/contato/       envio do formulário
    projetos/[slug]/   página de cada projeto
  components/
    layout/            cabeçalho, menu do celular, tema, rodapé, progresso, voltar ao topo
    sections/          seções da página principal
    projects/          cards, ilustrações, galeria, arquitetura, compartilhamento
    contact/ hero/ motion/ stack/ shared/ ui/ brand/
  content/             conteúdo editável (ver acima)
  hooks/               seção ativa no menu, montagem no navegador
  lib/                 validação, envio de e-mail, limite de envios, utilidades
public/                foto, currículo e telas dos projetos
```

## Checklist antes de publicar

- [ ] Domínio definido e `NEXT_PUBLIC_SITE_URL` configurada
- [ ] SMTP configurado (caixa contato@) e uma mensagem de teste recebida
- [ ] Links de demonstração/GitHub preenchidos em `projects.ts`, quando existirem
- [ ] Currículo em PDF atualizado (ele traz o telefone; avalie se quer o telefone público na internet)
