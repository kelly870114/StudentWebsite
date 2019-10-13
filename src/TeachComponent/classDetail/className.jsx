// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
// import TeachButton from '@material-ui/icons/SpellcheckOutlined'
// import HomeworkButton from '@material-ui/icons/EditOutlined'
// import Airtable from 'airtable';
// import IconButton from '@material-ui/core/IconButton';
// import { Icon } from 'antd';

// const TABLE_NAME = 'ClassDay';
// const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
// const table = base(TABLE_NAME);

// function createData(class_id, class_time) {

//   return { class_id, class_time };
// }

// const styles = {
//   card: {
//     //maxWidth: 345,
//     height: 85,
//     //width:'80%',
//     marginTop: 30,
//   },

//   //   card2: {
//   //     //maxWidth: 345,
//   //     height: 75,
//   //     marginTop: 30,
//   //   },
//   //   media: {
//   //     // ⚠️ object-fit is not supported by IE 11.
//   //     //objectFit: 'cover',
//   //   },
//   text: {
//     color: '#5A3DAA',
//     fontFamily: "Microsoft Jhenghei",
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginTop: 10,
//     letterSpacing: 6,
//     textAlign: 'left'
//   },
//   div1: {
//     //position:"absolute",
//     //display: "inline",
//     display: 'flex',
//     marginLeft: 50,
//   },
//   textdetail: {
//     color: "#818181",
//     fontFamily: "Microsoft Jhenghei",
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginTop: 18,
//     marginLeft: 25,
//     letterSpacing: 1,
//   },
//   divclass: {
//     //backgroundColor:'red',
//     //width:420
//     width: 180
//   },
//   textrecord: {
//     color: "#818181",
//     fontFamily: "Microsoft Jhenghei",
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginTop: 35,
//     //marginLeft:25
//   },
//   button: {
//     marginTop: 10,
//   }
// };

// class classCard extends React.Component {
//   state = {
//     ClassData: [],
//     dataInit: [],
//   };

//   componentDidMount() {

//     table.select({
//       filterByFormula: 'AND(class_id = "國文C班")',
//       view: "Grid view",
//     }).eachPage((records, fetchNextPage) => {
//       this.setState({ records });
//       var temp = [];
//       var temp2 = [];
//       console.log(records);
//       const class_id = this.state.records.map((record, index) => record.fields['class_id']);
//       const class_day = this.state.records.map((record, index) => record.fields['class_day']);
//       const class_start_time = this.state.records.map((record, index) => record.fields['class_start_time']);
//       const class_end_time = this.state.records.map((record, index) => record.fields['class_end_time']);

//       for (var index = 0; index < class_id.length; index++) {
//         //temp.push(createData(class_id[index], class_day[index], class_start_time[index], class_end_time[index]));
//         temp.push(createData(class_id),class_day[index] + class_start_time[index] + '-' + class_end_time[index]);
//       }
//       // for (var index = 0; index < class_id.length; index++) {
//       //   //temp.push(createData(class_id[index], class_day[index], class_start_time[index], class_end_time[index]));
//       //   temp2.push(createData(class_day[index] + class_start_time[index] + '-' + class_end_time[index]));
//       // }
//       // this.setState({
//       //   date: reserve_date, region: reserve_address, time: reserve_time, class: reserve_class
//       // });
//       this.setState({ ClassData: temp });
//       this.setState({ dataInit: temp });
//       this.setState({ class_id: class_id[0] });
//       this.setState({ class_time : class_day[0] + class_start_time[0] + '-' + class_end_time[0] });
//       fetchNextPage();
//     }
//     );

//   }

//   render() {
//     const { classes } = this.props;
//     return (
//       <div align="center">
//         <Card className={classes.card}>
//           <div>
//             <div className={classes.div1}>
//               <div className={classes.divclass}>
//                 <CardContent><Typography className={classes.text}>
//                 {this.state.class_id}
//                 </Typography></CardContent>
//               </div>
//               <div>
//                 <CardContent><div>
//                   <Typography className={classes.textdetail}>{this.state.class_time}</Typography></div>
//                 </CardContent>
//               </div>
//               <div>
//                 <CardContent><div>
//                   <Typography className={classes.textdetail}>台北校區 11樓</Typography>
//                 </div>
//                 </CardContent>
//               </div>

//               <div>
//                 <CardContent>
//                   <Typography className={classes.textrecord}>
//                     <NavLink style={{textDecoration:'none',color:'#818181'}} activeClassName='active' to='/teach/classScore'>
//                     <HomeworkButton style={{ marginLeft: 70,height:20}}/>考試紀錄</NavLink>
//                     <NavLink style={{textDecoration:'none',color:'#818181'}} activeClassName='active' to='/teach/teachrecord'>
//                     <TeachButton style={{ marginLeft: 20 }} />教學紀錄</NavLink>
//                   </Typography>
 
//                 </CardContent>
//               </div>

//             </div>
//           </div>
//         </Card>

//       </div>

//     );
//   }
// }

// classCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(classCard);