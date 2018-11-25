import { flattenDeep, uniq, chunk } from 'lodash';

const HALF = 0.5;
const MILISECOND = 1000;
const KEYBOARD_ROW_LENGTH = 10;

function setupKeyboard(words) {
  const keyboard = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  const keyboardLetters = flattenDeep(keyboard).reduce((obj, letter) => Object.assign(obj, {
    [letter]: true
  }), {});

  const allLetters = words
    .reduce((arr, { outcome }) => arr.concat(outcome.toLowerCase().split('')), [])
    .filter((letter) => !keyboardLetters[letter]);

  const extraLetters = uniq(allLetters).sort((a, b) => a.localeCompare(b)).concat('←');
  const extraRows = chunk(extraLetters, KEYBOARD_ROW_LENGTH);
  const fullKeyboard = keyboard.concat(extraRows);

  return fullKeyboard;
}

export default {

  prepare({ store, state }) {
    window
      .fetch(`${state.urlFolderPath}/library.csv`)
      .then((resp) => resp.text())
      .then((contents) => {
        const lines = contents.trim().split('\n');
        const words = lines.map((line, index) => {
          const [income, outcome, isIgnored = false] = line.trim().split(';');

          return {
            id: index,
            origin: income,
            outcome,
            isIgnored: !!isIgnored
          };
        });

        store
          .setData(words)
          .restart();
      });
  },

  setData({ data: words }) {
    return {
      allWords: words,
      keyboard: setupKeyboard(words)
    };
  },

  start({ state }) {
    return {
      available: state.allWords.slice().sort(() => Math.random() - HALF),
      good: [],
      bad: [],
      isFinished: false
    };
  },

  restart({ store }) {
    return store.start().pick();
  },

  pick({ state }) {
    return {
      currentWord: state.available[0],
      available: state.available.slice(1)
    };
  },

  finish() {
    return {
      isFinished: true
    };
  },

  guess({ state, data, store }) {
    const { guess, duration } = data;
    const { currentWord } = state;

    currentWord.duration = Math.round(duration / MILISECOND);
    currentWord.guess = guess;

    if (currentWord.outcome.toLowerCase() === guess.toLowerCase()) {
    // if (Math.random() > HALF) {
      store.setGood();
    } else {
      store.setBad();
    }

    if (!state.available.length) {
      store.finish();
    }

    store.pick();
  },

  setGood({ state }) {
    return {
      good: [state.currentWord].concat(state.good),
      currentWord: null
    };
  },

  setBad({ state }) {
    return {
      bad: [state.currentWord].concat(state.bad),
      currentWord: null
    };
  }
};
