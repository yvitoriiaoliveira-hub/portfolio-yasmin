#!/usr/bin/env bash
# Publica o portfólio na VPS a partir deste computador:
# monta a imagem Docker aqui e envia pronta (a VPS não compila nada).
#
# Uso:  bash deploy/publicar-daqui.sh
set -euo pipefail
cd "$(dirname "$0")/.."

VPS="${VPS:-root@yvtech.com.br}"
KEY="${KEY:-$HOME/.ssh/id_ed25519_yvitoria}"

echo "→ Montando a imagem..."
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://yvtech.com.br -t portfolio-yasmin:latest .

echo "→ Enviando para a VPS e trocando a versão..."
docker save portfolio-yasmin:latest | gzip -1 | ssh -i "$KEY" -o IdentitiesOnly=yes "$VPS" /opt/portfolio/deploy.sh

echo "→ Conferindo o site..."
curl -fsS -o /dev/null -w "yvtech.com.br respondeu %{http_code}\n" https://yvtech.com.br/
