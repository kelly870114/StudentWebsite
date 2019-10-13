// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// //import Button from '@material-ui/core/Button';
// import {Divider} from '@material-ui/core'
// //import AttendComponent from '../attend/attendComponent';
// import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
// import { Typography } from 'antd';
// import IconButton from '@material-ui/core/IconButton';
// import Button from '@material-ui/icons/TrendingFlatRounded'
// import Airtable from 'airtable';

// const TABLE_NAME = 'Schedule';
// const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
// const table = base(TABLE_NAME);

// function createData( schedule1, schedule2 ) {

//   return { schedule1, schedule2 };
// }

// const styles = theme => ({
//   record_paper: {
//     width:270,
//     height:343,
//     marginTop:40,
//     overflowX: 'auto',
//     //marginLeft:100,
//     //marginRight:'5vw',
//     marginBottom:20,
//   },
//   record_root: {
//     width:200,
//     marginTop:25,
//     height:230,
//     overflowX: 'auto',
//     marginLeft:35,
//     //marginRight:'5vw',
//     //marginBottom:30,
//   },
//   record_table: {
//     minWidth:300,
//   },
//   record_button:{
//     textDecoration:'none',
//     // boxShadow:'none',
//     // textShadow:'none',
//     // border:'none',
//     // outline:'none',

//   },
//   record_title:{
//     display:'flex'
//   },
//   recordText:{
//     color:'#5A3DAA',
//     fontFamily: "Microsoft JhengHei",
//     letterSpacing:2,
//     fontWeight:'bold',
//     textAlign:'center',
//   }
// });


// class SimpleTable extends React.Component{
//   state = {
//     record_ClassData: [],
//     record_dataInit: [],
//     schedule_real: [],
//     schedule1: [],
//   };

//   componentDidMount() {

//     table.select({
//       filterByFormula: 'AND(class_id = "國文C班")',
//       view: "Grid view",
//     }).eachPage((records, fetchNextPage) => {
//       this.setState({ records });
//       var temp = [];
//       console.log(records);
//       const class_id = this.state.records.map((record, index) => record.fields['class_id']);
//       const schedule_real = this.state.records.map((record, index) => record.fields['schedule_real']);

//       for (var index = 0; index < class_id.length; index++) {
//         //temp.push(createData(class_id[index], class_day[index], class_start_time[index], class_end_time[index]));
//         //temp.push(createData(schedule_real[index].split("=")[0]));
//       }
//       this.setState({ ClassData: temp });
//       this.setState({ dataInit: temp });
//       this.setState({ schedule1: schedule_real[0].split(" ")[0] });
//       this.setState({ schedule2: schedule_real[0].split(" ")[1]});
//       //this.setState({ class_time : temp2});
//       fetchNextPage();
//     }
//     );

//   }
// render(){
//   const { classes } = this.props;
//   return (
//     <Paper className={classes.paper}>
//     <div className={classes.title}>
//     <Typography style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontSize:18,
//     fontWeight:'bold',marginLeft:32,marginTop:15}}>上週教學進度</Typography>
//       <NavLink style={{textDecoration:'none',color:'#818181'}} activeClassName='active' to='/teach/teachrecord'>
//       <IconButton style={{marginLeft:55}}><Button/></IconButton>
//       </NavLink>
//     </div>
//     <Paper className={classes.root}>
//     <div>
//     <Typography className={classes.recordText} style={{fontSize:21,marginTop:15,marginTop:55,marginBottom:55}}>
//         {/* 數學講義(一) */}
//         {this.state.schedule1}</Typography>
//     </div>
//     <Divider variant="middle"/>
//     <Typography className={classes.recordText} style={{fontSize:18,marginTop:40,marginTop:25}}>
//         {/* p.50~80 */}
//         {this.state.schedule2}
//         </Typography>
//     </Paper>
//     </Paper>
//   );
// }
// }

// SimpleTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SimpleTable);
