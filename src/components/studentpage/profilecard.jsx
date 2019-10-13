import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import orange from '@material-ui/core/colors/orange';
import purple from '@material-ui/core/colors/purple';
import Arrowright from '@material-ui/icons/ArrowRightAltRounded';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { FormControl, FormHelperText, Divider, Typography } from '@material-ui/core';
import { isNullOrUndefined } from 'util';
import Head from './headmiddle.jsx';
import Emaildiag from './emaildiag';
import Passdiag from './passwddiag';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Airtable from 'airtable';

const TABLE_NAME = 'Student';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);

const styles = {
  card: {
    //maxWidth: 345,
    //minWidth: '70vw',
    marginLeft: 40,
    //marginRight: 40,
    marginTop: 100,
    marginBottom: 100,
    width: "25vw",
    height: 600,
    overflowX:'auto',
    overflowY:'auto',
  },
  
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  logocss: {
    marginLeft: 250,
    marginRight: 250,
  },
  margin: {
    //margin: theme.spacing.unit,
    alignItems: 'center',
    marginLeft: 400,
  },
  cssLabel: {
    '&$cssFocused': {
      color: orange[300],
    },
  },
  cssFocused: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: orange[300],
    },
  },
  notchedOutline: {},
  typetestcss:{
    fontSize: 18,
    color: "#969696",
    fontWeight: "bold",
    fontFamily: "Microsoft JhengHei",
    marginLeft: 20,
    marginTop: 10,
  },
  
  div1:{
    display: 'flex',
  },
  
  namecss: {
    marginTop: 10,
    fontFamily: "Microsoft JhengHei",
    fontWeight: 'bold',
    fontSize: 18,
    color: '#707070',
  },

  numcss:{
    marginTop: 10,
    fontFamily: "Microsoft JhengHei",
    fontSize: 12,
    color: '#707070',
  },

  divider:{
    marginTop: 30,
  },
  
  schoolcss:{
    marginLeft: 30,
    marginTop: 30,
    fontFamily: "Microsoft JhengHei",
    fontWeight: 'bold',
    fontSize: 16,
  },

  urschoolcss:{
    marginLeft: 100,
    marginTop: 30,
    fontFamily: "Microsoft JhengHei",
    fontWeight: 'regular',
    fontSize: 16,
    color: '#707070',
  },
  

  changetext:{
    fontFamily: "Microsoft JhengHei",
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: -1,
    color: '#FFFFFF',
  },

  uremail:{
    marginLeft: 30,
    marginTop: 15,
    fontFamily: "Microsoft JhengHei",
    fontWeight: 'regular',
    fontSize: 16,
    color: '#707070',
  },

  

};
class ImgMediaCard extends React.Component {
  state = {
    //studentData: [],
    stu_id: '',
    stu_name: '',
    stu_img: '',
    stu_school: '',
    stu_grade: '',
    stu_phone: '',
    stu_email: '',

  };
  componentDidMount(){
    const filterSentence = 'AND(student_id =' + this.props.UserId + ')';
    table.select({
      filterByFormula: filterSentence,
      view: "Grid view",
      //maxRecords: 1
      }).eachPage((records, fetchNextPage) => {
        this.setState({records});

        const student_name = this.state.records.map((record, index) => record.fields['student_name']);
        const student_id = this.state.records.map((record, index) => record.fields['student_id']);
        const student_school = this.state.records.map((record, index) => record.fields['student_school']);
        const student_grade = this.state.records.map((record, index) => record.fields['student_grade']);
        const student_phone = this.state.records.map((record, index) => record.fields['student_phone']);
        const student_email = this.state.records.map((record, index) => record.fields['student_email']);
        const student_img = this.state.records.map((record, index) => record.fields['student_img'][0].url); 


        this.setState({ stu_id : student_id, stu_name : student_name, stu_img : student_img 
        ,stu_school : student_school , stu_grade : student_grade, stu_email : student_email, stu_phone : student_phone});
          
        fetchNextPage(); 
      }
    );
  }

  render(props){
    const { classes } = this.props;
    
    return (
      <div>
      <Card className={classes.card} >
      
        <Head ImgFromParent = {this.state.stu_img}/>
        <Typography  align="center" className={classes.namecss}>{this.state.stu_name}</Typography>
        <Typography  align="center" className={classes.numcss}>#{this.state.stu_id}</Typography>
        <Divider variant="middle" className={classes.divider}/>
        <div className={classes.div1}>
          <Typography align="left" className={classes.schoolcss}>就讀學校</Typography>
          <Typography  align="right" className={classes.urschoolcss}>{this.state.stu_school}</Typography>
        </div>
        <div className={classes.div1}>
          <Typography align="left" className={classes.schoolcss}>就讀年級</Typography>
          <Typography   className={classes.urschoolcss}>{this.state.stu_grade}</Typography>
        </div>
        <div className={classes.div1}>
          <Typography align="left" className={classes.schoolcss}>手機號碼</Typography>
          <Typography   className={classes.urschoolcss}>{this.state.stu_phone}</Typography>
        </div>
  
        <div className={classes.div1}>
          <Typography align="left" className={classes.schoolcss}>學生信箱</Typography>
          <div>
            <Emaildiag UserId={this.props.UserId}/>
          </div>
        </div>
  
        <div>
          <Typography   className={classes.uremail}>{this.state.stu_email}</Typography>
        </div>
  
        <div className={classes.div1}>
          <Typography align="left" className={classes.schoolcss}>你的密碼</Typography>
          <Passdiag/>
        </div>
  
      </Card>
      </div>
      
    );
  }
}  
// function ImgMediaCard(props) {

//   const { classes } = props;
//   return (
//     <div>
//     <Card className={classes.card} >
    
//       <Head/>
//       <Typography  align="center" className={classes.namecss}>王 映 心</Typography>
//       <Typography  align="center" className={classes.numcss}>#405401279</Typography>
//       <Divider variant="middle" className={classes.divider}/>
//       <div className={classes.div1}>
//         <Typography align="left" className={classes.schoolcss}>就讀學校</Typography>
//         <Typography  align="right" className={classes.urschoolcss}>景美女中</Typography>
//       </div>
//       <div className={classes.div1}>
//         <Typography align="left" className={classes.schoolcss}>就讀年級</Typography>
//         <Typography   className={classes.urschoolcss}>高中三年級</Typography>
//       </div>
//       <div className={classes.div1}>
//         <Typography align="left" className={classes.schoolcss}>手機號碼</Typography>
//         <Typography   className={classes.urschoolcss}>0988536239</Typography>
//       </div>

//       <div className={classes.div1}>
//         <Typography align="left" className={classes.schoolcss}>學生信箱</Typography>
//         <div>
//           <Emaildiag/>
//         </div>
//       </div>

//       <div>
//         <Typography   className={classes.uremail}>doris0728@gmail.com</Typography>
//       </div>

//       <div className={classes.div1}>
//         <Typography align="left" className={classes.schoolcss}>你的密碼</Typography>
//         <Passdiag/>
//       </div>

//     </Card>
//     </div>
    
//   );
// }

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);