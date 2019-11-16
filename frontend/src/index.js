import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/custom.scss'

console.log(process.env);
const isOnHeroku = !!(process.env.NODE && ~process.env.NODE.indexOf("heroku"));

ReactDOM.render(<App isOnHeroku={isOnHeroku}/>, document.getElementById('root'));
