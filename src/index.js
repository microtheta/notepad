import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './pages/index';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
if(process.env.NODE_ENV !== 'development') {
  import('@sentry/browser').then((Sentry) => {
    Sentry.init({ dsn: 'https://b1c05155a231405a991cd55f92b226ce@sentry.io/1356723' });
  }).catch(err => { console.log(err) });

  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
