import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

export default function Library({ state }) {
  const { allWords } = state;

  return (
    <div>
      <div className="all-words-list__close">
        <NavLink exact className="menu__link" to="/" activeClassName="menu__link--active">X</NavLink>
      </div>
      <div className="all-words-list__header">All words ({allWords.length})</div>
      <div className="all-words-list__table">
        {allWords.map((word, index) =>
          <div key={index} className="all-words-list__row">
            <div className="all-words-list__cell">
              {word.polish}
            </div>
            <div className="all-words-list__cell">
              {word.german}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
