import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { Card, Typography } from '@material-ui/core';
import GlobeIcon from '@material-ui/icons/LanguageRounded';
import ManIcon from '@material-ui/icons/HowToRegRounded'
import Chart from "react-google-charts";
import Img from './reading.png'
import Airtable from 'airtable';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const TABLE_NAME = 'TestScore';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);


//analysischart data
// const analysisdata = [
//   ["", "", { role: "style" }],
//   ["A", 8.94, "#5A3DAA"], // RGB value
//   ["B", 10.49, "#FFC880"], // English color name
//   ["C", 19.3, "#FFC880"],
//   ["D", 21.45, "#FFC880"] // CSS-style declaration
// ];

//chart style
const analysisoption = {
  width: 300,
  legend: { position: 'none' }
};

// const data = [
//   ['', '及格', '不及格', '缺考'],
//   ['', 41, 30, 10],
// ];
const option = {
  colors: ['#5A3DAA', '#FFBF5F', '#ECECEC'],
  chartArea: { width: '86%',right:89 },
  align:'left',
  isStacked: true,
  height: 120,
  width: 840,
  hAxis: {
    baselineColor: 'none',
    ticks: []
  },
  vAxis: {
    //baselineColor: 'none',
    ticks: []
  },
  legend: {
    //marginTop:30
    //position: 'bottom'
  },
//   colors: ['#5A3DAA', '#FFBF5F', '#ECECEC'],
//     chartArea: { width: '50%' },
//     isStacked: true,
//     hAxis: {
//       title: 'Total Population',
//       minValue: 0,
//     },
//     vAxis: {
//       title: 'City',
//     },
};

const styles = theme => ({
  table: {
    //width: 1020,
    minWidth: 400,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  //Title的
  SelectRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    //marginLeft:34,
    //marginTop:20,
    //height:'50px',
    width: 1020,
    marginLeft: 10
  },
  SelectTable: {
    //marginTop:'3vh',
    align: 'center',
    width: '100%',
  },
  text: {
    //marginLeft:35,
    width: '100%',
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: '#969696',
    fontFamily: "Microsoft JhengHei",
    letterSpacing: 3,
  },
  textRight: {
    fontSize: 13,
    //paddingLeft: '65%',
    color: '#FFBF5F',
    marginLeft: 520
  },
  card: {
    backgroundColor: 'white',
    //border: '0.8px #FFBF5F solid',
    borderRadius: '2px',
    width: '96%',
    marginTop: theme.spacing.unit * 3,
    margin: '0 auto',
    //cardElevation:'0'
  },
  divflex: {
    display: 'flex'
  },
  analysis: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 1010,
    marginBottom: 20
  },
  analysisCard: {
    width: 305,
    marginLeft: 30,
    marginTop: 25
  },
  analysistext: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#969696',
    fontFamily: "Microsoft JhengHei",
    letterSpacing: 1,
    marginLeft: 10,
    marginTop: 5
  }
});


//const { classes } = this.props; //這是setlect的
class EnhancedTable extends React.Component {
  state = {
    //下面是select跟title的
    age: '',
    classname: '國文第六課',
    myclass: '國文C班',
    analysisdata0: [],
    analysisdata1: [],
    analysisdata2: [],
    analysisdata3: [],
    analysisdata4: [],
    analysisdata5: [],
    analysisdata6: [],
    analysisdata7: [],
    analysisdata8: [],
    analysisdata9: [],
    data: [],
    questionOpen: false,
  };
  //
  question = () => {
    this.setState({ questionOpen: true });
    console.log("click")
  };
  questionClose = () => {
    this.setState({ questionOpen: false });
  };
  //

