function combineWords(word1, word2) {
  const combined = word1 + word2;
  let sum = 0;

  for (let char of combined) {
    sum += char.charCodeAt(0);
  }

  return sum;
}

export default combineWords;