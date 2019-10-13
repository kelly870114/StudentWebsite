import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
//import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
//import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Divider from '@material-ui/core/Divider';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ReactDOM from 'react-dom';
import Airtable from 'airtable';
import DatePicker from './DatePicker'
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

const TABLE_NAME = 'ReserveTime';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);


let  id = 0;
function createData(date, region, time,people,reserve) {
    id += 1;reserve= <NavLink style={{textDecoration:'none'}} activeClassName='active' 
    to={{pathname:'/bar/reserve2', reserveProps:{name : date,region,time}}}>
    <Button variant="contained" 
    style={{fontFamily: "Microsoft JhengHei",letterSpacing:4,fontSize:13,fontWeight: "bold",height:30,
    backgroundColor:'#FFBF5F',color:'white'}}>
    預約</Button>
    </NavLink>
    return {id, date, region, time,people,reserve};
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rowshead = [
    { id: 'date', numeric: false, disablePadding: true, label:'日期' },
    { id: 'region', numeric: true, disablePadding: false, label: '校區' },
    { id: 'time', numeric: true, disablePadding: false, label: '補課時間' },
    { id: 'people', numeric: true, disablePadding: false, label: '剩餘人數' },
    { id: 'reserve', numeric: true, disablePadding: false, label: '預約' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy} = this.props;
    

    return (
      <TableHead>
        <TableRow>
          {rowshead.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'center' : 'center'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
                style={{fontWeight: "bold",color:'#969696',fontFamily: "Microsoft JhengHei",
                letterSpacing:4,fontSize:15}}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

// const toolbarStyles = theme => ({
//   root: {
//     paddingRight: theme.spacing.unit,
//   },
//   highlight:
//     theme.palette.type === 'light'
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   spacer: {
//     flex: '1 1 100%',
//   },
//   actions: {
//     color: theme.palette.text.secondary,
//   },
//   title: {
//     flex: '0 0 auto',
//   },
// });

const styles = theme => ({
  root: {
    width:'80vw',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginLeft:'5vw',
    marginRight:'5vw',
    marginBottom:20,
  },
  table: {
    //width: 1020,
    minWidth:400,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  //以下都是Select的
  SelectRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    //marginLeft:'42px',
    //marginTop:20,
    //height:'50px',
    width:'92vw'
  },
  SelectTable:{
    //marginTop:'3vh',
    align:'center',
    width:'100%',
  },
  formControl: {
    margin: 5,
    minWidth: 200,
    maxHeight:50,
    marginTop:20,
    marginLeft:60,
  },
  selectEmpty: {
   // marginTop: theme.spacing.unit * 2,
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
    paddingLeft:'75%',
    color:'#FFBF5F',
  },
  //DatePicker CSS
  date:{
    marginLeft:65,
    marginTop:20,
    display:'flex'
  }
});

//const { classes } = this.props; //這是setlect的
class EnhancedTable extends React.Component {
    state = {
      //table的 
      order: 'asc',
      orderBy: 'score',
      //selected: [],
      data: [],
      dataInit:[],
      //下面是select跟title的
      // age: '',
      // name: '王映心',
      // labelWidth: 0,
      age: '',
      name: '',
      labelWidth: 0,
      //doris
      testReserve: [],
      rows:[],
      reserveData:[],
    };
  
    handleRequestSort = (event, property) => {
      const orderBy = property;
      let order = 'asc';
  
      if (this.state.orderBy === property && this.state.order === 'asc') {
        order = 'dsc';
      }
  
      this.setState({ order, orderBy });
    };
  
    //select start
    componentDidMount() {
      this.setState({
        labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      });
  
      //for select
      table.select({
          //filterByFormula: 'AND(student_id = 405401369)',
          view: "Grid view"
          }).eachPage((records, fetchNextPage) => {
            this.setState({records});
            console.log(records);
            const reserve_address = this.state.records.map((record, index) => record.fields['reserve_address']);
            // This function (`page`) will get called for each page of records.
            var count = reserve_address.length;
            var temp=[];
            var temp2=[];
            for(var index = 0; index < count; index++) {
              temp.push(reserve_address[index]);
            }

            var classResult = temp.filter(function(element, index, arr){
              return arr.indexOf(element) === index;
            });
            console.log(classResult);
            for(var index = 0; index < classResult.length; index++){
              temp2.push(classResult[index]);
            }

            this.setState({ reserveData : temp2 });
            fetchNextPage(); 
          }
          );
      //for studnet name
    //   fetch('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Student?api_key=keyA7EKdngjou4Dgy')
    //   .then((resp) => resp.json())
    //   .then(data => {
    //      this.setState({ studentData: data.records });
  
    //      const student_name = this.state.studentData.map(item => Object.values(item)[1].student_name);
    //      var temp = student_name[1];
    //      console.log("SelectClass Hello");
    //      console.log(student_name);
        
    //      this.setState({ name : temp });
    //   }).catch(err => {
    //     // Error 🙁
    //   });
  
      //for table
      fetch('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/ReserveTime?api_key=keyA7EKdngjou4Dgy')
      .then((resp) => resp.json())
      .then(data => {
        this.setState({ testReserve: data.records });
   
     const reserve_date = this.state.testReserve.map(item => Object.values(item)[1].reserve_date);
     const reserve_address = this.state.testReserve.map(item => Object.values(item)[1].reserve_address);
     const reserve_time = this.state.testReserve.map(item => Object.values(item)[1].reserve_time);
     const reserve_people = this.state.testReserve.map(item => Object.values(item)[1].reserve_people);
     var count = reserve_date.length;
     var temp=[];
   
     for(var index = 0; index < count; index++) {
       if(reserve_people[index] != 0){
        temp.push(createData(reserve_date[index],reserve_address[index],reserve_time[index],reserve_people[index]));
       }   
     }
     this.setState({ rows : temp });
     this.setState({dataInit : temp});
     }).catch(err => {
       // Error 🙁
     });
    }
  
    handleChange = name => event => {
      this.setState({ [name]: event.target.value });
      //for select
      console.log("In handleChange");
  
      let temp = [];
      var count = this.state.dataInit.length;
      console.log(event.target.value);
  
      for(var index = 0; index < count; index++) {
        if(this.state.dataInit[index].region == event.target.value){
          temp.push(this.state.dataInit[index]);
          //console.log(temp);
        }
      } 
      this.setState({ rows : temp });
      if(event.target.value == "1"){
        this.setState({ rows : this.state.dataInit });
      }
      
  
    };
    //select end
  
    render() {
      const { classes } = this.props;
      //const { data, order, orderBy } = this.state;
      const { rows, order, orderBy } = this.state;
  
      return (
      <div style={{marginTop:100}}>
  
      {/* 下面是select跟title */}
      <div className={classes.SelectRoot}>
        
        <div className={classes.SelectTable}>
            <Typography class={classes.text} nowrap={true}>
              <a style={{marginLeft:35}}>預約補課</a>
              <a class={classes.textRight}>107學年</a>
            </Typography>
       
        
        <Divider variant="middle"/>
        <div>
        <FormControl variant="outlined" className={classes.formControl}>
        
          <InputLabel  ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-native-simple"
            style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>
            選擇地區
          </InputLabel>
          <Select native value={this.state.age} onChange={this.handleChange('age')}
            input={ <OutlinedInput name="Age" labelWidth={this.state.labelWidth} 
            id="outlined-age-native-simple"/>}>
            <option value="" />
            <option value="1" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>所有校區</option>
            {/* <option value="" /> */}
            {/* <option value="" /> */}
              {(this.state.reserveData)
                  .map((n,index) => {
                    return (
                      <option value={n} style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>{n}</option>
                    );
                  })}
            {/* <option value="1" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>國文A班</option>
            <option value="2" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>數學B班</option>
            <option value="3" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>理化A班</option> */}
          </Select>
        </FormControl>
        </div>
        <div className={classes.date}>
        {/* <MultipleDatePicker onSubmit={dates => console.log('selected date', dates)} className={classes.datepicker}>
        </MultipleDatePicker> */}
        <Typography style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",fontSize:16}}>
            選擇時間</Typography>
        <DatePicker/>
        </div>
        </div>
      </div>
      {/* select跟title結束 */}
  
      {/* 下面是table */}
        <Paper className={classes.root}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                // numSelected={selected.length}
                order={order} order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                //rowCount={data.length}
              />
              <TableBody>
                {stableSort(rows, getSorting(order, orderBy))
                  
                  .map(row => {
                    return (
                        <TableRow key={row.id}>
                        <TableCell align="center" style={{color:'#969696',fontFamily: "Microsoft JhengHei",
                                letterSpacing:4,fontSize:15}}>{row.date}</TableCell>
                        <TableCell align="center" style={{color:'#969696',fontFamily: "Microsoft JhengHei",
                                letterSpacing:4,fontSize:15}}>{row.region}</TableCell>
                        <TableCell align="center" style={{color:'#969696',fontFamily: "Microsoft JhengHei",
                                letterSpacing:4,fontSize:15}}>{row.time}</TableCell>
                        <TableCell align="center" style={{color:'#969696',fontFamily: "Microsoft JhengHei",
                                letterSpacing:4,fontSize:15}}>{row.people}</TableCell>
                        <TableCell align="center" style={{color:'#969696',fontFamily: "Microsoft JhengHei",
                                letterSpacing:4,fontSize:15}}>{row.reserve}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </Paper>
        {/* table結束 */}
      </div>
      );
    }
  }
  
  EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(EnhancedTable);