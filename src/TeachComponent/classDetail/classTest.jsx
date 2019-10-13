// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/icons/TrendingFlatRounded'

// //import AttendComponent from '../attend/attendComponent';
// import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
// import { Typography } from 'antd';
// import IconButton from '@material-ui/core/IconButton';
// import Airtable from 'airtable';

// const TABLE_NAME = 'TestScore';
// const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
// const table = base(TABLE_NAME);


// const styles = theme => ({
//   score_paper: {
//     width:570,
//     marginTop:40,
//     overflowX: 'auto',
//     //marginLeft:100,
//     //marginRight:'5vw',
//     marginBottom:20,
//   },
//   score_root: {
//     width:500,
//     marginTop:15,
//     overflowX: 'auto',
//     marginLeft:36,
//     //marginRight:'5vw',
//     marginBottom:30,
//   },
//   score_table: {
//     minWidth:300,
//   },
//   score_button:{
//     textDecoration:'none',
//     // boxShadow:'none',
//     // textShadow:'none',
//     // border:'none',
//     // outline:'none',

//   }, 
//   score_title:{
//     display:'flex'
//   }
// });

// let id = 0;
// function createData(date,range, averagescore) {
//   id += 1;
//   return { id, date, range, averagescore};
// }



// const rows = [
//   // createData('10月7日', 'CH1~CH2', '80'),
//   // createData('10月7日', 'CH1~CH2', '80'),
//   // createData('10月7日', 'CH1~CH2', '80'),
//   // createData('10月7日', 'CH1~CH2', '80'),
// ];

// class SimpleTable extends React.Component {

//   state = {
//     classData: [],
//     dataInit: [],
//     rows: [],
//   };

//   componentDidMount() {

//     table.select({
//       filterByFormula: 'AND(class_id = "國文C班")',
//       view: "Grid view"
//     }).eachPage((records, fetchNextPage) => {
//       this.setState({ records });
//       console.log(records);
//       const class_id = this.state.records.map((record, index) => record.fields['class_id']);
//       const test_date = this.state.records.map((record, index) => record.fields['test_date']);
//       const test_name = this.state.records.map((record, index) => record.fields['test_name']);
//       const test_score = this.state.records.map((record, index) => record.fields['test_score'])
//       var count = class_id.length;
//       var temp = [];
//       var temp2 = [];
//       var temp3 = [];
//       // for (var index = 0; index < count; index++) {
//       //   temp.push(test_date[index].split("-")[1]);
//       // }

//       var classResult = temp.filter(function (element, index, arr) {
//         return arr.indexOf(element) === index;
//       });
//       console.log(classResult);
//       for (var index = 0; index < classResult.length; index++) {
//         temp2.push(classResult[index]);
//       }

//       //table
//       for (var index = 0; index < 4; index++) {
//         temp3.push(createData(test_date[index], test_name[index], test_score[index]));
//       }
//       this.setState({ rows: temp3 });
//       this.setState({ dataInit: temp3 })

//       this.setState({ classData: temp2 });
//       fetchNextPage();
//     }
//     );

//   }


//   render(){
//   const { classes } = this.props;


//   return (
//     <Paper className={classes.score_paper}>
//     <div className={classes.score_title}>
//     <Typography style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontSize:18,
//     fontWeight:'bold',marginLeft:32,marginTop:15}}>考試平均</Typography>
//     <NavLink style={{textDecoration:'none',color:'#818181'}} activeClassName='active' to='/teach/classScore'>
//       <IconButton style={{marginLeft:400}}><Button/></IconButton></NavLink>
//       </div>
//     <Paper className={classes.score_root}>
    
//       <Table className={classes.score_table}>
//         <TableHead>
//           <TableRow>
//             <TableCell align="center" style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                       letterSpacing:4,fontSize:15,fontWeight: "bold"}}>日期</TableCell>
//             <TableCell align="center" style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                       letterSpacing:4,fontSize:15,fontWeight: "bold"}}>考試範圍</TableCell>
//             <TableCell align="center" style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                       letterSpacing:4,fontSize:15,fontWeight: "bold"}}>考試平均</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {this.state.rows.map(row => (
//             <TableRow key={row.id}>
//               <TableCell align="center" style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                       fontSize:15}}>{row.date}</TableCell>
//               <TableCell align="center" style={{color:'#969696',fontFamily: "Microsoft JhengHei",
//                       fontSize:15}}>{row.range}</TableCell>
//               <TableCell align="center" style={{color:'#5A3DAA',fontFamily: "Microsoft JhengHei",
//                       fontSize:15,fontWeight: "bold"}}>{row.averagescore}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//     </Paper>
//   );
//           }
// }

// SimpleTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SimpleTable);
