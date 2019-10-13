import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import orange from '@material-ui/core/colors/orange';
import purple from '@material-ui/core/colors/purple';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Loginbutton from './loginbutton.jsx';
import Typography from '@material-ui/core/Typography';
import Goodmorninglogo from './images/goodmorning.png';
import Ferris from './images/ferris.png';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Airtable from 'airtable';
import { FormGroup } from 'semantic-ui-react';

const TABLE_NAME = 'Account';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);

function createData(account_id, account_passwd, account_role){
    return {account_id, account_passwd, account_role};
}

const styles = theme => ({
  //input account css
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
  //input part css end
  
  //top and end image css
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
    marginTop: 76,
  },
  
  div1:{
    display: 'inline-block',
    margin: 'auto',
    //alignItem: 'center',
    //marginLeft: 200,
    //marginRight: 200,
  },
  //top and end image css end

  //login button css
  buttonmargin: {
    margin: theme.spacing.unit,
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
  //login button css end
});


class OutlinedTextFields extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            account:'',
            password:'',
            userData:[],
            error: false,
            errorMessage:'',
            enter: false,
            checkedA: false,
        };
    }
    
    componentDidMount(){
        table.select({
            view:'Grid view'
        }).eachPage((records, fetchNextPage) => {
            this.setState({ records });
            console.log(records);
            const account_id = this.state.records.map((record, index) => record.fields['account_id']);
            const account_passwd = this.state.records.map((record, index) => record.fields['account_passwd']);
            const account_role = this.state.records.map((record, index) => record.fields['account_role']);
            // This function (`page`) will get called for each page of records.
            var count = account_id.length;
            var temp = [];
            for (var index = 0; index < count; index++) {
                temp.push(createData(account_id[index], account_passwd[index], account_role[index]));

            }
            this.setState({ userData: temp });
            fetchNextPage();
        });
    }

    validateForm() {
        console.log("validateForm")
        return this.state.account.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    handleSubmit = event => {
        console.log("submit");
        event.preventDefault();
        console.log(this.state.account);
        console.log(this.state.userData);

        for (var index = 0; index < this.state.userData.length; index++) {
            if (this.state.account === this.state.userData[index].account_id &&
                this.state.password === this.state.userData[index].account_passwd) {
                    console.log("enter");
                    this.setState({enter: true});
                    if(this.state.userData[index].account_role == 'teacher'){
                        this.props.history.replace('/teach',this.state.account)

                    }
                    else{
                      this.props.history.replace('/bar',this.state.account)
                    }
                    
            } else {
                this.setState({
                    error: true,
                    errorMessage:'帳號或密碼錯誤'
                })
            }

        }
    }

    handleChangeChechbox = name => event => {
        console.log("checkbox");
            this.setState({
            [name]: event.target.value,
            [name]: event.target.checked,
        });
    };

  render() {
    const { classes } = this.props;
    const { error, errorMessage} = this.state

    return (
        <div className={classes.background}>
            <div className={classes.div1}>

                {/* top logo */}
                <div>
                    <Typography className={classes.logocss}>
                        <img src ={Goodmorninglogo} height ="101.25" width ="155.25"/>
                    </Typography>
                </div>

                {/* input account */}
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
                        id="account"
                        label="Email"
                        className={classes.textField}
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        value={this.state.account}
                        onChange={this.handleChange}/>
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
                        id="password"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        value={this.state.password}
                        onChange={this.handleChange}
                        helperText={errorMessage}
                        error={error}/>

                    <FormGroup row style={{marginLeft:172}}>
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={this.state.checkedA}
                                onChange={this.handleChangeChechbox('checkedA')}
                                value="checkedA"
                                classes={{
                                    root: classes.box,
                                    checked: classes.checked,
                                }}
                            />
                            }
                            label={<a style={{fontSize:14,fontFamily: "Microsoft JhengHei",
                            letterSpacing:2,color:'#969696'}}>記住密碼</a>}/>
                        
                        <FormControlLabel control={<Button>
                        <a style={{fontSize:14,fontFamily: "Microsoft JhengHei",
                        letterSpacing:2,color:'#969696'}}>忘記密碼</a></Button>} 
                        style={{marginLeft:75}}/>

                    </FormGroup>  


                    <Button variant="contained" 
                        className={classNames(classes.buttonmargin, classes.buttoncssRoot)}
                        onClick={this.handleSubmit}>
                        L o g i n
                    </Button>
                    </FormControl>
                </div>
                {/* input account end */}

                {/* bottom image */}
                <div>
                    <Typography className={classes.amusecss}>
                            <img src ={Ferris} height="103.5" width="317.4"/>
                    </Typography>
                </div>
            </div>
        </div>

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