import React from 'react';
import { Button } from 'antd';

function KeyboardButton({ letter, useLetter }) {
  return (<Button className={letter === '' ? 'is-invisible' : ''} onClick={() => useLetter(letter)} >{letter}</Button>);
}

function KeyboardRow({ row, useLetter }) {
  return (
    <div className="keyboard__row">
      {row.map((letter, index) => <KeyboardButton key={index} letter={letter} useLetter={useLetter} />)}
    </div>
  );
}

export default function Keyboard({ keyboard, useLetter }) {
  return (
    <div className="keyboard">
      {keyboard.map((row, index) =>
        <KeyboardRow key={index} useLetter={useLetter} row={row} />
      )}
    </div>
  );
}
