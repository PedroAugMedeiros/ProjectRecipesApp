import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RecipeContextProvider from './context/RecipeContextProvider';

ReactDOM.render(
  <RecipeContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecipeContextProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
