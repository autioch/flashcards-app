import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import './styles.scss';

export default function GameMenu({ store, state }) {
  const { available } = state;
  const { restart } = store;

  return (
    <div className="game-menu">
      <Button size="large" type="primary" onClick={restart}>Restart</Button>
      <div className="game-menu__remaining">{available.length} left</div>
      <NavLink exact to="/library">
        <Button size="large" type="primary">Library</Button>
      </NavLink>
    </div>
  );
}
