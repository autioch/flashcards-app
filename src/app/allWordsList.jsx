import React from 'react';
import './allWordsList.scss';

export default function AllWordsList({ allWords, toggleAllWordsList }) {
  return (
    <div>
      <div className="all-words-list__overlay" onClick={() => toggleAllWordsList(false)}/>
      <div className="all-words-list__modal">
        <div className="all-words-list__header">All words ({allWords.length})</div>
        <div className="all-words-list__table">
          {allWords.map((word, i) =>
            <div key={i} className="all-words-list__row">
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
    </div>
  );
}
