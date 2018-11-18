import React from 'react';
import BadList from './badList';
import GoodList from './goodList';
import Guess from './guess';
import Menu from './menu';
import Status from './status';
import './styles.scss';

export default function Game({ state, store }) {
  const { good, bad, letters, isFinished, currentWord } = state;
  const { guess } = store;

  return (
    <div className="game">
      <Status good={good} bad={bad}/>
      <BadList words={bad} />
      <div className="game-content">
        {!isFinished && <Guess letters={letters} currentWord={currentWord} guess={guess} />}
        {isFinished && <div className="">Finished!</div>}
        <Menu store={store} state={state} />
      </div>
      <GoodList words={good} />
    </div>
  );
}
