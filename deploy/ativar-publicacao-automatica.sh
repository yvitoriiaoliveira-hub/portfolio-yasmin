#!/usr/bin/env bash
# Ativa a publicação automática do portfólio (GitHub Actions → VPS). Rode UMA vez:
#
#   bash deploy/ativar-publicacao-automatica.sh
#
# O que faz:
#   1. Cria uma chave SSH só para a publicação.
#   2. Cadastra essa chave na VPS com restrição: ela só consegue rodar
#      /opt/portfolio/deploy.sh (trocar a versão do portfólio) — nada mais.
#   3. Guarda a chave nos segredos do repositório no GitHub (VPS_DEPLOY_KEY,
#      VPS_KNOWN_HOSTS, VPS_HOST).
#   4. Apaga a cópia local da chave.
#
# Rodar de novo troca a chave (a antiga deixa de funcionar).
set -euo pipefail

VPS_HOST="${VPS_HOST:-yvtech.com.br}"
MINHA_CHAVE="${MINHA_CHAVE:-$HOME/.ssh/id_ed25519_yvitoria}"
REPO="yvitoriiaoliveira-hub/portfolio-yasmin"
GH="$(command -v gh || echo "$HOME/.local/bin/gh")"
NOME="publicacao-portfolio-github"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "→ 1/3 Criando a chave de publicação..."
ssh-keygen -q -t ed25519 -N "" -C "$NOME" -f "$TMP/id"

echo "→ 2/3 Cadastrando na VPS (restrita ao deploy.sh)..."
printf 'restrict,command="/opt/portfolio/deploy.sh" %s\n' "$(cat "$TMP/id.pub")" |
  ssh -i "$MINHA_CHAVE" -o IdentitiesOnly=yes "root@$VPS_HOST" \
    "sed -i '/$NOME/d' ~/.ssh/authorized_keys && cat >> ~/.ssh/authorized_keys && echo '   chave cadastrada'"

echo "→ 3/3 Guardando nos segredos do GitHub..."
ssh-keyscan -t ed25519 "$VPS_HOST" 2>/dev/null > "$TMP/known_hosts"
"$GH" secret set VPS_DEPLOY_KEY -R "$REPO" < "$TMP/id"
"$GH" secret set VPS_KNOWN_HOSTS -R "$REPO" < "$TMP/known_hosts"
"$GH" secret set VPS_HOST -R "$REPO" -b "$VPS_HOST"

echo
echo "✓ Pronto. A cópia local da chave foi apagada."
echo "  Falta só ativar o workflow (.github/workflows/publicar.yml) — peça ao Claude."
