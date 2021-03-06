import React from 'react';
import { Input } from 'antd';

export default function GuessInput({ value, update, approve }) {
  return (
    <Input
      className="game-guess__input"
      value={value}
      placeholder="Place Your guess..."
      onChange={update}
      onPressEnter={approve}
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      size="large"
    />
  );
}
