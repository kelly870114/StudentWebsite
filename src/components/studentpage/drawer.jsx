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
import StudentComponent from './studentcomponent.jsx';
import Head from'./head.jsx';
import Logowhite from './images/goodmorningwhite.png';


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


  
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };


  

  render() {
    const { classes, theme } = this.props;

    return (
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
          <Head/>
          
          <Typography variant="overline" gutterBottom>
            Doris Wang 
          </Typography>
        
          {/* <br></br>
          
          <Typography variant="overline" gutterBottom>
            #405401279    
          </Typography> */}
          
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
        <ListItem button>
            <ListItemIcon>
                <GlobeIcon />
            </ListItemIcon>
            <ListItemText primary="Index"/>
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <LatestnewsIcon />
          </ListItemIcon>
          {/* <Typography>
            最新消息
          </Typography> */}
          <ListItemText inset primary="Latest News" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <ScoreIcon />
          </ListItemIcon>
          <ListItemText inset primary="My Score" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <AssignIcon />
          </ListItemIcon>
          <ListItemText inset primary="My Attendance" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText inset primary="Make-up Class" />
        </ListItem>

        
        <ListItem button>
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <ListItemText inset primary="My Page" />
        </ListItem>

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
          <ListItem button>
          <ListItemIcon>
            <ExitIcon />
          </ListItemIcon>
          <ListItemText inset primary="Log Out" />
        </ListItem>
        </Drawer>
        <StudentComponent/>
          HOME
        </MuiThemeProvider>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);