import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Bar from './components/Bar'
import TeachBar from './TeachComponent/TeachBar'
import LoginAll from './components/Loginpage/loginAll'

class App extends Component {
      render() {
            return (
                  <Router>
                        <Route exact path="/" component={LoginAll} />  
                        <Route path="/bar" component={Bar} />
                        <Route path="/teach" component={TeachBar} />  
                  </Router>
            );
      }
}

export default App;
