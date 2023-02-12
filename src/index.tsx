import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { reducer, StateProvider } from './state';

ReactDOM.render(
  <StrictMode>
    <StateProvider reducer={reducer}>
      <App />
    </StateProvider>
  </StrictMode>,
  document.getElementById('root')
);
