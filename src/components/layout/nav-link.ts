/** Na página inicial os links rolam até a seção; nas outras páginas, voltam para a inicial. */
export function sectionHref(id: string, pathname: string) {
  return pathname === "/" ? `#${id}` : `/#${id}`;
}
