import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** true só no navegador, depois da hidratação (sem setState em efeito). */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
