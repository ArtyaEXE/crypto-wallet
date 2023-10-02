export function copyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

export function formatText(text) {
  return `${text.slice(0, 5)}...${text.slice(-3)}`;
}
