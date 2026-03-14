function chunkText(text, targetTokens = 500) {
  if (!text || typeof text !== "string") return [];

  const words = text.replace(/\s+/g, " ").trim().split(" ");
  if (words.length === 0) return [];

  const chunks = [];
  let current = [];
  let count = 0;

  for (const word of words) {
    current.push(word);
    count += 1;

    if (count >= targetTokens) {
      chunks.push(current.join(" "));
      current = [];
      count = 0;
    }
  }

  if (current.length > 0) {
    chunks.push(current.join(" "));
  }

  return chunks;
}

module.exports = { chunkText };
