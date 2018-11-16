import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Game from './game';
import Library from './library';
import './styles.scss';

export default function App({ state, store }) {
  return (
    <div className="app">
      <Router

      // basename="/flashcards-app" // This should be commented for development until fixed.
      >
        <div>

          <Route exact path="/" render={() => <Game state={state} store={store} /> } />
          <Route exact path="/library" render={() => <Library state={state} store={store} /> } />
        </div>
      </Router>
    </div>
  );
}
