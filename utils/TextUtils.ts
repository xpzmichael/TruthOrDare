
export const splitEnglishIntoLines = (text: string, maxWidth: number, charWidth: number) => {
  const lines = [];
  let currentLine = '';
  const charEveryLine = maxWidth / charWidth * 2;

  const words = text.split(' ');
  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine + words[i] + ' ';
    if (testLine.length >= charEveryLine) {
        lines.push(currentLine);
        currentLine = words[i] + ' ';
    } else {
        currentLine = testLine;
    }
  }
  if (currentLine) {
      lines.push(currentLine);
  }
  return lines;
}; 

export const splitChineseIntoLines = (text: string, maxWidth: number, charWidth: number) => {
  const lines = [];
  let currentLine = '';
  const charEveryLine = maxWidth / charWidth;

  for (let i = 0; i < text.length; i++) {
      const testLine = currentLine + text[i];
      if (testLine.length >= charEveryLine) {
          lines.push(currentLine);
          currentLine = text[i];
      } else {
          currentLine = testLine;
      }
  }

  if (currentLine) {
      lines.push(currentLine);
  }

  return lines;
}; 