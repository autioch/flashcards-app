import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import './styles.scss';

export default function Library({ state }) {
  const { allWords } = state;

  return (
    <div className="app-page">
      <div className="library__header">
        <div className="library__label">Words library({allWords.length})</div>
        <Link className="library__close" to="/">
          <Icon type="close-circle" />
        </Link>
      </div>
      <div className="library__list">
        {allWords.map((word, index) =>
          <div key={index} className="library__row">
            <div className="library__cell">{word.polish}</div>
            <div className="library__cell">{word.german}</div>
          </div>
        )}
      </div>
    </div>
  );
}
