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
// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     //marginLeft:'42px',
//     //marginTop:20,
//     //height:'50px',
//     width:840
//   },
//   table:{
//     //marginTop:'3vh',
//     align:'center',
//     width:'100%',
//     //marginTop:20
//     //display:'flex'
//   },
//   formControl: {
//     margin: 5,
//     minWidth: 200,
//     maxHeight:50,
//     marginTop:10,
//     marginLeft:15,
//   },
//   selectEmpty: {
//    // marginTop: theme.spacing.unit * 2,
//   },
//   text:{
//     color:'#5A3DAA',
//     fontFamily: "Microsoft JhengHei",
//     letterSpacing:4,
//     fontWeight: "bold",
//     fontSize:18,
//     marginLeft:75,
//     display:'inline-block',
//     marginTop:25
//   },
//   divide:{
//     marginTop:10,
//     width:840
//   }
// });

// class NativeSelects extends React.Component {
//   state = {
//     age: '',
//     name: '王映心',
//     labelWidth: 0,
//   };

//   componentDidMount() {
//     this.setState({
//       labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
//     });
//   }

//   handleChange = name => event => {
//     this.setState({ [name]: event.target.value });
//   };

//   render() {
//     const { classes } = this.props;

//     return (
      
//       <div className={classes.root}>
      
//         <div className={classes.table}>
//         <a marginTop="20" className={classes.text}>選擇校區</a>
//         <FormControl variant="outlined" className={classes.formControl}>
//           <InputLabel 
//             ref={ref => {
//               this.InputLabelRef = ref;
//             }}
//             htmlFor="outlined-age-native-simple"
//             style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>
            
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
//                 style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}
//               />
//             }
//           >
//             <option value="0" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>全部</option>
//             <option value="1" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>古亭校區</option>
//             <option value="2" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>台北校區</option>
//             <option value="3" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>板橋校區</option>
//           </Select>
//         </FormControl>

//         <a className={classes.text}>選擇時段</a>
//         <FormControl variant="outlined" className={classes.formControl}>
        
//           <InputLabel 
//             ref={ref => {
//               this.InputLabelRef = ref;
//             }}
//             htmlFor="outlined-age-native-simple"
//             style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>
            
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
//                 style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}
//               />
//             }
//           >
//             <option value="11" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>全部</option>
//             <option value="12" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>早上</option>
//             <option value="13" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>下午</option>
//             <option value="14" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>晚上</option>
//           </Select>
//         </FormControl>

//         <Divider className={classes.divide}/>
//         </div>
//       </div>
//     );
//   }
// }

// NativeSelects.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(NativeSelects);