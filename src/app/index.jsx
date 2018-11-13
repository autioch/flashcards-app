import React from 'react';
import Guess from './guess.jsx';
import { Button } from 'antd';

import './styles.scss';

export default function App({ state, store }) {
  const { good, bad, available, letters } = state;

  return (
    <div className="app">
      <div className="col bad">
        <div className="col__header">Bad ({bad.length})</div>
        {bad.map((word, i) => <div key={i}>{word.polish} - {word.german}</div>)}
      </div>
      <div className="col mid">
        {!state.isFinished && <Guess letters={letters} currentWord={state.currentWord} guess={store.guess} />}
        {state.isFinished && <div className="col__header">Finished!</div>}
        <div className="restart">
          <div className="col__header">{available.length} word{available.length > 1 ? 's' : ''} left</div>
          <Button onClick={store.restart}>Restart</Button>
        </div>
      </div>
      <div className="col good">
        <div className="col__header">Good ({good.length})</div>
        {good.map((word, i) => <div key={i}>{word.polish} - {word.german}</div>)}
      </div>
    </div>
  );
}
