import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import IndexComponent from '../index/appComponent.jsx';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

const styles = theme => ({
  buttonmargin: {
    margin: theme.spacing.unit,
    marginLeft: 60,
  },
  buttoncssRoot: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: orange[400],
    '&:hover': {
      backgroundColor: orange[400],
    },
    fontFamily:'Segoe UI',
    fontSize:12,
    width: 200,
    marginTop: 60,
  },
//   bootstrapRoot: {
//     boxShadow: 'none',
//     textTransform: 'none',
//     fontSize: 16,
//     padding: '6px 12px',
//     border: '1px solid',
//     lineHeight: 1.5,
//     backgroundColor: '#007bff',
//     borderColor: '#007bff',
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:hover': {
//       backgroundColor: '#0069d9',
//       borderColor: '#0062cc',
//     },
//     '&:active': {
//       boxShadow: 'none',
//       backgroundColor: '#0062cc',
//       borderColor: '#005cbf',
//     },
//     '&:focus': {
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
//     },
//   },
});

// const theme = createMuiTheme({
//   palette: {
//     primary: green,
//   },
//   typography: {
//     useNextVariants: true,
//   },
// });

function CustomizedButtons(props) {
  const { classes } = props;

  return (
    // <Router>
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classNames(classes.buttonmargin, classes.buttoncssRoot)}
      >
        L o g i n
      </Button>
      
    </div>
    // </Router>
  );
}

CustomizedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedButtons);