import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import orange from '@material-ui/core/colors/orange';
import purple from '@material-ui/core/colors/purple';
import Arrowright from '@material-ui/icons/ArrowRightAltRounded';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { FormControl, FormHelperText, Divider } from '@material-ui/core';
import { isNullOrUndefined } from 'util';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Airtable from 'airtable';
import Login from '../Loginpage/login';

const TABLE_NAME = 'TestScore';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);

const styles = {
  card: {
    //maxWidth: 345,
    //minWidth: '70vw',
    marginLeft: 40,
    //marginRight: 100,
    marginTop: 100,
    width: "55vw",
    height: 400,
    overflowX:'scroll',
    
  },
  smallcard1: {
    //maxWidth: 345,
    //minWidth: 200,
    marginTop: 0,
    marginLeft: 30,
    marginRight: 0,
    width: "15vw",
    height: 250,
  },
  smallcard2: {
    //maxWidth: 345,
    //minWidth: 200,
    marginTop: 0,
    marginLeft: 30,
    marginRight: 0,
    width: "15vw",
    height: 250,
  },
  smallcard3: {
    //maxWidth: 345,
    //minWidth: 200,
    marginTop: 0,
    marginLeft: 30,
    marginRight: 30,
    width: "15vw",
    height: 250,
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
  buttonmore:{
    marginLeft: 600,
    marginRight: 10,
    color: "#B9B9B9",
  },
  div1:{
    display: 'flex',
  },
  datetypecss:{
    fontSize: 18,
    color: "#969696",
    fontWeight: "regular",
    fontFamily: "Microsoft JHengHei",
    marginTop: 10,
  },
  scoretypecss:{
    fontSize: 50,
    color: "#FFBF5F",
    fontWeight: "bold",
    fontFamily: "Microsoft JHengHei",
    marginTop: 10,
  },
  classtypecss:{
    fontSize: 25,
    color: "#969696",
    fontWeight: "regular",
    fontFamily: "Microsoft JHengHei",
    marginTop: 10,
  },
};
function createData(class_id, test_score, test_date) {
  return { class_id, test_score, test_date};
}

class ImgMediaCard extends React.Component {
  state = {
    //studentData: [],
    userData:[],
  };
  componentDidUpdate(prevProps){
    if (this.props.UserId !== prevProps.UserId) {
      const filterSentence = 'AND(student_id =' + this.props.UserId + ')';
      table.select({
      filterByFormula: filterSentence,
      view: "Grid view",
      maxRecords: 3,
      }).eachPage((records, fetchNextPage) => {
        const class_id = records.map((record, index) => record.fields['class_id']);
        const test_score = records.map((record, index) => record.fields['test_score']);
        const test_date = records.map((record, index) => record.fields['test_date']);

        var temp=[];
        for(var index = 0; index < 3; index++) {
          temp.push(createData(class_id[index], test_score[index], test_date[index]));
        }
      
        this.setState({ userData : temp });
        fetchNextPage(); 
      }
      );
    }
  }

  componentDidMount(){
      const filterSentence = 'AND(student_id =' + this.props.UserId + ')';
      table.select({
      filterByFormula: filterSentence,
      view: "Grid view",
      maxRecords: 3,
      }).eachPage((records, fetchNextPage) => {
        const class_id = records.map((record, index) => record.fields['class_id']);
        const test_score = records.map((record, index) => record.fields['test_score']);
        const test_date = records.map((record, index) => record.fields['test_date']);

        var temp=[];
        for(var index = 0; index < 3; index++) {
          temp.push(createData(class_id[index], test_score[index], test_date[index]));
        }
      
        this.setState({ userData : temp });
        fetchNextPage(); 
      }
      );
  }

  render(props){
    const { classes } = this.props;

    const ClassCard =({test_date,test_score,class_id}) => (
      <div >
      <Card className={classes.smallcard1}>
      {/* small card1 */}
          <CardContent>
           <Typography align="center" className={classes.datetypecss}>{test_date}</Typography>
           <Typography align="center" className={classes.scoretypecss}>{test_score}</Typography>
          </CardContent>
          <Divider variant="middle"/>
          <CardContent>
            <Typography align="center" className={classes.classtypecss}>{class_id}</Typography>
          </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
      </div>
    );
    
    
    return (
      <div>
      <Card className={classes.card} >
      {/* big card */}
       
        <CardHeader
            action={
              <NavLink style={{textDecoration:'none'}} activeClassName='active' to='/bar/score'>
              <IconButton>
                <Arrowright/>
              </IconButton>
              </NavLink>
            }
            className={classes.typetestcss}
            title={<a style={{fontSize:20,fontWeight: "bold",fontFamily: "Microsoft JhengHei",
            letterSpacing:4,color:'#6C6C6C'}}>考試成績</a>}
          />

      <CardActionArea onClick={Login}>
        {/* <ButtonBase
          className={props.classes.cardAction}
          onClick={event => { ... }}
      > */}
      <div className={classes.div1}>
        {this.state.userData.map(score => <ClassCard {...score} /> )}
      </div>
      </CardActionArea>
      </Card>
      </div>
      
    );
  }
}
// function ImgMediaCard(props) {
//   var temp = [];
//   table.select({
//     filterByFormula: 'AND(student_id = 405401369)',
//     view: "Grid view",
//     maxRecords: 3,
//     }).eachPage((records, fetchNextPage) => {
//       //temp.push(records.fields);
//       //this.setState({records});
//       //console.log(records);

//       const class_id = records.map((record, index) => record.fields['class_id']);
//       const test_score = records.map((record, index) => record.fields['test_score']);
//       const test_date = records.map((record, index) => record.fields['test_date']);
//       // // This function (`page`) will get called for each page of records.

//       // var temp=[];
//       for(var index = 0; index < 3; index++) {
//         temp.push(class_id[index], test_score[index], test_date[index]);
//       }
//       console.log(temp[0]);
//       //this.setState({ userData : temp });
//       fetchNextPage(); 
//     }
//     );

// }

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);