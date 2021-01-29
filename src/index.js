import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/configureStore';
import { setUser } from './store/actions/userActions';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const user = window.localStorage.getItem('user');
if (user) {
  try {
    const userData = JSON.parse(user);
    store.dispatch(setUser(userData));
  }
  catch (error) {
    console.log('Unable to fetch user data from store', error);
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
