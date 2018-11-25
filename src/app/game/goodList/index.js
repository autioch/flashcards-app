import React from 'react';
import './styles.scss';

function GoodItem({ word }) {
  return (
    <div className="good-list-item">
      <span className="origin">{word.origin}</span>
      <span className="outcome">{word.outcome}</span>
      <span className="duration">{word.duration}s</span>
    </div>
  );
}

export default function GoodList({ words }) {
  const count = words.length;

  return (
    <div className="good-list">
      <div className="game__header">Good: {count}</div>
      <div className="word-list">
        {words.map((word) => <GoodItem key={word.id} word={word} />)}
      </div>
    </div>
  );
}
