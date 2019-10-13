import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Divider from '@material-ui/core/Divider';
//import Typography from '@material-ui/core/Typography';
//import Divider from '@material-ui/core/Divider';
import { Typography } from 'antd';
import Divider from '@material-ui/core/Divider';
import RangePicker from "react-range-picker"
//import DateRangePicker from 'react-daterange-picker';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    //marginLeft:'42px',
    //marginTop:20,
    //height:'50px',
    width:'94vw'
  },
  reservetitle:{
    //marginTop:'3vh',
    align:'center',
    width:'100%',
  },
  text:{
    //marginLeft:35,
    width:'100%',
    marginBottom:15,
    fontSize:20,
    fontWeight: "bold",
    color:'#969696',
    fontFamily: "Microsoft JhengHei",
    letterSpacing:4,
    
  },
  textRight:{
    fontSize:13,
    paddingLeft:'79%',
    color:'#FFBF5F',
  }
});

class NativeSelects extends React.Component {
  state = {
    age: '',
    //name: '王映心',
  };


  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  
  

  render() {
    const { classes } = this.props;

    return (
      
      <div className={classes.root}>
      
        <div className={classes.reservetitle}>
            <Typography class={classes.text} nowrap={true}>
              <a style={{marginLeft:35}}>補課紀錄</a>
              <a class={classes.textRight}>107學年</a>
            </Typography>
       
        
        <Divider variant="middle"/>
        </div>
      </div>
    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NativeSelects);