  componentDidMount() {
    const filterSentence = 'AND(test_name ="國文第四課")';
    table.select({
      filterByFormula: filterSentence,
      view: "Grid view",
      //maxRecords: 3,
    }).eachPage((records, fetchNextPage) => {

      const student_id = records.map((record, index) => record.fields['student_id']);
      const test_score = records.map((record, index) => record.fields['test_score']);

      var fail = 0;
      var good = 0;
      var absent = 1;
      for (var index = 0; index < test_score.length; index++) {
        if (student_id !== "admin") {
          if (test_score[index] < 60) {
            fail++;
          } else {
            good++;
          }
        }
      }
      var tempF = [];
      tempF.push(['', '及格', '不及格', '缺考'], ['', good -1, fail, absent]);
      this.setState({ data: tempF })

      const Q1 = records.map((record, index) => record.fields['Q1']);
      const Q2 = records.map((record, index) => record.fields['Q2']);
      const Q3 = records.map((record, index) => record.fields['Q3']);
      const Q4 = records.map((record, index) => record.fields['Q4']);
      const Q5 = records.map((record, index) => record.fields['Q5']);
      const Q6 = records.map((record, index) => record.fields['Q6']);
      const Q7 = records.map((record, index) => record.fields['Q7']);
      const Q8 = records.map((record, index) => record.fields['Q8']);
      const Q9 = records.map((record, index) => record.fields['Q9']);
      const Q10 = records.map((record, index) => record.fields['Q10']);
      var tempQ = [];
      tempQ.push(Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10);

      for (var q = 0; q < 10; q++) {
        var temp = [];
        var countA = 0;
        var countB = 0;
        var countC = 0;
        var countD = 0;
        var correct = "";
        //console.log(tempQ[q]);
        for (var index = 0; index < student_id.length; index++) {
          //count answers
          //Q1
          if (tempQ[q][index] == "A") {
            countA++;
          } else if (tempQ[q][index] == "B") {
            countB++;
          } else if (tempQ[q][index] == "C") {
            countC++;
          } else if (tempQ[q][index] == "D") {
            countD++;
          }
          var people = student_id.length - 1;
          //set correct ans to purple
          // if (student_id[index] == "admin") {
          //   correct = tempQ[q][index];
          //   if (correct == "A") {
          //     temp.push(["", "", { role: "style" }],
          //       ["A", (countA - 1) / people * 100, "#5A3DAA"],
          //       ["B", countB / people * 100, "#FFC880"],
          //       ["C", countC / people * 100, "#FFC880"],
          //       ["D", countD / people * 100, "#FFC880"]);
          //   } else if (correct == "B") {
          //     temp.push(["", "", { role: "style" }],
          //       ["A", countA / people * 100, "#FFC880"],
          //       ["B", (countB - 1) / people * 100, "#5A3DAA"],
          //       ["C", countC / people * 100, "#FFC880"],
          //       ["D", countD / people * 100, "#FFC880"]);

          //   } else if (correct == "C") {
          //     temp.push(["", "", { role: "style" }],
          //       ["A", countA / people * 100, "#FFC880"],
          //       ["B", countB / people * 100, "#FFC880"],
          //       ["C", countC / people * 100, "#5A3DAA"],
          //       ["D", countD / people * 100, "#FFC880"]);

          //   } else if (correct == "D") {
          //     temp.push(["", "", { role: "style" }],
          //       ["A", countA / people * 100, "#FFC880"],
          //       ["B", countB / people * 100, "#FFC880"],
          //       ["C", countC / people * 100, "#FFC880"],
          //       ["D", (countD - 1) / people * 100, "#5A3DAA"]);
          //   }
          // }
          //////////////////////////
          // if (student_id[index] == "admin") {
          //   correct = tempQ[q][index];
          //   if (correct == "A") {
          //     temp.push(["", "", { role: "style" }],
          //       ["A", (countA - 1) , "#5A3DAA"],
          //       ["B", countB , "#FFC880"],
          //       ["C", countC , "#FFC880"],
          //       ["D", countD , "#FFC880"]);
          //   } else if (correct == "B") {
          //     temp.push(["", "", { role: "style" }],
          //       ["A", countA, "#FFC880"],
          //       ["B", (countB - 1) , "#5A3DAA"],
          //       ["C", countC , "#FFC880"],
          //       ["D", countD , "#FFC880"]);

          //   } else if (correct == "C") {
          //     temp.push(["", "", { role: "style" }],
          //       ["A", countA , "#FFC880"],
          //       ["B", countB, "#FFC880"],
          //       ["C", countC -1 , "#5A3DAA"],
          //       ["D", countD , "#FFC880"]);

          //   } else if (correct == "D") {
          //     temp.push(["", "", { role: "style" }],
          //       ["A", countA , "#FFC880"],
          //       ["B", countB , "#FFC880"],
          //       ["C", countC , "#FFC880"],
          //       ["D", (countD - 1) , "#5A3DAA"]);
          //   }
          // }
        }


        for(var index = 0; index < student_id.length; index++){
          if (student_id[index] == "admin") {
            correct = tempQ[q][index];
            if (correct == "A") {
              temp.push(["", "", { role: "style" }],
                ["A", (countA - 1) , "#5A3DAA"],
                ["B", countB , "#FFC880"],
                ["C", countC , "#FFC880"],
                ["D", countD , "#FFC880"]);
            } else if (correct == "B") {
              temp.push(["", "", { role: "style" }],
                ["A", countA, "#FFC880"],
                ["B", (countB - 1) , "#5A3DAA"],
                ["C", countC , "#FFC880"],
                ["D", countD , "#FFC880"]);

            } else if (correct == "C") {
              temp.push(["", "", { role: "style" }],
                ["A", countA , "#FFC880"],
                ["B", countB, "#FFC880"],
                ["C", countC -1 , "#5A3DAA"],
                ["D", countD , "#FFC880"]);

            } else if (correct == "D") {
              temp.push(["", "", { role: "style" }],
                ["A", countA , "#FFC880"],
                ["B", countB , "#FFC880"],
                ["C", countC , "#FFC880"],
                ["D", (countD - 1) , "#5A3DAA"]);
            }
          }
        }
        if (q == 0) {
          this.setState({ analysisdata0: temp.sort() });
        } else if (q == 1) {
          this.setState({ analysisdata1: temp.sort() });
        } else if (q == 2) {
          this.setState({ analysisdata2: temp.sort() });
        } else if (q == 3) {
          this.setState({ analysisdata3: temp.sort() });
        } else if (q == 4) {
          this.setState({ analysisdata4: temp.sort() });
        } else if (q == 5) {
          this.setState({ analysisdata5: temp.sort() });
        } else if (q == 6) {
          this.setState({ analysisdata6: temp.sort() });
        } else if (q == 7) {
          this.setState({ analysisdata7: temp.sort() });
        } else if (q == 8) {
          this.setState({ analysisdata8: temp.sort() });
        } else if (q == 9) {
          this.setState({ analysisdata9: temp.sort() });
        }
      }
    }
    );

  }


