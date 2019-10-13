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
// import Divider from '@material-ui/core/Divider';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import ReactDOM from 'react-dom';
// import RightIcon from '@material-ui/icons/DoneRounded';
// import FailIcon from '@material-ui/icons/CloseRounded';


// let counter = 0;
// function createData(date, classclass, attend, homework) {
//   counter += 1;
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

// // const toolbarStyles = theme => ({
// //   root: {
// //     paddingRight: theme.spacing.unit,
// //   },
// //   highlight:
// //     theme.palette.type === 'light'
// //       ? {
// //           color: theme.palette.secondary.main,
// //           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
// //         }
// //       : {
// //           color: theme.palette.text.primary,
// //           backgroundColor: theme.palette.secondary.dark,
// //         },
// //   spacer: {
// //     flex: '1 1 100%',
// //   },
// //   actions: {
// //     color: theme.palette.text.secondary,
// //   },
// //   title: {
// //     flex: '0 0 auto',
// //   },
// // });

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
//   //以下都是Select的
//   SelectRoot: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     //marginLeft:'42px',
//     //marginTop:20,
//     //height:'50px',
//     width:'92vw'
//   },
//   SelectTable:{
//     //marginTop:'3vh',
//     align:'center',
//     width:'100%',
//   },
//   formControl: {
//     margin: 5,
//     minWidth: 200,
//     maxHeight:50,
//     marginTop:20,
//     marginLeft:35,
//   },
//   selectEmpty: {
//    // marginTop: theme.spacing.unit * 2,
//   },
//   text:{
//     //marginLeft:35,
//     width:'100%',
//     marginBottom:15,
//     fontSize:20,
//     fontWeight: "bold",
//     color:'#969696',
//     fontFamily: "Microsoft JhengHei",
//     letterSpacing:4,
//   },
//   textRight:{
//     fontSize:13,
//     paddingLeft:'71%',
//     color:'#FFBF5F',
//   }
// });


// //const { classes } = this.props; //這是setlect的
// class EnhancedTable extends React.Component {
//   state = {
//     //table的 
//     order: 'asc',
//     orderBy: 'score',
//     selected: [],
//     data: [
//         createData('10月7日','數學B班', 3.7,<FailIcon style={{color:'red'}}/>),
//         createData('10月7日', '數學B班',25.0,<RightIcon style={{color:'green'}}/>),
//         createData( '10月7日','數學B班', 16.0, <FailIcon style={{color:'red'}}/>),
//         createData('10月7日','數學B班', 6.0, <FailIcon style={{color:'red'}}/>),
//         createData('10月7日','數學B班', 16.0, <RightIcon style={{color:'green'}}/>),
//         createData('10月7日','數學B班',3.2, <RightIcon style={{color:'green'}}/>),
      
//     ],
//     //下面是select跟title的
//     age: '',
//     name: '王映心',
//     labelWidth: 0,
//   };

//   handleRequestSort = (event, property) => {
//     const orderBy = property;
//     let order = 'desc';

//     if (this.state.orderBy === property && this.state.order === 'desc') {
//       order = 'asc';
//     }

//     this.setState({ order, orderBy });
//   };

//   //select start
//   componentDidMount() {
//     this.setState({
//       labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
//     });
//   }

//   handleChange = name => event => {
//     this.setState({ [name]: event.target.value });
//   };
//   //select end

//   render() {
//     const { classes } = this.props;
//     const { data, order, orderBy } = this.state;

//     return (
//     <div style={{marginTop:100}}>

//     {/* 下面是select跟title */}
//     <div className={classes.SelectRoot}>
      
//       <div className={classes.SelectTable}>
//           <Typography class={classes.text} nowrap={true}>
//             <a style={{color:'#FFBF5F',marginLeft:35}}>{this.state.name}</a><a>的出勤紀錄</a>
//             <a class={classes.textRight}>107學年</a>
//           </Typography>
     
      
//       <Divider variant="middle"/>
//       <FormControl variant="outlined" className={classes.formControl}>
      
//         <InputLabel 
//           ref={ref => {
//             this.InputLabelRef = ref;
//           }}
//           htmlFor="outlined-age-native-simple"
//           style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}
//         >
//           選擇月份
//         </InputLabel>
//         <Select
//           native
//           value={this.state.age}
//           onChange={this.handleChange('age')}
//           input={
//             <OutlinedInput
//               name="Age"
//               labelWidth={this.state.labelWidth}
//               id="outlined-age-native-simple"
//             />
//           }
//         >
//           <option value="" />
//           <option value="1" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>一月</option>
//           <option value="2" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>二月</option>
//           <option value="3" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>三月</option>
//         </Select>
//       </FormControl>
//       </div>
//     </div>
//     {/* select跟title結束 */}

//     {/* 下面是table */}
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
//       {/* table結束 */}
//     </div>
//     );
//   }
// }

// EnhancedTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(EnhancedTable);