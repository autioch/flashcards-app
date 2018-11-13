import data from './index';
import { uniq } from 'lodash';

function parseGroupWords([key, { items }]) {
  if (key === 'numerals') {
    return [];
  }

  return items
    .filter(({ polish, german }) => polish.length > 1 && german.length > 1)
    .map(({ polish, german }) => ({
      polish: Array.isArray(polish) ? polish[0] : polish,
      german: Array.isArray(german) ? german[0] : german
    }));
}

function getLetters(words) {
  const letters = words.reduce((arr, { german }) => arr.concat(german.split('')), []);

  return uniq(letters).sort((a, b) => a.localeCompare(b));
}

export default function getData() {
  const words = Object.entries(data).reduce((arr, entry) => arr.concat(parseGroupWords(entry)), []);
  const letters = getLetters(words);

  return {
    words,
    letters
  };
}
