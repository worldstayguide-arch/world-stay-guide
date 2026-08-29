export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function blogContentToHtml(content: string[]) {
  return content
    .map((block) => (block.trim().startsWith('<') ? block : `<p>${escapeHtml(block)}</p>`))
    .join('');
}
