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
// import { BrowserRouter as NavLink } from "react-router-dom";
// import Arrowright from '@material-ui/icons/ArrowRightAltRounded';
// import CardHeader from '@material-ui/core/CardHeader';
// import IconButton from '@material-ui/core/IconButton';
// import { ButtonBase } from '@material-ui/core';

// const styles = {
//   card: {
//     //maxWidth: 345,
//     height: 75,
//     width:'80%',
//     marginTop:30,
//   },

// //   card2: {
// //     //maxWidth: 345,
// //     height: 75,
// //     marginTop: 30,
// //   },
// //   media: {
// //     // ⚠️ object-fit is not supported by IE 11.
// //     //objectFit: 'cover',
// //   },
//     text:{
//     color:'#5A3DAA',
//     fontFamily: "Microsoft Jhenghei",
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginTop:4,
//     letterSpacing:6,
//     textAlign:'left'
//     },
//    div1:{
//     //position:"absolute",
//     //display: "inline",
//     display: 'flex',
//     marginLeft:50,
//   },
//   textdetail:{
//     color: "#818181",
//     fontFamily: "Microsoft Jhenghei",
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginTop:11,
//     marginLeft:25
//   },
//   divclass:{
//     //backgroundColor:'red',
//     //width:420
//     width:200
//   }
// };

// function classCard(props) {
//   const { classes } = props;
//   return (
    
//     <div align="center">
    
//     <Card className={classes.card}>
//     {/* <NavLink style={{textDecoration:'none'}} activeClassName='active' to='/Tclass'> */}
    
    
//     <div>
    
//       <CardActionArea>
//         <div className={classes.div1}> 
//         <div className={classes.divclass}>
        
//         <CardContent>
        
//         <Typography className={classes.text}>數學A班</Typography>
//         </CardContent>
//         </div>
//         <div>
//         <CardContent>
//             <div>
//             <Typography className={classes.textdetail}>
//                 每周三 21:30 ~ 23:00
//             </Typography>
//             </div>
//         </CardContent>
//         </div>
//         <div>
//         <CardContent>
//             <div>
//             <Typography className={classes.textdetail}>
//                 台北校區 11樓
//             </Typography>
//             </div>
//         </CardContent>
//         </div>
        
//         </div>
//       </CardActionArea>
      
//       </div>
//       {/* </NavLink> */} 
//     </Card>
//     {/* </NavLink> */}

//     <Card className={classes.card}>
//     <div>
//       <CardActionArea>
//         <div className={classes.div1}> 
//         <div className={classes.divclass}>
//         <CardContent>
//             <Typography className={classes.text}>數學B班</Typography>
//         </CardContent>
//         </div>
//         <div>
//         <CardContent>
//             <div>
//             <Typography className={classes.textdetail}>
//                 每周四 21:30 ~ 23:00
//             </Typography>
//             </div>
//         </CardContent>
//         </div>
//         <div>
//         <CardContent>
//             <div>
//             <Typography className={classes.textdetail}>
//                 古亭校區 3樓
//             </Typography>
//             </div>
//         </CardContent>
//         </div>
        
//         </div>
//       </CardActionArea>
//       </div>
//     </Card>

//     <Card className={classes.card}>
//     <div>
//       <CardActionArea>
//         <div className={classes.div1}> 
//         <div className={classes.divclass}>
//         <CardContent>
//             <Typography className={classes.text}>數學複習班</Typography>
//         </CardContent>
//         </div>
//         <div>
//         <CardContent>
//             <div>
//             <Typography className={classes.textdetail}>
//                 每周六 21:30 ~ 23:00
//             </Typography>
//             </div>
//         </CardContent>
//         </div>
//         <div>
//         <CardContent>
//             <div>
//             <Typography className={classes.textdetail}>
//                 板橋校區 11樓
//             </Typography>
//             </div>
//         </CardContent>
//         </div>
        
//         </div>
//       </CardActionArea>
//       </div>
//     </Card>
   
//     </div>
     
//   );
// }

// classCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(classCard);