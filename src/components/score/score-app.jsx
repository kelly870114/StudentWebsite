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
import Button from '@material-ui/core/Button';

const TABLE_NAME = 'TestScore';
const STU_TABLE_NAME = 'Student';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);
const studentTable = base(STU_TABLE_NAME);


let counter = 0;
function createData(classclass, date, testname,score, rank) {
  counter += 1;
  return { id: counter, classclass, testname,date, score, rank};
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

const rows = [
  { id: 'classclass', numeric: false, disablePadding: true, label:'班級'},
  { id: 'date', numeric: true, disablePadding: false, label: '日期' },
  { id: 'testname' , numeric: false, disablePadding: true, label:'考試範圍'},
  { id: 'score', numeric: true, disablePadding: false, label: '分數' },
  { id: 'rank', numeric: true, disablePadding: false, label: '排名' },
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
          {rows.map(
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
    marginLeft:65,
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
    letterSpacing:3,
  },
  textRight:{
    fontSize:13,
    paddingLeft:'75%',
    color:'#FFBF5F',
  }
});




//const { classes } = this.props; //這是setlect的
class EnhancedTable extends React.Component {
    state = {
      //table的 
      order: 'asc',
      orderBy: 'score',
      selected: [],
      data: [
      //   createData('數學B班', 305, 3.7, 67),
      //   createData('數學A班', 452, 25.0, 51),
      //   createData('理化A班', 262, 16.0, 24),
      //   createData('國文A班', 159, 6.0, 24),
      //   createData('數學A班', 356, 16.0, 49),
      //   createData('數學B班', 408, 3.2, 87),
        
      ],
      dataInit:[],
      //下面是select跟title的
      // age: '',
      // name: '王映心',
      // labelWidth: 0,
      age: '',
      name: '',
      labelWidth: 0,
      studentData: [],
      classData: [],
      classId:'',
    };
  
    handleRequestSort = (event, property) => {
      const orderBy = property;
      let order = 'desc';
  
      if (this.state.orderBy === property && this.state.order === 'desc') {
        order = 'asc';
      }
  
      this.setState({ order, orderBy });
    };
  
    //select start
    componentDidMount() {
      this.setState({
        labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      });

      const filterSentence = 'AND(student_id =' + this.props.UserId + ')';
      //for select
      table.select({
          filterByFormula: filterSentence,
          view: "Grid view"
          }).eachPage((records, fetchNextPage) => {
            this.setState({records});
            console.log(records);
            const class_id = this.state.records.map((record, index) => record.fields['class_id']);
            const test_name = this.state.records.map((record, index) => record.fields['test_name']);
            const test_date = this.state.records.map((record, index) => record.fields['test_date']);
            const test_score = this.state.records.map((record, index) => record.fields['test_score']);
            const test_rank = this.state.records.map((record, index) => record.fields['test_rank']);

            //for select
            var count = class_id.length;
            var temp=[];
            var temp2=[];
            for(var index = 0; index < count; index++) {
              temp.push(class_id[index]);
            }
            var classResult = temp.filter(function(element, index, arr){
              return arr.indexOf(element) === index;
            });
            for(var index = 0; index < classResult.length; index++){
              temp2.push(classResult[index]);
            }
            this.setState({ classData : temp2 });

            //for table
            var tempT=[];
            for(var index = 0; index < class_id.length; index++) {
              tempT.push(createData(class_id[index],test_name[index],test_date[index],test_score[index],test_rank[index]));
            }
            this.setState({ data : tempT });
            this.setState({ dataInit : tempT })
            fetchNextPage(); 
          }
          );
      //for studnet name
      studentTable.select({
        filterByFormula: filterSentence,
        view: "Grid view"
        }).eachPage((records, fetchNextPage) => {
          this.setState({records});
          const student_name = this.state.records.map((record, index) => record.fields['student_name']);
          this.setState({ name : student_name[0] });
          fetchNextPage(); 
        }
        );
    }
  
    handleChange = name => event => {
      this.setState({ [name]: event.target.value });
      //for select
      console.log("In handleChange");
  
      let temp = [];
      var count = this.state.dataInit.length;
      console.log(event.target.value);
  
      for(var index = 0; index < count; index++) {
        if(this.state.dataInit[index].classclass == event.target.value){
          temp.push(this.state.dataInit[index]);
          //console.log(temp);
        }
      } 
      this.setState({ data : temp });
      if(event.target.value == "1"){
        this.setState({ data : this.state.dataInit });
      }
      
  
    };
    //select end
  
    render() {
      const { classes } = this.props;
      const { data, order, orderBy } = this.state;
  
      return (
      <div style={{ marginTop:100 }}>
  
      {/* 下面是select跟title */}
      <div className={classes.SelectRoot}>
        
        <div className={classes.SelectTable}>
            <Typography class={classes.text} nowrap={true}>
              <a style={{color:'#FFBF5F',marginLeft:35}}>{this.state.name}</a><a>的成績</a>
              <a class={classes.textRight}>107學年</a>
            </Typography>

            
        
        <Divider variant="middle"/>
        <FormControl variant="outlined" className={classes.formControl}>
        
          <InputLabel 
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-native-simple"
            
          >
            選擇班級/科目
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
                style={{borderColor: 'white'}}
              />
            }
          >
            <option value="" />
            <option value="1" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>全部科目</option>
            {/* <option value="" /> */}
            {/* <option value="" /> */}
              {(this.state.classData)
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
      </div>
      {/* select跟title結束 */}
  
      {/* 下面是table */}
        <Paper className={classes.root}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                // numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                //rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                  
                  .map(n => {
                    return (
                      <TableRow>
  
                        <TableCell component="th" scope="row" padding="none" align="center"
                        style={{color:'#969696',fontFamily: "Microsoft JhengHei",
                        letterSpacing:4,fontSize:15 , width:"18%"}}>
                          {n.classclass}
                        </TableCell>
  
                        <TableCell align="center"
                        style={{color:'#969696',fontFamily: "Microsoft JhengHei",
                        letterSpacing:4,fontSize:15}}>{n.testname}</TableCell>
                      
                        <TableCell align="center"
                        style={{color:'#969696',fontFamily: "Microsoft JhengHei",
                        letterSpacing:2,fontSize:15}}>{n.date}</TableCell>
  
                        <TableCell align="center"
                        style={{color:'#969696',fontFamily: "Microsoft JhengHei",
                        letterSpacing:4,fontSize:15}}>{n.score}</TableCell>
  
                        <TableCell align="center"
                        style={{color:'#969696',fontFamily: "Microsoft JhengHei",
                        letterSpacing:4,fontSize:15}}>{n.rank}</TableCell>
  
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