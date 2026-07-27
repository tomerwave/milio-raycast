export function normalizeContent(value: string): string {
  return value.trim();
}

export function isValidContent(value: string): boolean {
  return normalizeContent(value).length > 0;
}
