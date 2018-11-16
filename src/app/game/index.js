import React from 'react';
import Guess from './guess';
import List from './list';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import './styles.scss';

export default function Game({ state, store }) {
  const { good, bad, available, letters, isFinished, currentWord } = state;
  const { guess, restart } = store;

  return (
    <div className="app-page game">
      <List words={bad} header="Bad" />
      <div className="col mid">
        {!isFinished && <Guess letters={letters} currentWord={currentWord} guess={guess} />}
        {isFinished && <div className="col__header">Finished!</div>}
        <div className="restart">
          <div className="col__header">{available.length} word{available.length > 1 ? 's' : ''} left</div>
          <Button onClick={restart} size="large">Restart</Button>
          <NavLink exact to="/library" activeClassName="menu__link--active">
            <Button onClick={restart} size="large">Library</Button>
          </NavLink>
        </div>
      </div>
      <List words={good} header="Good" />
    </div>
  );
}
