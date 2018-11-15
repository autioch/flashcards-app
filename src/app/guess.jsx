import React, { Component } from 'react';
import { Button, Input } from 'antd';

export default class Guess extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      guess: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentWord !== nextProps.currentWord) {
      this.setState({
        guess: ''
      });
    }
  }

  updateGuess(ev) {
    const guess = ev.target.value;

    this.setState({
      guess
    });
  }

  guess() {
    this.props.guess(this.state.guess);
  }

  appendLetter(letter) {
    this.setState({
      guess: this.state.guess + letter
    });
  }

  render() {
    return (
      <div className="item-suggestion">
        <div className="col__header">Word to translate</div>
        <div>{this.props.currentWord.polish}</div>
        <Input
          value={this.state.guess}
          placeholder="Place Your guess..."
          onChange={(ev) => this.updateGuess(ev)}
          onPressEnter={() => this.guess()}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          size="large"
        />
        <div className="small-header">Possible characters:</div>
        <div className="suggestion__keyboard">
          {
            this.props.letters.map(
              (letter, index) => <Button key={index} onClick={() => this.appendLetter(letter)}>{letter}</Button>
            )
          }
        </div>
        <Button onClick={() => this.guess()} size="large">Check</Button>
      </div>
    );
  }
}
