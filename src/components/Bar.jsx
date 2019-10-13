import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import GlobeIcon from '@material-ui/icons/LanguageRounded';
import LatestnewsIcon from '@material-ui/icons/SmsRounded';
import ScoreIcon from '@material-ui/icons/CreateRounded';
import AssignIcon from '@material-ui/icons/AssignmentRounded';
import EventIcon from '@material-ui/icons/EventRounded';
import FaceIcon from '@material-ui/icons/FaceRounded';
import ExitIcon from '@material-ui/icons/ExitToAppRounded';
import Head from './head.jsx';
import Logowhite from './image/goodmorningwhite.png';
import Latestnews from './latestnews/news';

import ScoreComponent from './score/score-app';
//import ScoreComponent from './score/scoreComponent';
import AttendComponent from './attend/attendComponent';
import ReserveComponent from './reserve/reserveComponent';
import IndexComponent from './index/appComponent';
import Reserve2All from './reserve2/reserveAll';
import Reserve3 from './reserveList/reserve3All';
import MyPage from './studentpage/studentpage';
import LatestNews from './latestnews/news'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Airtable from 'airtable';

const TABLE_NAME = 'Student';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);

const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what the font-size on the html element is.
    fontFamily: 'Microsoft JhengHei',
  },
});


const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'flex',
    //fontfamily:"Microsoft JhengHei",
  },
  appBar: {
    background:'#FFBF5F',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
      
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },

  component:{
    marginLeft:'1px',
    marginRight:'1px',
  }
  
});


