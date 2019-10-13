// import React from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
// import { withStyles } from '@material-ui/core/styles';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// // import Divider from '@material-ui/core/Divider';
// //import Typography from '@material-ui/core/Typography';
// //import Divider from '@material-ui/core/Divider';
// import { Typography } from 'antd';
// import Divider from '@material-ui/core/Divider';

// import Airtable from 'airtable';

// const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');

// let temp = [];
// function caculateMounth(rawDate) {
//   //2019-03-07
//   temp = rawDate.split("-");
//   //console.log("TEMP is");
//   //console.log(temp);
//   // if(temp[1] == "02"){
//   //   rawDate = "二月"
//   // }else{
//   //   rawDate = temp[1] + "月";
//   // }
//   rawDate = temp[1] + "月";
  
//   return {rawDate};
// }


// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     //marginLeft:'42px',
//     //marginTop:20,
//     //height:'50px',
//     width:'94vw'
//   },
//   table:{
//     //marginTop:'3vh',
//     align:'center',
//     width:'100%',
//   },
//   formControl: {
//     margin: 5,
//     minWidth: 200,
//     maxHeight:50,
//     marginTop:20,
//     marginLeft:65,
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

// class NativeSelects extends React.Component {
//   state = {
//     age: '',
//     name: '王映心',
//     labelWidth: 0,
//     mounth: [],
//   };

//   componentDidMount() {
//     this.setState({
//       labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
//     });

//     base('Attend').select({view: 'Grid view'})
//     .eachPage(
//       (records, fetchNextPage) => {
//         this.setState({records});
//         console.log(records);
//         const attend_date = this.state.records.map((record, index) => record.fields['attend_date']);
//         console.log(attend_date);

//         var count = attend_date.length;
//         var temp=[];
//         for(var index = 0; index < count; index++) {
//           // for(var j = 1; j < index; j++) {
//           //   if(caculateMounth(attend_date[j]) != caculateMounth(attend_date[index])){
//           //     console.log(caculateMounth(attend_date[j]));
//           //     console.log(caculateMounth(attend_date[index]));
//           //     temp.push(caculateMounth(attend_date[index]));
//           //   }
//           // }
//           temp.push(caculateMounth(attend_date[index]));
          
//         }
//         //createData(record.fields['attend_date'], record.fields['attend_time']),record.fields['attend_time'],record.fields['attend_time']);
//         console.log(attend_date);
//         console.log(attend_date[1]);
//         console.log("selectMounth Hello1");
//         console.log(temp);
//         this.setState({ mounth : temp });
//         console.log("selectMounth Hello2");
//         console.log(this.state.mounth);
//         fetchNextPage();
//       }
//     );
//   }

//   handleChange = name => event => {
//     this.setState({ [name]: event.target.value });
//   };

//   render() {
//     const { classes } = this.props;

//     return (
      
//       <div className={classes.root}>
      
//         <div className={classes.table}>
//             <Typography class={classes.text} nowrap={true}>
//               <a style={{color:'#FFBF5F',marginLeft:35}}>{this.state.name}</a><a>的出勤紀錄</a>
//               <a className={classes.textRight}>107學年</a>
//             </Typography>
       
        
//         <Divider variant="middle"/>
//         <FormControl variant="outlined" className={classes.formControl}>
        
//           <InputLabel 
//             ref={ref => {
//               this.InputLabelRef = ref;
//             }}
//             htmlFor="outlined-age-native-simple"
//             style={{color:'#5A3DAA',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}
//           >
//             選擇月份
//           </InputLabel>
//           <Select
//             native
//             value={this.state.age}
//             onChange={this.handleChange('age')}
//             input={
//               <OutlinedInput
//                 name="Age"
//                 labelWidth={this.state.labelWidth}
//                 id="outlined-age-native-simple"
//               />
//             }
//           >
//             <option value="" />
//             {(this.state.mounth)
//                 .map((n,index) => {
//                   return (
//                     <option value={index} style={{color:'#5A3DAA',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>{n.rawDate}</option>
//                   );
//                 })}
//             {/* <option value="1" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>一月</option>
//             <option value="2" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>二月</option>
//             <option value="3" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>三月</option> */}
//           </Select>
//         </FormControl>
//         </div>
//       </div>
//     );
//   }
// }

// NativeSelects.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(NativeSelects);