  render() {
    const { classes } = this.props;

    return (
      <div style={{ marginTop: 100 }}>

        {/* 下面是select跟title */}
        <div className={classes.SelectRoot}>

          <div className={classes.SelectTable}>
            <Typography class={classes.text} nowrap={true}>
              <a style={{ marginLeft: 35 }}>
                <NavLink activeClassName="active" to="/teach/classdetail" style={{ textDecoration: 'none', color: '#818181' }}>
                  {this.state.myclass}</NavLink>
                >></a>
              <NavLink activeClassName="active" to="/teach/classScore" style={{ textDecoration: 'none', color: '#818181' }}><a>考試分析</a></NavLink>>>
              <a style={{ color: '#FFBF5F' }}>{this.state.classname}</a>
              <a class={classes.textRight}>107學年</a>
            </Typography>
            <Divider variant="middle" />

            <Card className={classes.card}>
              <div className={classes.divflex}>
                <div style={{ marginTop: 20, marginLeft: 15 }}>
                <Button onClick={this.question}>
                <img src={Img} width="60"/></Button></div>
                <div><Chart chartType="BarChart" data={this.state.data} options={option} /></div>

              </div>
              </Card>

          </div>
        </div>

        {/* select跟title結束 */}
        <Dialog open={this.state.questionOpen} onClose={this.questionClose} aria-labelledby="form-dialog-title">
                {/* <DialogTitle id="form-dialog-title">
                  <a style={{
                    color: '#5A3DAA', fontFamily: "Microsoft JhengHei", letterSpacing: 4, fontWeight: "bold",
                    fontSize: 25
                  }}>更改密碼</a>
                </DialogTitle> */}

                <DialogContent style={{width:200,heigthL:80}}>
                  <div style={{display:'flex',height:15}}>
                  <div style={{width:25,height:15,backgroundColor:'#5A3DAA',marginLeft:20}}/>
                  <a style={{color:'#5A3DAA',fontFamily: "Microsoft JhengHei",letterSpacing:2,fontWeight: "bold",
              fontSize:14,marginLeft:10}}>正確答案</a></div>
                  {/* <DialogContentText>
                    <a style={{ fontFamily: "Microsoft JhengHei", letterSpacing: 2, fontWeight: "bold" }}>舊密碼</a>
                  </DialogContentText>
                  <TextField style={{ marginTop: 10, width: 300 }} autoFocus margin="dense" id="passwd" label="請輸入舊密碼"
                    type="password" fullWidth variant="outlined" /> */}
                </DialogContent>

                {/* <DialogContent>
                  <DialogContentText>
                    <a style={{ fontFamily: "Microsoft JhengHei", letterSpacing: 2, fontWeight: "bold" }}>更改密碼</a>
                  </DialogContentText>
                  <TextField style={{ width: 300 }} margin="dense" id="passwd" label="請輸入新密碼"
                    type="passwdnew" fullWidth variant="outlined" />
                </DialogContent>
                <DialogContent>
                  <TextField style={{ width: 300 }} margin="dense" id="passwd3" label="再次輸入新密碼"
                    type="password" fullWidth variant="outlined" />
                </DialogContent> */}

                <DialogActions>
                  <Button onClick={this.questionClose} color="primary">
                  <a style={{color:'#5A3DAA',fontFamily: "Microsoft JhengHei",letterSpacing:2,
              fontSize:14,marginLeft:10}}> 確定</a> </Button>
                </DialogActions>
              </Dialog>

        {/* 答題分析開始 */}
        <div className={classes.analysis}>
          <Card className={classes.analysisCard}>
            <Typography className={classes.analysistext}>1</Typography>
            <Chart chartType="ColumnChart" data={this.state.analysisdata0} options={analysisoption} />
          </Card>
          <Card className={classes.analysisCard}>
            <Typography className={classes.analysistext}>2</Typography>
            <Chart chartType="ColumnChart" data={this.state.analysisdata1} options={analysisoption} />
          </Card>
          <Card className={classes.analysisCard}>
            <Typography className={classes.analysistext}>3</Typography>
            <Chart chartType="ColumnChart" data={this.state.analysisdata2} options={analysisoption} />
          </Card>
          <Card className={classes.analysisCard}>
            <Typography className={classes.analysistext}>4</Typography>
            <Chart chartType="ColumnChart" data={this.state.analysisdata3} options={analysisoption} />
          </Card>
          <Card className={classes.analysisCard}>
            <Typography className={classes.analysistext}>5</Typography>
            <Chart chartType="ColumnChart" data={this.state.analysisdata4} options={analysisoption} />
          </Card>
          <Card className={classes.analysisCard}>
            <Typography className={classes.analysistext}>6</Typography>
            <Chart chartType="ColumnChart" data={this.state.analysisdata5} options={analysisoption} />
          </Card>
          <Card className={classes.analysisCard}>
            <Typography className={classes.analysistext}>7</Typography>
            <Chart chartType="ColumnChart" data={this.state.analysisdata6} options={analysisoption} />
          </Card>
          <Card className={classes.analysisCard}>
            <Typography className={classes.analysistext}>8</Typography>
            <Chart chartType="ColumnChart" data={this.state.analysisdata7} options={analysisoption} />
          </Card>
          <Card className={classes.analysisCard}>
            <Typography className={classes.analysistext}>9</Typography>
            <Chart chartType="ColumnChart" data={this.state.analysisdata8} options={analysisoption} />
          </Card>
          <Card className={classes.analysisCard}>
            <Typography className={classes.analysistext}>10</Typography>
            <Chart chartType="ColumnChart" data={this.state.analysisdata9} options={analysisoption} />
          </Card>
        </div>

      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
