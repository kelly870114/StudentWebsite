import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Divider from '@material-ui/core/Divider';
//import Typography from '@material-ui/core/Typography';
//import Divider from '@material-ui/core/Divider';
import { Typography } from 'antd';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Airtable from 'airtable';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

const TABLE_NAME = 'ClassDay';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);

function createData(class_id, class_day) {

  return { class_id, class_day};
}
// function createData(class_time) {
//   class_time = class_day + class_start_time + ' - ' +class_end_time; 
//   return { class_time };
// }

const styles = theme => ({
  //下面開始是select
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    //marginLeft:'42px',
    //marginTop:20,
    //height:'50px',
    width: 840
  },
  table: {
    //marginTop:'3vh',
    align: 'center',
    width: '100%',
    //marginTop:20
    //display:'flex'
  },
  formControl: {
    margin: 5,
    minWidth: 200,
    maxHeight: 50,
    marginTop: 10,
    marginLeft: 15,
  },
  selectEmpty: {
    // marginTop: theme.spacing.unit * 2,
  },
  text: {
    color: '#5A3DAA',
    fontFamily: "Microsoft JhengHei",
    letterSpacing: 4,
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 75,
    display: 'inline-block',
    marginTop: 25
  },
  divide: {
    marginTop: 10,
    width: 840
  },
  //card start
  card: {
    //maxWidth: 345,
    height: 75,
    width: '80%',
    marginTop: 30,
  },
  cardtext: {
    color: '#5A3DAA',
    fontFamily: "Microsoft Jhenghei",
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 4,
    letterSpacing: 6,
    textAlign: 'left'
  },
  div1: {
    //position:"absolute",
    //display: "inline",
    display: 'flex',
    marginLeft: 50,
  },
  textdetail: {
    color: "#818181",
    fontFamily: "Microsoft Jhenghei",
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 11,
    marginLeft: 25,
    letterSpacing: 2,
  },
  divclass: {
    //backgroundColor:'red',
    //width:420
    width: 200
  }
});

class NativeSelects extends React.Component {
  state = {
    age: '',
    name: '王映心',
    labelWidth: 0,
    ClassData: [],
    dataInit: [],
    data:[],
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });

    table.select({
      filterByFormula: 'AND(subject_name = "國文")',
      view: "Grid view",
    }).eachPage((records, fetchNextPage) => {
      this.setState({ records });
      var temp = [];
      console.log(records);
      const class_id = this.state.records.map((record, index) => record.fields['class_id']);
      const class_day = this.state.records.map((record, index) => record.fields['class_day']);
      const class_start_time = this.state.records.map((record, index) => record.fields['class_start_time']);
      const class_end_time = this.state.records.map((record, index) => record.fields['class_end_time']);

      for (var index = 0; index < class_id.length; index++) {
        // temp.push(createData(class_id[index], class_day[index], class_start_time[index], class_end_time[index]));
        temp.push(createData(class_id[index], class_day[index] + class_start_time[index] + '-' + class_end_time[index]));
      }
      // this.setState({
      //   date: reserve_date, region: reserve_address, time: reserve_time, class: reserve_class
      // });
      this.setState({ ClassData : temp });
      this.setState({ dataInit : temp });
      this.setState({ data : temp });
      fetchNextPage();
    }
    );

  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });

    //for select
    console.log("In handleChange");

    let temp = [];
    var count = this.state.dataInit.length;
    console.log(event.target.value);

    for (var index = 0; index < count; index++) {
      if (this.state.dataInit[index].class_id == event.target.value) {
        temp.push(this.state.dataInit[index]);
        //console.log(temp);
      }
    }
    this.setState({ data : temp });
    if (event.target.value == "1") {
      this.setState({ rows: this.state.dataInit });
    }

  };

  render() {
    const { classes } = this.props;

    const ClassCard = ({ class_id, class_day }) => (
      <NavLink style={{ textDecoration: 'none', color: '#818181' }} activeClassName='active' 
      // to='/teach/classdetail'
      to={{pathname:'/teach/classdetail', myClassProps:{name : class_id, class_day}}}> 
      {/* className還沒接收到 */}
        <Card className={classes.card}>
          <div>
            <CardActionArea>
              <div className={classes.div1}>
                <div className={classes.divclass}>
                  <CardContent><Typography className={classes.cardtext}>{class_id}</Typography> </CardContent>
                </div>
                <div>
                  <CardContent><div>
                    <Typography className={classes.textdetail}>{class_day}</Typography></div>
                  </CardContent>
                </div>
                <div>
                  <CardContent><div>
                    <Typography className={classes.textdetail}>台北校區 11樓</Typography></div>
                  </CardContent>
                </div>
              </div>
            </CardActionArea>
          </div>
        </Card>
      </NavLink>
    );

    return (
      <div style={{ marginTop: 120, marginLeft: 100, width: 840, backgroundColor: 'white' }}>
        <div className={classes.root}>

          <div className={classes.table}>
            <a marginTop="20" className={classes.text}>選擇校區</a>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-native-simple"
                style={{ color: '#969696', fontFamily: "Microsoft JhengHei", letterSpacing: 4, fontWeight: "bold", }}>

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
                    style={{ color: '#969696', fontFamily: "Microsoft JhengHei", letterSpacing: 4, fontWeight: "bold", }}
                  />
                }
              >
                {/* <option value="" /> */}
                <option value="1" style={{ color: '#969696', fontFamily: "Microsoft JhengHei", letterSpacing: 4, fontWeight: "bold", }}>所有校區</option>
                {/* <option value="" /> */}
                {/* <option value="" /> */}
                {/* {(this.state.ClassData)
                  .map((n, index) => {
                    return (
                      <option value={n} style={{ color: '#969696', fontFamily: "Microsoft JhengHei", letterSpacing: 4, fontWeight: "bold", }}>{n}</option>
                    );
                  })} */}
              </Select>
            </FormControl>

            <a className={classes.text}>選擇時段</a>
            <FormControl variant="outlined" className={classes.formControl}>

              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-native-simple"
                style={{ color: '#969696', fontFamily: "Microsoft JhengHei", letterSpacing: 4, fontWeight: "bold", }}>

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
                    style={{ color: '#969696', fontFamily: "Microsoft JhengHei", letterSpacing: 4, fontWeight: "bold", }}
                  />
                }
              >
                <option value="11" style={{ color: '#969696', fontFamily: "Microsoft JhengHei", letterSpacing: 4, fontWeight: "bold", }}>全部</option>
                <option value="12" style={{ color: '#969696', fontFamily: "Microsoft JhengHei", letterSpacing: 4, fontWeight: "bold", }}>早上</option>
                <option value="13" style={{ color: '#969696', fontFamily: "Microsoft JhengHei", letterSpacing: 4, fontWeight: "bold", }}>下午</option>
                <option value="14" style={{ color: '#969696', fontFamily: "Microsoft JhengHei", letterSpacing: 4, fontWeight: "bold", }}>晚上</option>
              </Select>
            </FormControl>

            <Divider className={classes.divide} />
          </div>
        </div>
        <div align="center">
          {this.state.ClassData.map(myclass => <ClassCard {...myclass} />)}
        </div>
        <div style={{ height: 30 }}></div>
      </div>
    );
  }
}
NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NativeSelects);