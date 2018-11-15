import getData from './data/getData';

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
      available: state.allWords.slice().sort(() => Math.random() - 0.5),
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

  guess({ state, data: triedWord, store }) {
    const { currentWord } = state;

    if (currentWord.german === triedWord) {
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
  },

  toggleAllWordsList({ state, data }) {
    const allWordsListVisible = data === undefined ? !state.allWordsListVisible : !!data;

    return {
      allWordsListVisible
    };
  }
};
