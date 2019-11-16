import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/custom.scss'

const isOnHeroku = !!(process.env.NODE && ~process.env.NODE.indexOf("heroku"));

ReactDOM.render(<App isOnHeroku={isOnHeroku}/>, document.getElementById('root'));
