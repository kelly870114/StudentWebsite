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
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Reserve3 from '../reserveList/reserveListComponent'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    //marginLeft:'42px',
    //marginTop:20,
    //height:'50px',
    width:'94vw'
  },
  card:{
      width:550,
      height:270,
      marginTop:30,
      marginLeft:315,
      marginBottom:30,
  },
  table:{
      border:1,
      borderColor:'red',
      BorderStyle:'solid',
      rules:'all',
      marginLeft:50,
      marginTop:20,
      width:450,
      height:230,
      backgroundColor:'#f0f0f0',
  },
  text1:{
      //marginLeft:150,
      //marginTop:7,
      fontSize:18,
      fontWeight: "bold",
      color:'#66009D',
      fontFamily: "Microsoft JhengHei",
      letterSpacing:4,
  },
  texttitle:{
    fontSize:16,
    fontWeight: "bold",
    color:'#FFBF5F',
    fontFamily: "Microsoft JhengHei",
    letterSpacing:4,
    marginLeft:35,
  },
  detail:{
    marginLeft:22,
    fontSize:16,
    fontWeight: "bold",
    color:'#969696',
    fontFamily: "Microsoft JhengHei",
    letterSpacing:4,
  },
});

class NativeSelects extends React.Component {
  state = {
    age: '',
    name: '王映心',
    region:'古亭校區',
    date:'03/25',
    time:'12:00',
    class:'國文B班 02/14',
    labelWidth: 0,
  };



  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <Card className={classes.card}>
      <table className={classes.table}>
          <tr align="center"><td colspan="2"><Typography class={classes.text1}>補課資料</Typography></td></tr>

          <tr><td align="left"><a className={classes.texttitle}>姓名</a>
          <a className={classes.detail}>{this.state.name}</a></td>
          <td align="left"><a className={classes.texttitle}>校區</a>
          <a className={classes.detail}>{this.state.region}</a></td></tr>

          <tr><td align="left"><a className={classes.texttitle}>日期</a>
          <a className={classes.detail}>{this.state.date}</a></td>
          <td align="left"><a className={classes.texttitle}>時間</a>
          <a className={classes.detail}>{this.state.time}</a></td></tr>

          <tr align=""><td colspan="2"><a className={classes.texttitle}>預約課程</a>
          <a className={classes.detail}>{this.state.class}</a></td></tr>

      </table>
      </Card>

      <Card className={classes.card}>
      <table className={classes.table}>
          <tr align="center"><td colspan="2"><Typography class={classes.text1}>補課資料</Typography></td></tr>

          <tr><td align="left"><a className={classes.texttitle}>姓名</a>
          <a className={classes.detail}>{this.state.name}</a></td>
          <td align="left"><a className={classes.texttitle}>校區</a>
          <a className={classes.detail}>{this.state.region}</a></td></tr>

          <tr><td align="left"><a className={classes.texttitle}>日期</a>
          <a className={classes.detail}>{this.state.date}</a></td>
          <td align="left"><a className={classes.texttitle}>時間</a>
          <a className={classes.detail}>{this.state.time}</a></td></tr>

          <tr align=""><td colspan="2"><a className={classes.texttitle}>預約課程</a>
          <a className={classes.detail}>{this.state.class}</a></td></tr>

      </table>
      </Card>


      </div>
    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NativeSelects);
