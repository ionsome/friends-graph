import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/custom.scss'


const isInProduction = !!(process.env.NODE_ENV && ~process.env.NODE_ENV.indexOf("production"));

ReactDOM.render(<App isInProduction={isInProduction}/>, document.getElementById('root'));
