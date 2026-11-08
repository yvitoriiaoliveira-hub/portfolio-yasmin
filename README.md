# Portfólio — Yasmin Vitória

Portfólio profissional de Yasmin Vitória, desenvolvedora Full Stack. Página principal com seções (apresentação, sobre, experiência, projetos, stack, formação e contato) e uma página para cada projeto.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** estrito
- **Tailwind CSS 4** com tokens próprios de cor (modo claro e escuro)
- **Motion** para animações (respeita "reduzir movimento" do sistema)
- **next-themes** (tema com persistência) · **Radix UI** (menu do celular e galeria) · **Lucide** e **React Icons** (ícones)
- **React Hook Form** + **Zod** (formulário, com a mesma validação no navegador e no servidor) · **Sonner** (avisos)
- Envio de e-mail pelo **Resend** (API HTTP, sem dependência extra)
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
| `NEXT_PUBLIC_SITE_URL` | Endereço público (SEO, sitemap, Open Graph, compartilhamento). Sem ela, o site usa `http://localhost:3000`. |
| `RESEND_API_KEY` | Chave do Resend para o formulário de contato |
| `CONTACT_FROM_EMAIL` | Remetente (domínio verificado no Resend) |
| `CONTACT_TO_EMAIL` | Quem recebe as mensagens |

### Formulário de contato

1. Crie uma conta em [resend.com](https://resend.com) e gere uma chave em **API Keys**.
2. Em **Domains**, verifique o domínio do site (registros DNS que o Resend mostra).
3. Configure as três variáveis acima e publique de novo.

Sem a configuração, o formulário mostra "o envio de mensagens ainda não está disponível" e sugere o e-mail direto, sem quebrar a página.
Proteções: validação no servidor, campo invisível contra robôs, limite de 5 mensagens a cada 10 minutos por IP e bloqueio de envios de outra origem.

## Publicar

**Vercel (mais simples):** importe o repositório, configure as variáveis de ambiente e publique.

**Servidor próprio (VPS):**

```bash
npm ci
npm run build
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br npm start   # porta 3000 por padrão (use -p para trocar)
```

Coloque o Nginx na frente com HTTPS. Atenção: `NEXT_PUBLIC_SITE_URL` precisa existir **no momento do build**.

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
- [ ] Resend configurado e uma mensagem de teste recebida
- [ ] Links de demonstração/GitHub preenchidos em `projects.ts`, quando existirem
- [ ] Currículo em PDF atualizado (ele traz o telefone; avalie se quer o telefone público na internet)
