// import React from 'react';
// import classNames from 'classnames';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// //import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// //import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import { lighten } from '@material-ui/core/styles/colorManipulator';
// import SelectClass from './SelectClass.jsx'
// let counter = 0;
// function createData(classclass, date, score, rank) {
//   counter += 1;
//   return { id: counter, classclass, date, score, rank};
// }

// function desc(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function stableSort(array, cmp) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = cmp(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map(el => el[0]);
// }

// function getSorting(order, orderBy) {
//   return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
// }


// const rows = [
//   { id: 'classclass', numeric: false, disablePadding: true, label:'班級' },
//   { id: 'date', numeric: true, disablePadding: false, label: '日期' },
//   { id: 'score', numeric: true, disablePadding: false, label: '分數' },
//   { id: 'rank', numeric: true, disablePadding: false, label: '排名' },
// ];

// class EnhancedTableHead extends React.Component {
//   createSortHandler = property => event => {
//     this.props.onRequestSort(event, property);
//   };
//   createSelectHandler = event => {
//     this.props.onRequestSelect(event);
//   };




//   render() {
//     const { order, orderBy} = this.props;

//     return (
//       <TableHead>
//         <TableRow>
//           {rows.map(
//             row => (
//               <TableCell
//                 key={row.id}
//                 align={row.numeric ? 'center' : 'center'}
//                 padding={row.disablePadding ? 'none' : 'default'}
//                 sortDirection={orderBy === row.id ? order : false}
//                 style={{fontWeight: "bold",color:'#969696',fontFamily: "Microsoft JhengHei",
//                 letterSpacing:4,fontSize:15}}
//               >
//                 <Tooltip
//                   title="Sort"
//                   placement={row.numeric ? 'bottom-end' : 'bottom-start'}
//                   enterDelay={300}
//                 >
//                   <TableSortLabel
//                     active={orderBy === row.id}
//                     direction={order}
//                     onClick={this.createSortHandler(row.id)}
//                   >
//                     {row.label}
//                   </TableSortLabel>
//                 </Tooltip>
//               </TableCell>
//             ),
//             this,
//           )}
//         </TableRow>
//       </TableHead>
//     );
//   }
// }

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

// const styles = theme => ({
//   root: {
//     width:'80vw',
//     marginTop: theme.spacing.unit * 3,
//     overflowX: 'auto',
//     marginLeft:'5vw',
//     marginRight:'5vw',
//     marginBottom:20,
//   },
//   table: {
//     //width: 1020,
//     minWidth:400,
//   },
//   tableWrapper: {
//     overflowX: 'auto',
//   },
// });

// class EnhancedTable extends React.Component {
//   state = {
//     order: 'asc',
//     orderBy: 'score',
//     selected: [],
//     data: [
//       // createData('數學B班', 305, 3.7, 67),
//       // createData('數學A班', 452, 25.0, 51),
//       // createData('理化A班', 262, 16.0, 24),
//       // createData('國文A班', 159, 6.0, 24),
//       // createData('數學A班', 356, 16.0, 49),
//       // createData('數學B班', 408, 3.2, 87),
      
//     ],
//     // page: 0,
//     // rowsPerPage: 5,
//   };

//   componentDidMount() {
//     fetch('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/TestScore?api_key=keyA7EKdngjou4Dgy')
//     .then((resp) => resp.json())
//     .then(data => {
//        this.setState({ testScore: data.records });

//     //https://cythilya.github.io/2018/06/17/array-and-object-handling/
//     const class_id = this.state.testScore.map(item => Object.values(item)[1].class_id);
//     const test_date = this.state.testScore.map(item => Object.values(item)[1].test_date);
//     const test_score = this.state.testScore.map(item => Object.values(item)[1].test_score);
//     const test_rank = this.state.testScore.map(item => Object.values(item)[1].test_rank);
//     console.log(class_id);
//     var count = class_id.length;
//     var temp=[];

//     for(var index = 0; index < count; index++) {
//       temp.push(createData(class_id[index],test_date[index],test_score[index],test_rank[index]));
//     }
//     this.setState({ data : temp });
//     }).catch(err => {
//       // Error 🙁
//     });

//   }

//   handleRequestSort = (event, property) => {
//     const orderBy = property;
//     let order = 'desc';

//     if (this.state.orderBy === property && this.state.order === 'desc') {
//       order = 'asc';
//     }

//     this.setState({ order, orderBy });
//   };

//   handleRequestSelect= (event) => {
//     console.log("in tableTry if for if loop");
//     let temp = [];
//     var count = this.state.data.length;
//     if(this.props.listNameFromParent != null){
//       for(var index = 0; index < count; index++) {
//         if(this.state.data[index].classclass == this.props.listNameFromParent){
//           temp.push(this.state.data[index]);
//           console.log(temp);
//         }
//       } 
//       this.setState({ data : temp });
//     }
//   };

  
//   render() {
//     const { classes } = this.props;
//     const { data, order, orderBy } = this.state;

//     console.log("get data from Parent");
//     console.log(this.props.listNameFromParent);
//     //data={this.handleRequestSelect}

//     return (
      
//       <Paper className={classes.root}>
//         {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
//         <div className={classes.tableWrapper}>
//           <Table className={classes.table} aria-labelledby="tableTitle">
//             <EnhancedTableHead
//               // numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onRequestSort={this.handleRequestSort}
//               //rowCount={data.length}
//             />
//             <TableBody >
//               {stableSort(data, getSorting(order, orderBy))
                
//                 .map(n => {
//                   return (
//                     <TableRow>

//                       <TableCell component="th" scope="row" padding="none" align="center"
//                       style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                       letterSpacing:4,fontSize:15}}>
//                         {n.classclass}
//                       </TableCell>

//                       <TableCell align="center"
//                       style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                       letterSpacing:4,fontSize:15}}>{n.date}</TableCell>

//                       <TableCell align="center"
//                       style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                       letterSpacing:4,fontSize:15}}>{n.score}</TableCell>

//                       <TableCell align="center"
//                       style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                       letterSpacing:4,fontSize:15}}>{n.rank}</TableCell>

//                     </TableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//         </div>
//       </Paper>
//     );
//   }
// }

// EnhancedTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(EnhancedTable);
