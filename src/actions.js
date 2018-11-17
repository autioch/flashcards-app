import getData from './data/getData';

const HALF = 0.5;

export default {

  setData() {
    const { words, letters } = getData();

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

    currentWord.duration = Math.round(duration / 1000);
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
