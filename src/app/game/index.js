import React from 'react';
import BadList from './badList';
import Finished from './finished';
import GoodList from './goodList';
import Guess from './guess';
import Menu from './menu';
import Status from './status';
import './styles.scss';

export default function Game({ state, store }) {
  const { good, bad, keyboard, isFinished, currentWord } = state;
  const { guess } = store;

  return (
    <div className="game">
      <Status good={good} bad={bad}/>
      {!isFinished && <Guess keyboard={keyboard} currentWord={currentWord} guess={guess} />}
      {isFinished && <Finished />}
      <GoodList words={good} />
      <BadList words={bad} />
      <Menu store={store} state={state} />
    </div>
  );
}
