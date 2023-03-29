export function createNestedWith(
  count: number,
  key: string = "$proxies"
): { start: string; end: string } {
  let start = "";
  let end = "";
  for (let i = count - 1; i >= 0; i--) {
    start += `with(${key}[${i}]){`;
    end += "}";
  }
  return { start, end };
}
