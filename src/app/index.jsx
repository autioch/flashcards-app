import React from 'react';
import Guess from './guess.jsx';
import List from './list.jsx';
import { Button } from 'antd';

import './styles.scss';

export default function App({ state, store }) {
  const { good, bad, available, letters } = state;

  return (
    <div className="app">
      <List words={bad} header="Bad" />
      <div className="col mid">
        {!state.isFinished && <Guess letters={letters} currentWord={state.currentWord} guess={store.guess} />}
        {state.isFinished && <div className="col__header">Finished!</div>}
        <div className="restart">
          <div className="col__header">{available.length} word{available.length > 1 ? 's' : ''} left</div>
          <Button onClick={store.restart} size="large">Restart</Button>
        </div>
      </div>
      <List words={good} header="Good" />
    </div>
  );
}
