#!/usr/bin/env bash
# Troca a versão do portfólio na VPS. Fica em /opt/portfolio/deploy.sh.
#
# É o único comando que a chave de publicação do GitHub Actions pode rodar
# (restrição "command=" no authorized_keys). Recebe a imagem Docker compactada
# pela entrada padrão: docker save portfolio-yasmin:latest | gzip | ssh ...
set -euo pipefail
cd /opt/portfolio

echo "→ Recebendo a imagem nova..."
gunzip | docker load

echo "→ Trocando a versão..."
docker compose up -d --remove-orphans

echo "→ Conferindo se subiu..."
for _ in $(seq 1 30); do
  if curl -fsS -o /dev/null http://127.0.0.1:3002/; then
    echo "✓ Portfólio no ar."
    docker image prune -f >/dev/null
    exit 0
  fi
  sleep 2
done

echo "✗ O portfólio não respondeu depois da troca." >&2
docker compose logs --tail 40 web >&2
exit 1