class MiniDrawer extends React.Component {
  state = {
    open: false, 
    studentName:'',
    studentID:'',
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  constuctor() {
    this.indexbutton = this.indexbutton.bind(this);
  }


  componentDidMount(){
    //for student name
     const fileterSentence = 'AND(student_email = ' + this.props.history.location.state + ')'

    table.select({
      //filterByFormula:('{student_email}=\'fabienne.yang@mail.com\''),
      //filterByFormula:'AND(student_email =\'fabienne.yang@mail.com\')',
      //filterByFormula:'AND(student_email =${'+this.props.history.location.state+'})',
      //filterByFormula: fileterSentence,
      view: "Grid view"
    }).eachPage((records, fetchNextPage) => {
      this.setState({ records });
      const student_name = this.state.records.map((record, index) => record.fields['student_name']);
      const student_email = this.state.records.map((record, index) => record.fields['student_email']);
      const student_id = this.state.records.map((record, index) => record.fields['student_id']);

      for(var index = 0; index <student_email.length; index++) {
        if(student_email[index] == this.props.history.location.state){
          this.setState({ studentName : student_name[index] });
          this.setState({ studentID : student_id[index] });
        }
      }
    }
    );
  }


  render() {
    //console.log(this.props.history.location.state);
    const { classes, theme } = this.props;
  
    return (
      <Router>
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.font}>
            <img src ={Logowhite} height ="45" width ="69"/>
            </Typography>
            
          </Toolbar>
        </AppBar>

        

        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
          <Head UserId={this.state.studentID}/>
          
          <div>
          <Typography  
            style={{fontSize:15,fontWeight: "bold",fontFamily: "Microsoft JhengHei",letterSpacing:2,}}>
            {this.state.studentName}
          </Typography>
          <Typography style={{fontSize:12,fontWeight: "bold",fontFamily: "Microsoft JhengHei",letterSpacing:2,}}>
            #{this.state.studentID}   
          </Typography>
          </div>

            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            
          </div>
          
          <Divider />
          {/* <List>
            {['首頁', '最新消息', '成績查詢', '出勤紀錄', '補課申請', '我的葉面'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}

        <br></br>
        
        <NavLink activeClassName="active" to="/bar" style={{textDecoration:'none',color:'#818181'}}>
          <ListItem button>
              <ListItemIcon>
                  <GlobeIcon />
              </ListItemIcon>
              <ListItemText><a style={{fontSize:16,fontWeight: "bold",fontFamily: "Microsoft JhengHei",
            letterSpacing:4,color:'#6C6C6C'}}>首頁</a></ListItemText>
          </ListItem>
        </NavLink>

        <NavLink activeClassName='active' to='/bar/latestnews' style={{textDecoration:'none',color:'#818181'}}>
        <ListItem button>
          <ListItemIcon  >
            <LatestnewsIcon />
          </ListItemIcon>
          {/* <Typography>
            最新消息
          </Typography> */}
          <ListItemText><a style={{fontSize:16,fontWeight: "bold",fontFamily: "Microsoft JhengHei",
            letterSpacing:4,color:'#6C6C6C'}}>最新消息</a></ListItemText>
        </ListItem></NavLink>

        <NavLink activeClassName='active' to='/bar/score' style={{textDecoration:'none',color:'#818181'}}>
        <ListItem button>
          <ListItemIcon>
            <ScoreIcon />
          </ListItemIcon>
          <ListItemText><a style={{fontSize:16,fontWeight: "bold",fontFamily: "Microsoft JhengHei",
            letterSpacing:4,color:'#6C6C6C'}}>成績查詢</a></ListItemText>
        </ListItem>
        </NavLink>

        <NavLink activeClassName='active' to='/bar/attend' style={{textDecoration:'none',color:'#818181'}}>
        <ListItem button>
          <ListItemIcon>
            <AssignIcon />
          </ListItemIcon>
          <ListItemText><a style={{fontSize:16,fontWeight: "bold",fontFamily: "Microsoft JhengHei",
            letterSpacing:4,color:'#6C6C6C'}}>出勤查詢</a></ListItemText>
        </ListItem>
        </NavLink>

        <NavLink activeClassName="active" to="/bar/reserve" style={{textDecoration:'none',color:'#818181'}}>
        <ListItem button>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText><a style={{fontSize:16,fontWeight: "bold",fontFamily: "Microsoft JhengHei",
            letterSpacing:4,color:'#6C6C6C'}}>補課申請</a></ListItemText>
        </ListItem>
        </NavLink>
        
        <NavLink activeClassName="active" to="/bar/mypage" style={{textDecoration:'none',color:'#818181'}}>
        <ListItem button>
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <ListItemText><a style={{fontSize:16,fontWeight: "bold",fontFamily: "Microsoft JhengHei",
            letterSpacing:4,color:'#6C6C6C'}}>我的頁面</a></ListItemText>
        </ListItem>
        </NavLink>

        <br></br>

          <Divider />
          {/* <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}

        <br></br>
        <NavLink activeClassName="active" to="/" style={{textDecoration:'none',color:'#818181'}}>
          <ListItem button>
          <ListItemIcon>
            <ExitIcon />
          </ListItemIcon>
          <ListItemText><a style={{fontSize:16,fontWeight: "bold",fontFamily: "Microsoft JhengHei",
            letterSpacing:4,color:'#6C6C6C'}}>登出</a></ListItemText>
        </ListItem>
        </NavLink>
        </Drawer>

        {/* 插入components */}
        <div>

          {/* <Route exact path="/bar" component={IndexComponent}/> */}
          <Route exact path="/bar" render={(props) => <IndexComponent {...props} UserId={this.state.studentID} />}/>
          {/* <Route path="/bar/attend" component={AttendComponent} /> */}
          <Route path="/bar/attend" render={(props) => <AttendComponent {...props} UserId={this.state.studentID} />} />
          {/* <Route path="/bar/score" component={ScoreComponent} /> */}
          <Route path="/bar/score" render={(props) => <ScoreComponent {...props} UserId={this.state.studentID}/>}/>
          <Route path="/bar/reserve" component={ReserveComponent}/>
          {/* <Route path="/bar/reserve2" component={Reserve2All}/> */}
          <Route path="/bar/reserve2" render={(props) => <Reserve2All {...props} UserId={this.state.studentID}/>}/>
          {/* <Route path="/bar/reserve3" component={Reserve3}/> */}
          <Route path="/bar/reserve3" render={(props) => <Reserve3 {...props} UserId={this.state.studentID}/>}/>
          {/* <Route path="/bar/mypage" component={MyPage}/> */}
          <Route path="/bar/mypage" render={(props) => <MyPage {...props} UserId={this.state.studentID} />}/>
          <Route path="/bar/latestnews" component={LatestNews}/>

        </div>
        </MuiThemeProvider>
      </div>

        
      </Router>
    );
  }
}
MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);