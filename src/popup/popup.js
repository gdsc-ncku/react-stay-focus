import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './popup.css';
import { Switch, Button, Card, Badge } from '@mui/material';

// Switch : on, off
// Card: a card group
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>, 
  document.getElementById("app")
);
