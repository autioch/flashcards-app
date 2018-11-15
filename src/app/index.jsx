import React from 'react';
import Guess from './guess.jsx';
import List from './list.jsx';
import { Button } from 'antd';
import AllWordsList from './allWordsList.jsx';
import './styles.scss';

export default function App({ state, store }) {
  const { good, bad, available, letters, allWordsListVisible, allWords, isFinished, currentWord } = state;
  const { toggleAllWordsList, guess, restart } = store;

  return (
    <div className="app">
      <List words={bad} header="Bad" />
      <div className="col mid">
        {!isFinished && <Guess letters={letters} currentWord={currentWord} guess={guess} />}
        {isFinished && <div className="col__header">Finished!</div>}
        <div className="restart">
          <div className="col__header">{available.length} word{available.length > 1 ? 's' : ''} left</div>
          <Button onClick={restart} size="large">Restart</Button>
          <Button onClick={() => toggleAllWordsList(true)} size="large">Show list</Button>
        </div>
      </div>
      <List words={good} header="Good" />
      {allWordsListVisible && <AllWordsList allWords={allWords} toggleAllWordsList={toggleAllWordsList} />}
    </div>
  );
}
