import React, { Component } from 'react';
import { Button } from 'antd';
import Keyboard from './keyboard';
import Input from './input';

import './styles.scss';

export default class Guess extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      guess: '',
      start: new Date()
    };
    this.guess = this.guess.bind(this);
    this.useLetter = this.useLetter.bind(this);
    this.updateGuess = this.updateGuess.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentWord !== nextProps.currentWord) {
      this.setState({
        guess: '',
        start: new Date().getTime()
      });
    }
  }

  updateGuess(ev) {
    this.setState({
      guess: ev.target.value
    });
  }

  guess() {
    const duration = new Date().getTime() - this.state.start;

    this.props.guess({
      guess: this.state.guess,
      duration
    });
  }

  useLetter(letter) {
    const { guess } = this.state;
    const newGuess = letter === '←' ? guess.slice(0, -1) : guess + letter;

    this.setState({
      guess: newGuess
    });
  }

  render() {
    return (
      <div className="game-guess">
        <div className="current-word">{this.props.currentWord.origin}</div>
        <Input value={this.state.guess} update={this.updateGuess} approve={this.guess} />
        <Keyboard keyboard={this.props.keyboard} useLetter={this.useLetter} />
        <Button className="game-guess__check" size="large" onClick={this.guess} type="primary">Check</Button>
      </div>
    );
  }
}
