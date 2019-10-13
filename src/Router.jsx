import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReactApp from './components/react-app.jsx';
import * as serviceWorker from './serviceWorker';
import Bar from './components/Bar.jsx'
import Login from './components/Loginpage/login.jsx';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { withStyles, MuiThemeProvider, createMuiTheme,styles } from '@material-ui/core/styles';
import Index from './index';
import ScoreComponent from './components/score/score-app';
import AttendComponent from './components/attend/attendComponent';
import ReserveComponent from './components/reserve/reserveComponent';
import Reserve2 from './components/reserve2/reserveComponent2';
import Reserve3 from './components/reserveList/reserveListComponent';
import MyPage from './components/studentpage/studentpage';
import theme from './theme';
import Theme from '@e-group/react-material-components/dist/Theme';

//ReactDOM.render(<Index />, document.getElementById('root'));
class Barrr extends React.Component {
    render() {
        return(
            <Router>
                <Theme theme={theme}>
                    <Route path="/" component={Login} />
                    <Route path="/index" component={Bar} />
                    <Route path="/attend" component={AttendComponent} />
                    <Route path="/score" component={ScoreComponent} />
                    <Route path="/reserve" component={ReserveComponent}/>
                    <Route path="/reserve2" component={Reserve2}/>
                    <Route path="/reserve3" component={Reserve3}/>
                    <Route path="/mypage" component={MyPage}/>
                </Theme>
            </Router>
        );
    }
}
export default withStyles(styles, { withTheme: true })(Barrr);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();