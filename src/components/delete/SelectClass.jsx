import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import Divider from '@material-ui/core/Divider';
//import Typography from '@material-ui/core/Typography';
//import Divider from '@material-ui/core/Divider';
import { Typography } from 'antd';
import Divider from '@material-ui/core/Divider';

import Airtable from 'airtable';

const TABLE_NAME = 'TestScore';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);
//const id = 'rec0tIlyDJJsyTlm5';



const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    //marginLeft:'42px',
    //marginTop:20,
    //height:'50px',
    width:'94vw'
  },
  table:{
    //marginTop:'3vh',
    align:'center',
    width:'100%',
  },
  formControl: {
    margin: 5,
    minWidth: 200,
    maxHeight:50,
    marginTop:20,
    marginLeft:65,
  },
  selectEmpty: {
   // marginTop: theme.spacing.unit * 2,
  },
  text:{
    //marginLeft:35,
    width:'100%',
    marginBottom:15,
    fontSize:20,
    fontWeight: "bold",
    color:'#969696',
    fontFamily: "Microsoft JhengHei",
    letterSpacing:4,
  },
  textRight:{
    fontSize:13,
    paddingLeft:'75%',
    color:'#FFBF5F',
  }
});

class NativeSelects extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       age: '',
//       name: '',
//       labelWidth: 0,
//       studentData: [],
//       classData: [],
//     };    
// }
  // state = {
  //   age: '',
  //   name: '王映心',
  //   labelWidth: 0,
  // };
  state = {
    age: '',
    name: '',
    labelWidth: 0,
    studentData: [],
    classData: [],
    classId:'',
  };

  
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });


    // //https://blog.airtable.com/the-right-sort-of-api-updates/
    // table.select({
    //   filterByFormula: 'AND(student_id = 405401369)',
    //   view: "Grid view"
    //   }).eachPage(function page(records, fetchNextPage) {
    //   // This function (`page`) will get called for each page of records.
    //     records.forEach(function(record) {

    //     console.log("SELECT HELLO");
    //     console.log('Retrieved', record.get('class_id'));
    //     temp.push(record.get('class_id'));
    //     this.setState({ classData: temp });
    //     //console.log('temp', temp);
    //     });
    //     fetchNextPage();
        
    //   }, function done(err) {
    //     if (err) { console.error(err); return; }
    //   });
    //   // console.log('outtemp', temp);
    //   // console.log('classData',this.state.classData);

      table.select({
        filterByFormula: 'AND(student_id = 405401369)',
        view: "Grid view"
        }).eachPage((records, fetchNextPage) => {
          this.setState({records});
          console.log(records);
          const class_id = this.state.records.map((record, index) => record.fields['class_id']);
          // This function (`page`) will get called for each page of records.
          var count = class_id.length;
          var temp=[];
          for(var index = 0; index < count; index++) {
            temp.push(class_id[index]);
          
          }
          this.setState({ classData : temp });
          fetchNextPage(); 
        }
        );

    fetch('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/Student?api_key=keyA7EKdngjou4Dgy')
    .then((resp) => resp.json())
    .then(data => {
       this.setState({ studentData: data.records });

       const student_name = this.state.studentData.map(item => Object.values(item)[1].student_name);
       var temp = student_name[1];
       console.log("SelectClass Hello");
       console.log(student_name);
      
       this.setState({ name : temp });
    }).catch(err => {
      // Error 🙁
    });


    
    // fetch('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/ClassMember?api_key=keyA7EKdngjou4Dgy')
    // .then((resp) => resp.json())
    // .then(data => {
    //    this.setState({ classData: data.records });
    // }).catch(err => {
    //   // Error 🙁
    // });

  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });

    // this.setState({ classData: event.target.value });
    // this.props.callbackFromParent(this.state.classData);
    // //this.setState({ name: event.target.value }, this.updateApplyForm);
    // console.log("handleChange");
    // console.log(this.state.classData);
    console.log("handleChange");
    this.setState({ classId: event.target.value });
    this.props.callbackFromParent(this.state.classId);
    console.log(event.target.value);
    //console.log(name);
  };


  render() {
    const { classes } = this.props;

    const{ name ,classData} = this.state;

    // const Classes = classData.map((classData, index) =>
    // <option value={index} style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>{classData}</option>
    // <option value={index} style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>{classData.fields.class_id}</option>
    //); 

    return (
      
      <div className={classes.root}>
      
        <div className={classes.table}>
            <Typography class={classes.text} nowrap={true}>
              <a style={{color:'#FFBF5F',marginLeft:35}}>{this.state.name}</a><a>的成績</a>
              <a class={classes.textRight}>107學年</a>
            </Typography>
       
        
        <Divider variant="middle"/>
        <FormControl variant="outlined" className={classes.formControl}>
        
          <InputLabel 
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-native-simple"
            style={{color:'#5A3DAA',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold"}}
          >
            選擇班級/科目
          </InputLabel>
          <Select
            native
            value={this.state.age}
            onChange={this.handleChange('age')}
            input={
              <OutlinedInput
                name="Age"
                labelWidth={this.state.labelWidth}
                id="outlined-age-native-simple"
              />
            }
          >
            <option value="" />
            {(this.state.classData)
                .map((n,index) => {
                  return (
                    <option value={n} style={{color:'#5A3DAA',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>{n}</option>
                  );
                })}
            {/* {Classes} */}
            {/* <option value="1" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>國文A班</option>
            <option value="2" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>數學B班</option>
            <option value="3" style={{color:'#969696',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",}}>理化A班</option> */}
          </Select>
        </FormControl>
        </div>
      </div>
    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NativeSelects);
