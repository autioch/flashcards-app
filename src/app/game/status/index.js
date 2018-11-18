import React, { Component } from 'react';
import canvasLightning from 'canvas-lightning';
import './styles.scss';

const PERCENT = 100;

function calculateStatus(good, bad) {
  const goodCount = good.length;
  const badCount = bad.length;

  if (!badCount) {
    return 0;
  }

  if (!goodCount) {
    return PERCENT;
  }

  const total = goodCount + badCount;

  return Math.floor((badCount / total) * PERCENT);
}

export default class GameStatus extends Component {
  componentDidMount() {
    this.setLightning();
  }

  componentWillUnmount() {
    this.lightning.stop();
  }

  setLightning() {
    const { canvas } = this.refs;
    const rect = canvas.getBoundingClientRect();

    this.lightning = canvasLightning(canvas, {
      WIDTH: rect.width,
      HEIGHT: rect.height,
      COLOR_BG: 'transparent',

      // COLOR_LIGHT: '#fff',
      // COLOR_BLUR: '#fff',
      LINE_JOIN: 'round',
      LINE_WIDTH: 5,
      LINE_BLUR: 2,
      MIN_X: 1,
      MAX_X: 3
    });
    this.lightning.start();
  }
  render() {
    const left = calculateStatus(this.props.good, this.props.bad);
    const showLightning = left > 0 && left < 100;

    return (
      <div className="game-status" style={{
        left: `${left}%`
      }}>
        {<canvas ref="canvas" className={`game-status__canvas${showLightning ? '' : ' is-invisible'}`}></canvas>}
      </div>
    );
  }
}
