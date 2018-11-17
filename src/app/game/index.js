import React from 'react';
import BadList from './badList';
import GoodList from './goodList';
import Guess from './guess';
import Menu from './menu';
import './styles.scss';

const PERCENT = 100;

function calculateStatus(good, bad) {
  const goodCount = good.length;
  const badCount = bad.length;

  if (!badCount) {
    return {
      left: '0'
    };
  }

  if (!goodCount) {
    return {
      left: '100%'
    };
  }

  const total = goodCount + badCount;

  return {
    left: `${Math.floor((badCount / total) * PERCENT)}%`
  };
}

export default function Game({ state, store }) {
  const { good, bad, letters, isFinished, currentWord } = state;
  const { guess } = store;
  const style = calculateStatus(good, bad);

  return (
    <div className="game">
      <div className="game__status" style={style} />
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
