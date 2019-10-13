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
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Airtable from 'airtable';

const TABLE_NAME = 'TestScore';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);

let id = 0;
function createData(date, range, averagescore, button) {
  id += 1;
  button=<NavLink style={{textDecoration:'none'}} activeClassName='active' to='/teach/analysis'>
  <Button variant="contained"
  style={{fontFamily: "Microsoft JhengHei",etterSpacing:4,fontSize:13,fontWeight: "bold",height:30,
  backgroundColor:'#FFBF5F',color:'white'}}>
  答題分析 ></Button>
  </NavLink>
  return { id, date, range, averagescore, button };
}

const rows = [
  // createData('10月7日', '英文講義CH1', 87, 
  // <NavLink style={{textDecoration:'none'}} activeClassName='active' to='/teach/analysis'>
  // <Button variant="contained"
  // style={{fontFamily: "Microsoft JhengHei",etterSpacing:4,fontSize:13,fontWeight: "bold",height:30,
  // backgroundColor:'#FFBF5F',color:'white'}}>
  // 答題分析 ></Button>
  // </NavLink>
  // ),
];

let temp = [];
function caculateMonth(rawDate) {
  var Date = rawDate + "月";

  return { rawDate, Date };
}

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;


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
                style={{
                  fontWeight: "bold", color: '#969696', fontFamily: "Microsoft JhengHei",
                  letterSpacing: 4, fontSize: 15
                }}
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


const styles = theme => ({
  root: {
    width: 820,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginLeft: 100,
    marginRight: 70,
    marginBottom: 20,
  },
  table: {
    //width: 1020,
    minWidth: 400,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  //以下都是Select的
  SelectRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    //marginLeft:34,
    //marginTop:20,
    //height:'50px',
    width: 1020
  },
  SelectTable: {
    //marginTop:'3vh',
    align: 'center',
    width: '100%',
  },
  formControl: {
    margin: 5,
    minWidth: 200,
    maxHeight: 50,
    marginTop: 20,
    marginLeft: 100,
  },
  selectEmpty: {
    // marginTop: theme.spacing.unit * 2,
  },
  text: {
    //marginLeft:35,
    width: '100%',
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: '#969696',
    fontFamily: "Microsoft JhengHei",
    letterSpacing: 4,
  },
  textRight: {
    fontSize: 13,
    paddingLeft: '71%',
    color: '#FFBF5F',
  }
});


//const { classes } = this.props; //這是setlect的
class EnhancedTable extends React.Component {
  state = {
    //table的 
    order: 'asc',
    orderBy: 'score',
    selected: [],
    //下面是select跟title的
    age: '',
    classname: '國文C班',
    classData: [],
    dataInit: [],
    rows: [],
  };

  //   handleRequestSort = (event, property) => {
  //     const orderBy = property;
  //     let order = 'desc';

  //     if (this.state.orderBy === property && this.state.order === 'desc') {
  //       order = 'asc';
  //     }

  //     this.setState({ order, orderBy });
  //   };

  //select start
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });

    table.select({
      filterByFormula: 'AND(class_id = "國文C班")',
      view: "Grid view"
    }).eachPage((records, fetchNextPage) => {
      this.setState({ records });
      console.log(records);
      const class_id = this.state.records.map((record, index) => record.fields['class_id']);
      const test_date = this.state.records.map((record, index) => record.fields['test_date']);
      const test_name = this.state.records.map((record, index) => record.fields['test_name']);
      const test_score = this.state.records.map((record, index) => record.fields['test_score'])
      var count = class_id.length;
      var temp = [];
      var temp2 = [];
      var temp3 = [];
      var temp4 = [];
      var total = [];
      for (var index = 0; index < count; index++) {
        temp.push(test_date[index].split("-")[1]);
      }

      var classResult = temp.filter(function (element, index, arr) {
        return arr.indexOf(element) === index;
      });
      console.log(classResult);
      for (var index = 0; index < classResult.length; index++) {
        temp2.push(classResult[index]);
      }

      //table
      for (var index = 0; index < test_date.length; index++) {
        temp3.push(createData(test_date[index], test_name[index], test_score[index]));
      }
      this.setState({ rows: temp3 });
      this.setState({ dataInit: temp3 })

      this.setState({ classData: temp2 });
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

    for (var index = 0; index < count; index++) {
      var month = this.state.dataInit[index].date.split("-")[1];
      if (month == event.target.value) {
        temp.push(this.state.dataInit[index]);
      }
    }
    this.setState({ rows: temp });
    if (event.target.value == "1") {
      this.setState({ rows: this.state.dataInit });
    }
  };
  //select end

  render() {
    const { classes } = this.props;
    const { data, order, orderBy } = this.state;

    return (
      <div style={{ marginTop: 100 }}>
        {/* 下面是select跟title */}
        <div className={classes.SelectRoot}>

          <div className={classes.SelectTable}>
            <Typography class={classes.text} nowrap={true}>
              <a style={{ color: '#FFBF5F', marginLeft: 35 }}>{this.state.classname}</a><a>的成績</a>
              <a class={classes.textRight}>107學年</a>
            </Typography>


            <Divider variant="middle" />
            <FormControl variant="outlined" className={classes.formControl}>

              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-native-simple"
                style={{ color: '#969696', fontFamily: "Microsoft JhengHei", letterSpacing: 4, fontWeight: "bold", }}
              >
                選擇月份
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
                <option value="1" style={{ color: '#969696', fontFamily: "Microsoft JhengHei", letterSpacing: 4, fontWeight: "bold", }}>所有月份</option>
                {(this.state.classData)
                  .map((row, index) => {
                    return (
                      <option value={row} style={{ color: '#969696', fontFamily: "Microsoft JhengHei", letterSpacing: 4, fontWeight: "bold", }}>{row}</option>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
        </div>
        {/* select跟title結束 */}

        {/* 下面是table */}
        <Paper className={classes.root}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{
                    color: '#969696', fontFamily: "Microsoft JhengHei",
                    letterSpacing: 4, fontSize: 15, fontWeight: "bold"
                  }}>日期</TableCell>
                  <TableCell align="center" style={{
                    color: '#969696', fontFamily: "Microsoft JhengHei",
                    letterSpacing: 4, fontSize: 15, fontWeight: "bold"
                  }}>考試範圍</TableCell>
                  <TableCell align="center" style={{
                    color: '#969696', fontFamily: "Microsoft JhengHei",
                    letterSpacing: 4, fontSize: 15, fontWeight: "bold"
                  }}>平均分數</TableCell>
                  <TableCell align="center" style={{
                    color: '#969696', fontFamily: "Microsoft JhengHei",
                    letterSpacing: 4, fontSize: 15, fontWeight: "bold"
                  }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell align="center" style={{
                      color: '#969696', fontFamily: "Microsoft JhengHei",
                      letterSpacing: 2, fontSize: 15
                    }}>{row.date}</TableCell>
                    <TableCell align="center" style={{
                      color: '#969696', fontFamily: "Microsoft JhengHei",
                      letterSpacing: 2, fontSize: 15
                    }}>{row.range}</TableCell>
                    <TableCell align="center" style={{
                      color: '#969696', fontFamily: "Microsoft JhengHei",
                      letterSpacing: 2, fontSize: 15
                    }}>{row.averagescore}</TableCell>
                    <TableCell align="center" style={{
                      color: '#969696', fontFamily: "Microsoft JhengHei",
                      letterSpacing: 2, fontSize: 15
                    }}>{row.button}</TableCell>
                  </TableRow>
                ))}
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