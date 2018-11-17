import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import './styles.scss';

export default function GameMenu({ state, store }) {
  const { available } = state;
  const { restart } = store;

  return (
    <div className="game-menu">
      <div className="game__header">{available.length} word{available.length > 1 ? 's' : ''} left</div>
      <div className="game-menu-options">
        <Button onClick={restart} type="danger">Restart</Button>
        <NavLink exact to="/library">
          <Button onClick={restart}>Library</Button>
        </NavLink>
      </div>
    </div>
  );
}
