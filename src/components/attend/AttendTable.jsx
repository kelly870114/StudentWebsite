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
// import RightIcon from '@material-ui/icons/DoneRounded';
// import FailIcon from '@material-ui/icons/CloseRounded';
// import Airtable from 'airtable';

// //import { fetchGetCharacterList } from '../../api';

// const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');

// let counter = 0;
// function createData(date, classclass, attend, homework) {
//   counter += 1;
//   if (homework == true){
//     homework = <RightIcon style={{color:'#00a600'}}/>
//   }else{
//     homework = <FailIcon color="error"/>
//   }
//   return { id: counter, date, classclass, attend, homework};
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
//   { id: 'date', numeric: false, disablePadding: true, label:'日期' },
//   { id: 'classclass', numeric: true, disablePadding: false, label: '班級' },
//   { id: 'attend', numeric: true, disablePadding: false, label: '出勤紀錄' },
//   { id: 'homework', numeric: true, disablePadding: false, label: '作業紀錄' },
// ];

// class EnhancedTableHead extends React.Component {
//   createSortHandler = property => event => {
//     this.props.onRequestSort(event, property);
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
//     orderBy: 'date',
//     selected: [],
//     data: [
//       // createData('10月7日','數學B班', 3.7,<FailIcon style={{color:'red'}}/>),
//       // createData('10月7日', '數學B班',25.0,<RightIcon style={{color:'green'}}/>),
//       // createData( '10月7日','數學B班', 16.0, <FailIcon style={{color:'red'}}/>),
//       // createData('10月7日','數學B班', 6.0, <FailIcon style={{color:'red'}}/>),
//       // createData('10月7日','數學B班', 16.0, <RightIcon style={{color:'green'}}/>),
//       // createData('10月7日','數學B班',3.2, <RightIcon style={{color:'green'}}/>),
      
//     ],
//     // page: 0,
//     // rowsPerPage: 5,
//   };

//   componentDidMount() {
//     // let records = [];

//     // fetchGetCharacterList(records);
//     // //console.log((records.fields['attend_date']));
//     // console.log(records);
//     // console.log("it's attend")

//     base('Attend').select({view: 'Grid view'})
//     .eachPage(
//       (records, fetchNextPage) => {
//         this.setState({records});
//         console.log(records);
//         const attend_date = this.state.records.map((record, index) => record.fields['attend_date']);
//         const attend_time = this.state.records.map((record, index) => record.fields['attend_time']);
//         const attend_hw = this.state.records.map((record, index) => record.fields['attend_hw']);
//         const class_id = this.state.records.map((record, index) => record.fields['class_id']);
        
//         var count = class_id.length;
//         var temp=[];
//         for(var index = 0; index < count; index++) {
//           temp.push(createData(attend_date[index],class_id[index],attend_time[index],attend_hw[index]));
//         }
//         //createData(record.fields['attend_date'], record.fields['attend_time']),record.fields['attend_time'],record.fields['attend_time']);
//         console.log(attend_date);
//         console.log("attendTable Hello1");
//         console.log(temp);
//         this.setState({ data : temp });
//         fetchNextPage();
//       }
//     );
      
//   }

//   handleRequestSort = (event, property) => {
//     const orderBy = property;
//     let order = 'desc';

//     if (this.state.orderBy === property && this.state.order === 'desc') {
//       order = 'asc';
//     }

//     this.setState({ order, orderBy });
//   };

//   render() {
//     const { classes } = this.props;
//     const { data, order, orderBy } = this.state;

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
//             <TableBody>
//               {stableSort(data, getSorting(order, orderBy))
                
//                 .map(n => {
//                   return (
//                     <TableRow>

//                       <TableCell component="th" scope="row" padding="none" align="center"
//                       style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                       letterSpacing:4,fontSize:15}}>
//                         {n.date}
//                       </TableCell>

//                       <TableCell align="center"
//                       style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                       letterSpacing:4,fontSize:15}}>{n.classclass}</TableCell>

//                       <TableCell align="center"
//                       style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                       letterSpacing:4,fontSize:15}}>{n.attend}</TableCell>

//                       <TableCell align="center"
//                       style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                       letterSpacing:4,fontSize:15}}>{n.homework}</TableCell>

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
