import "server-only";

/**
 * Limite simples por IP, em memória (suficiente para um portfólio em uma instância só).
 * Em hospedagem com várias instâncias, troque por um armazenamento compartilhado (ex.: Redis).
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [storedKey, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(storedKey);
    }
  }

  return false;
}
