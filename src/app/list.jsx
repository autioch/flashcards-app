import React from 'react';

export default function List({ words, header }) {
  const count = words.length;

  return (
    <div className="col">
      <div className="col__header">{header} ({count})</div>
      <div className="word-list">
        {words.map((word, i) => <div key={i}>{word.polish} - {word.german}</div>)}
      </div>
    </div>
  );
}
