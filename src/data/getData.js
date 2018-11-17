import data from './index';
import { uniq } from 'lodash';

function parseGroupWords([key, { items }]) {
  if (key === 'numerals') {
    return [];
  }

  return items
    .filter(({ polish, german }) => polish.length > 1 && german.length > 1)
    .map(({ polish, german }) => ({
      origin: Array.isArray(polish) ? polish[0] : polish,
      outcome: Array.isArray(german) ? german[0] : german,
      duration: 0
    }));
}

function getLetters(words) {
  const letters = words.reduce((arr, { outcome }) => arr.concat(outcome.split('')), []);

  return uniq(letters).sort((a, b) => a.localeCompare(b));
}

function getWords() {
  const words = Object.entries(data).reduce((arr, entry) => arr.concat(parseGroupWords(entry)), []);

  return words
    .sort((a, b) => a.origin.localeCompare(b.origin))
    .map((word, index) => ({
      id: index,
      ...word
    }));
}

export default function getData() {
  const words = getWords();
  const letters = getLetters(words);

  return {
    words,
    letters
  };
}
