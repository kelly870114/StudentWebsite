import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { isNullOrUndefined } from 'util';
import Goodmorninglogo from './images/goodmorning.png';
import Ferris from './images/ferris.png';
import LoginSelect from './loginselect.jsx';
import Loginbutton from './loginbutton.jsx';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import IndexComponent from '../Bar.jsx';
import ScoreComponent from '../score/score-app';
import AttendComponent from '../attend/attendComponent';
import ReserveComponent from '../reserve/reserveComponent';
import Reserve2 from '../reserve2/reserveComponent2';
import Reserve3 from '../reserveList/reserveListComponent';
import MyPage from '../studentpage/studentpage';
import Bar from '../Bar.jsx';

const styles = {
  background: {
    display:'flex',
    background:'#FFF6E8',
    width:'auto',
    height:'auto',
    
    //minHeight:100,
  },
  logocss: {
    display: 'block',
    margin: 'auto',
    marginTop: 60,
    marginLeft:90,
    marginBottom: 30,
    //paddingLeft: 250,
    
  },
  amusecss: {
    display: 'block',
    margin: 'auto',
    width:'auto',
    height:'auto',
    marginTop: 20,
  },
  
  div1:{
    display: 'inline-block',
    margin: 'auto',
    //alignItem: 'center',
    //marginLeft: 200,
    //marginRight: 200,
  },
};

function Login(props) {
  const { classes } = props;
  return (
    // <Router>
    <div className={classes.background}>
    <div className={classes.div1}>
      <div>
      <Typography className={classes.logocss}>
            <img src ={Goodmorninglogo} height ="101.25" width ="155.25"/>
      </Typography>
      </div>
      
      <div>
      <LoginSelect/>
      <div>
      <NavLink activeClassName="active" to="/index">
          <Loginbutton/>
      </NavLink>
      </div>
      </div>

      <div>
      <Typography className={classes.amusecss}>
            <img src ={Ferris} height="103.5" width="317.4"/>
      </Typography>
      </div>
      
      </div>
      
    </div>
    //  <div>
    //     <Route path="/index" component={IndexComponent} />
    //     <Route path="/attend" component={AttendComponent} />
    //     <Route path="/score" component={ScoreComponent} />
    //     <Route path="/reserve" component={ReserveComponent}/>
    //     <Route path="/reserve2" component={Reserve2}/>
    //     <Route path="/reserve3" component={Reserve3}/>
    //     <Route path="/mypage" component={MyPage}/>
    // </div>
    // </Router> 
    
    
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);