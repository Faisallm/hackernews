import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// allows the changes to appear without reloading the page...
// of the browser
// it is known as hot module replacement
if(module.hot) {
  module.hot.accept();
}
