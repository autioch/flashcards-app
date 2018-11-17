import React from 'react';
import { Button } from 'antd';

function Letter({ letter, useLetter }) {
  return (
    <Button onClick={() => useLetter(letter)} >{letter}</Button>
  );
}

export default function GameGuessKeyboard({ letters, useLetter }) {
  return (
    <div className="keyboard">
      <div className="keyboard__header">Possible characters:</div>
      <div className="keyboard__letters">
        {letters.map((letter) => <Letter key={letter} letter={letter} useLetter={useLetter} />)}
      </div>
    </div>
  );
}
