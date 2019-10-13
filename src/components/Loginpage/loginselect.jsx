import React from 'react';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import orange from '@material-ui/core/colors/orange';
import purple from '@material-ui/core/colors/purple';
//import green from '@material-ui/core/colors/green';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Loginbutton from './loginbutton.jsx';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import IndexComponent from '../Bar.jsx';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    fontSize: 10,
    marginBottom: 15,
  },
  dense: {
    marginTop: 5,
  },
  margin: {
    margin: theme.spacing.unit,
    alignItems: 'center',
  },
  cssLabel: {
    '&$cssFocused': {
      color: orange[300],
    },
  },
  cssFocused: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: orange[300],
    },
  },
  notchedOutline: {},
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  box: {
      color: purple[800],
      '&$checked': {
          color: purple[800],
      },
      marginLeft: -148,
      fontSize: 10,
      //marginBottom: 20,
  },
  checked: {},

//   loginbuttoncss: {
//       marginTop: 50,
//   }

});


class OutlinedTextFields extends React.Component {
    state = {
        checkedA: false,
      };
    
    
    handleChange = name => event => {
        this.setState({
        [name]: event.target.value,
        [name]: event.target.checked,
    });
    };

  render() {
    const { classes } = this.props;

    return (
      <Router>
      <div className={classes.root}> 
          
        <FormControl className={classes.margin}>
        <TextField
            className={classes.margin}
            InputLabelProps={{
            classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
            },
            }}
            InputProps={{
            classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
            },
            }}
            id="outlined-email-input"
            label="Email"
            className={classes.textField}
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
        
      />
        <TextField
            className={classes.margin}
            InputLabelProps={{
            classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
            },
            }}
            InputProps={{
                classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                },
            }}
            id="outlined-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
        />

        <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedA}
                onChange={this.handleChange('checkedA')}
                value="checkedA"
                classes={{
                    root: classes.box,
                    checked: classes.checked,
                }}
              />
            }
            label="記住密碼"
          />  
          {/* <NavLink activeClassName="active" to="/index">
          <Loginbutton className={classes.loginbuttoncss}/>
          </NavLink> */}
        </FormControl>
{/* 
        <div>
        <Route path="/index" component={IndexComponent}/>
      </div> */}

        
        
        
    </div>
    </Router>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};


  
    
  
OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(OutlinedTextFields);