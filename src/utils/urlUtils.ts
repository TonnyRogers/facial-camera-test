export function getCodeFromUrl(): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('code');
}

export function removeCodeFromUrl(): void {
  const url = new URL(window.location.href);
  url.searchParams.delete('code');
  window.history.replaceState({}, '', url.toString());
}
