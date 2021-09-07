import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import styled, { css, createGlobalStyle } from 'styled-components';

import { getResourceByName } from "./data/resources.js";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@100&display=swap');
  * {
    margin: 0;
    padding: 0;

    white-space: nowrap;
    font-family: 'Azeret Mono', monospace;

    user-select: none;
  }
  body {
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: var(--colReverse);

    background-color: var(--colMain1);
  }
  body#theme-dark, body:not(#theme-light){
    --colStrong: #000000;
    --colMain1: #191919;
    --colMain2: #2a2a2a;
    --colMain3: #3a3a3a;
    --colMain4: #4a4a4a;
    --colReverse: #ffffff;
    --colReverseWeak: #efefef;
    --colAlt1: #13d1f2;
  }
  body#theme-light {
    --colStrong: #ffffff;
    --colMain1: #ffffff;
    --colMain2: #efefef;
    --colMain3: #dedede;
    --colMain4: #cdcdcd;
    --colReverse: #191919;
    --colReverseWeak: #2a2a2a;
    --colAlt1: #f29913;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
