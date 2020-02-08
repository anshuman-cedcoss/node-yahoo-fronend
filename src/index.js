import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.slim.min";
import "popper.js/dist/umd/popper.min";
import "bootstrap/dist/js/bootstrap.min";


import { Provider  } from 'react-redux';
import { store } from './Reducers';

ReactDOM.render(<Provider store={store}>
   <div style={{width:"100%", "height" : "1024px"}}>
       <App />
   </div>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
