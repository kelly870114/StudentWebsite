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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Airtable from 'airtable';
import { fetchPostReserveStudent } from '../../api';

const TABLE_NAME = 'Student';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);
const attendTABLE_NAME = 'Attend';
const attendTable = base(attendTABLE_NAME);

let counter = 0;
function createData(class_id, attend_date) {
  counter += 1;
  var class_selection = class_id +" "+ attend_date;
  
  return {id:counter, class_selection};
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    //marginLeft:'42px',
    //marginTop:20,
    //height:'50px',
    width:'94vw',
    marginTop:120
  },
  card:{
      width:600,
      height:300,
      marginTop:30,
      marginLeft:290,
  },
  table:{
      border:1,
      borderColor:'red',
      BorderStyle:'solid',
      rules:'all',
      marginLeft:55,
      marginTop:35,
      width:490,
      height:230,
      backgroundColor:'#f0f0f0',
  },
  divider1:{
      marginTop:35,
      marginLeft:50,
      marginRight:50,
      height:1.5,
  },
  text1:{
      //marginLeft:150,
      marginTop:7,
      fontSize:18,
      fontWeight: "bold",
      color:'#66009D',
      fontFamily: "Microsoft JhengHei",
      letterSpacing:4,
  },
  divider2:{
      marginTop:7,
      marginLeft:50,
      marginRight:50,
      height:1.5,
  },
  name:{
      //marginTop:10,
  },
  texttitle:{
    fontSize:16,
    fontWeight: "bold",
    color:'#FFBF5F',
    fontFamily: "Microsoft JhengHei",
    letterSpacing:4,
    //marginLeft:10,
  },
  detail:{
    marginLeft:25,
    fontSize:16,
    fontWeight: "bold",
    color:'#969696',
    fontFamily: "Microsoft JhengHei",
    letterSpacing:4,
  },
  formControl:{
      width:250,
      height:28,
      marginLeft:10,
      marginTop:5
  },
  //title
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
    name: '',
    // region:'',
    // date:'',
    // time:'',
    labelWidth: 0,
    classData:[],
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClickOpen = () => {
    let data = { fields: { student_id:{}, reserve_date:{}, reserve_address:{}, reserve_time:{}, reserve_class:{}} };
    data.fields.student_id = this.props.UserId;
    data.fields.reserve_date = this.props.location.reserveProps.name;
    data.fields.reserve_address = this.props.location.reserveProps.region;
    data.fields.reserve_time = this.props.location.reserveProps.time;
    data.fields.reserve_class = this.state.age;
    fetchPostReserveStudent(data);

    this.setState({ open: true });
    
  };

  componentDidMount() {
    const filterSentence = 'AND(student_id =' + this.props.UserId + ')';
    
    //for studnet name
    table.select({
      filterByFormula: filterSentence,
      view: "Grid view"
      }).eachPage((records, fetchNextPage) => {
        this.setState({records});
        const student_name = this.state.records.map((record, index) => record.fields['student_name']);
        this.setState({ name : student_name[0] });
        fetchNextPage(); 
      }
      );

      //for select
    attendTable.select({
      filterByFormula: filterSentence,
      view: "Grid view"
      }).eachPage((records, fetchNextPage) => {
        this.setState({records});
        const class_id = this.state.records.map((record, index) => record.fields['class_id']);
        const attend_date = this.state.records.map((record, index) => record.fields['attend_date']);
        const attend_true = this.state.records.map((record, index) => record.fields['attend_true']);

        var count = class_id.length;
        var temp=[];
        var temp2=[];
        for(var index = 0; index < count; index++) {
          if(attend_true[index] != true){
            temp.push(createData(class_id[index] ,attend_date[index]));
          }
        }

        var classResult = temp.filter(function(element, index, arr){
          return arr.indexOf(element) === index;
        });
        for(var index = 0; index < classResult.length; index++){
          temp2.push(classResult[index]);
        }

        this.setState({ classData : temp2 });
        fetchNextPage(); 
      }
      );
        //select end
  }
 
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <div className={classes.reservetitle}>
            <Typography class={classes.text} nowrap={true}>
              <a style={{marginLeft:35}}>預約補課</a>
              <a class={classes.textRight}>107學年</a>
            </Typography>
       
        
        <Divider variant="middle"/>
        </div>
      <Card className={classes.card}>
      <table className={classes.table}>
          <tr align="center"><td colspan="2"><Typography class={classes.text1}>補課資料</Typography></td></tr>

          <tr><td align="left"><a className={classes.texttitle} style={{marginLeft:60}}>姓名</a>
          <a className={classes.detail}>{this.state.name}</a></td>

          <td align="left"><a className={classes.texttitle}>校區</a>
          <a className={classes.detail}>{this.props.location.reserveProps.region}</a></td></tr>

          <tr><td align="left"><a className={classes.texttitle} style={{marginLeft:60}}>日期</a>
          <a className={classes.detail}>{this.props.location.reserveProps.name}</a></td>

          <td align="left"><a className={classes.texttitle}>時間</a>
          <a className={classes.detail}>{this.props.location.reserveProps.time}</a></td></tr>

          <tr align=""><td colspan="2">
          <div style={{display:'flex'}}>
          <Typography class={classes.texttitle} style={{marginTop:20,marginLeft:60}}>選擇課程</Typography>
          {/* 下面的Typography對select的選項只有bold有用 */}
          <Typography style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>
          <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel 
            ref={ref => {
              this.InputLabelRef = ref
            }}
            htmlFor="outlined-age-native-simple">
          </InputLabel>
          <Select
            native
            value={this.state.age}
            onChange={this.handleChange('age')}
            input={
              <OutlinedInput
                name="Age"
                labelWidth={this.state.labelWidth}
                id="outlined-age-native-simple"
              />
            }
          >
            <option value="" />

            {(this.state.classData)
                  .map((n,index) => {
                    return (
                      <option key={n.id} value={n.class_selection} style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>{n.class_selection}</option>
                    );
                  })}
            {/* <option value="1" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>國文B班 10/30</option>
            <option value="2" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>數學A班 02/14</option>
            <option value="3" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>理化C班 03/03</option> */}
          </Select>
        </FormControl> </Typography></div>
          </td></tr>

          <tr align="center"><td colspan="2"> 
            <Button onClick={this.handleClickOpen}
            variant="contained"
            style={{fontFamily: "Microsoft JhengHei",letterSpacing:4,fontSize:13,fontWeight: "bold",height:30,
            backgroundColor:'#FFBF5F',color:'white',marginTop:25}}>
             預約</Button>
            </td></tr>
      </table>
      </Card>
      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <a style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",
              marginLeft:50,marginRight:50}}>預約成功</a>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={this.handleClose} color="primary" onClick={this.handleClose}>
            <a style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold"}}>取消</a>
            </Button> */}
            <NavLink style={{textDecoration:'none'}} activeClassName='active' 
            to='/bar/reserve3'>
            <Button onClick={this.handleClose} color="primary" autoFocus 
            style={{fontFamily: "Microsoft JhengHei",letterSpacing:4,fontSize:13,fontWeight:"bold",
            backgroundColor:'#FFBF5F',color:'white'}}>
              {/* <a style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold"}}>確定</a> */}
              確定
            </Button></NavLink>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NativeSelects);
