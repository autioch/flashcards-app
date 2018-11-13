import data from './index';
import { uniq } from 'lodash';

export default function getData() {
  const words = Object.entries(data).reduce((arr, [, { items }]) => {
    const simplifiedItems = items
      .filter(({ polish }) => polish !== '.')
      .map(({ polish, german }) => ({
        polish: Array.isArray(polish) ? polish[0] : polish,
        german: Array.isArray(german) ? german[0] : german
      }));

    return arr.concat(simplifiedItems);
  }, []);

  const letters = words.reduce((arr, { german }) => arr.concat(german.split('')), []);
  const uniqLetters = uniq(letters).sort((a, b) => a.localeCompare(b));

  return {
    words,
    letters: uniqLetters
  };
}
