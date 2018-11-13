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
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          size="large"
        />
        <div className="small-header">Possible characters:</div>
        <div>{this.props.letters.join(' ')}</div>
        <Button onClick={() => this.guess()} size="large">Check</Button>
      </div>
    );
  }
}
