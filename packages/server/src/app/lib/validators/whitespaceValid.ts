export default function whitespaceValid(text: string): boolean {
  const noWhitespace = text.replace(/\s/g, '');
  if (noWhitespace.length === 0) return false;

  return true;
}
