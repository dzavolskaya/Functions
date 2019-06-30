const stopWords = ['and', 'or', 'a', 'the', ''];
const words = ['HellO', 'h', 'And', 'heLlo', '', 'AND', 'DOG', 'oR', 'cat', 'HELLO', 'caT'];
wordsCount(words, stopWords); // [['hello', 3], ['h', 1], ['dog', 1], ['cat', 2]]

const wordsCounts = (words, stopWords) => words
  .map(word => word.toLowerCase())
  .filter(word => !stopWords.includes(word))
  .reduce((acc, word) => {
    if (!acc.has(word)) {
      return acc.set(word, 1);
    }
    return acc.set(word, acc.get(word) + 1);
  }, new Map());