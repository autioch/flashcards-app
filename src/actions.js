import { uniq } from 'lodash';

const HALF = 0.5;
const MILISECOND = 1000;

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

        const allLetters = words.reduce((arr, { outcome }) => arr.concat(outcome.split('')), []);
        const letters = uniq(allLetters).sort((a, b) => a.localeCompare(b));

        store
          .setData({
            words,
            letters
          })
          .restart();
      });
  },

  setData({ data }) {
    const { words, letters } = data;

    return {
      allWords: words,
      letters
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

    if (currentWord.outcome === guess) {
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
