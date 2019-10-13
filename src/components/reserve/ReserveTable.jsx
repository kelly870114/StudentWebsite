// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';

// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Tooltip from '@material-ui/core/Tooltip';
// import { lighten } from '@material-ui/core/styles/colorManipulator';

// import AttendComponent from '../attend/attendComponent';
// import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";


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
//     minWidth:400,
//   },
//   button:{
//     textDecoration:'none',
//     // boxShadow:'none',
//     // textShadow:'none',
//     // border:'none',
//     // outline:'none',

//   }
// });

// let id = 0;
// function createData(date, region, time,people,reserve) {
//   id += 1;reserve= <NavLink style={{textDecoration:'none'}} activeClassName='active' to='/bar/reserve/reserve2'>
//   <Button variant="contained" 
//   style={{fontFamily: "Microsoft JhengHei",etterSpacing:4,fontSize:13,fontWeight: "bold",height:30,
//   backgroundColor:'#FFBF5F',color:'white'}}>
//   預約</Button>
//   </NavLink>
//   return {id, date, region, time,people,reserve};
// }


// /******/
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
// const rowshead = [
//   { id: 'date', numeric: false, disablePadding: true, label:'日期' },
//   { id: 'region', numeric: true, disablePadding: false, label: '校區' },
//   { id: 'time', numeric: true, disablePadding: false, label: '補課時間' },
//   { id: 'people', numeric: true, disablePadding: false, label: '人數' },
//   { id: 'reserve', numeric: true, disablePadding: false, label: '預約' },
// ];

// class SimpleTableHead extends React.Component{
//   createSortHandler = property => event => {
//     this.props.onRequestSort(event, property);
//   };

 
//   render() {
//     const { order, orderBy} = this.props;

//     return (
//       <TableHead>
//         <TableRow>
//           {rowshead.map(
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


// /******/



// class SimpleTable extends React.Component{
//   state = {
//     testReserve: [],
//     rows:[],
//     order: 'asc',
//     orderBy: 'date',
//   };
//   componentDidMount() {
//     fetch('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/ReserveTime?api_key=keyA7EKdngjou4Dgy')
//     .then((resp) => resp.json())
//     .then(data => {
//        this.setState({ testReserve: data.records });
  
//     const reserve_date = this.state.testReserve.map(item => Object.values(item)[1].reserve_date);
//     const reserve_address = this.state.testReserve.map(item => Object.values(item)[1].reserve_address);
//     const reserve_time = this.state.testReserve.map(item => Object.values(item)[1].reserve_time);
//     const reserve_people = this.state.testReserve.map(item => Object.values(item)[1].reserve_people);
//     var count = reserve_date.length;
//     var temp=[];
  
//     for(var index = 0; index < count; index++) {
//       temp.push(createData(reserve_date[index],reserve_address[index],reserve_time[index],reserve_people[index]));
//     }
//     this.setState({ rows : temp });
//     }).catch(err => {
//       // Error 🙁
//     });
  
  
//   }

//   /******/
//   handleRequestSort = (event, property) => {
//     const orderBy = property;
//     let order = 'desc';

//     if (this.state.orderBy === property && this.state.order === 'desc') {
//       order = 'asc';
//     }

//     this.setState({ order, orderBy });
//   };
//   render(props){
//     const { classes } = this.props;
//     const { rows, order, orderBy } = this.state;

//     return (
//       <Paper className={classes.root}>
//         <Table className={classes.table}>
//         <SimpleTableHead
//               order={order}
//               orderBy={orderBy}
//               onRequestSort={this.handleRequestSort}
//             />

//           <TableBody>
//             {stableSort(rows, getSorting(order, orderBy))
//             .map(row => (
//               <TableRow key={row.id}>
//                 <TableCell align="center" style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                         letterSpacing:4,fontSize:15}}>{row.date}</TableCell>
//                 <TableCell align="center" style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                         letterSpacing:4,fontSize:15}}>{row.region}</TableCell>
//                 <TableCell align="center" style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                         letterSpacing:4,fontSize:15}}>{row.time}</TableCell>
//                 <TableCell align="center" style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                         letterSpacing:4,fontSize:15}}>{row.people}</TableCell>
//                 <TableCell align="center" style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                         letterSpacing:4,fontSize:15}}>{row.reserve}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     );
//   }
// }


// SimpleTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SimpleTable);