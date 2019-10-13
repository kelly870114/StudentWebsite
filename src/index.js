import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReactApp from './components/react-app.jsx';
import * as serviceWorker from './serviceWorker';
import Bar from './components/Bar.jsx'
import Try from './components/tabletry.jsx'
import Reserve from './components/reserve/reserveComponent.jsx'
import Login from './components/Loginpage/logincomponent'
import TeachBar from './TeachComponent/TeachBar'
import App from './App'
import LoginAll from './components/Loginpage/loginAll'

ReactDOM.render(<App/>, document.getElementById('root'));
//ReactDOM.render({viewpage}, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();