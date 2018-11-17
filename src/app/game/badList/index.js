import React from 'react';
import './styles.scss';

function BadItem({ word }) {
  return (
    <div className="bad-list-item">
      <span className="origin">{word.origin}</span>
      <span className="outcome">{word.outcome}</span>
      { word.guess ? <span className="wrong">{word.guess}</span> : <span className="empty">no answer</span> }
    </div>
  );
}

export default function BadList({ words }) {
  const count = words.length;

  return (
    <div className="bad-list">
      <div className="game__header">{count} bad</div>
      <div className="word-list">
        {words.map((word) => <BadItem key={word.id} word={word} />)}
      </div>
    </div>
  );
}
