import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/icons/TrendingFlatRounded'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import TeachButton from '@material-ui/icons/SpellcheckOutlined'
import HomeworkButton from '@material-ui/icons/EditOutlined'
import Airtable from 'airtable';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from 'antd';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TABLE_NAME = 'ClassDay';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);
const score_TABLE_NAME = 'TestScore';
const score_table = base(score_TABLE_NAME);
const record_TABLE_NAME = 'Schedule';
const record_table = base(record_TABLE_NAME);

//class name
function createData(class_id, class_time) {

    return { class_id, class_time };
}

//class score
let id = 0;
function ScoreData(date, range, average) {
    id += 1;
    return { id, date, range, average };
}

//class record
function RecordData(schedule1, schedule2) {

    return { schedule1, schedule2 };
}

const styles = {
    ////class name
    card: {
        //maxWidth: 345,
        height: 85,
        //width:'80%',
        marginTop: 30,
    },

    text: {
        color: '#5A3DAA',
        fontFamily: "Microsoft Jhenghei",
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
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
        marginTop: 18,
        marginLeft: 25,
        letterSpacing: 1,
    },
    divclass: {
        //backgroundColor:'red',
        //width:420
        width: 180
    },
    textrecord: {
        color: "#818181",
        fontFamily: "Microsoft Jhenghei",
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 35,
        //marginLeft:25
    },
    button: {
        marginTop: 10,
    },

    ////score css

    score_paper: {
        width: 570,
        marginTop: 40,
        overflowX: 'auto',
        //marginLeft:100,
        //marginRight:'5vw',
        marginBottom: 20,
    },
    score_root: {
        width: 500,
        marginTop: 15,
        overflowX: 'auto',
        marginLeft: 36,
        //marginRight:'5vw',
        marginBottom: 30,
    },
    score_table: {
        minWidth: 300,
    },
    score_button: {
        textDecoration: 'none',
        // boxShadow:'none',
        // textShadow:'none',
        // border:'none',
        // outline:'none',

    },
    score_title: {
        display: 'flex'
    },
    record_paper: {
        width: 270,
        height: 343,
        marginTop: 40,
        overflowX: 'auto',
        //marginLeft:100,
        //marginRight:'5vw',
        marginBottom: 20,
    },
    record_root: {
        width: 200,
        marginTop: 25,
        height: 230,
        overflowX: 'auto',
        marginLeft: 35,
        //marginRight:'5vw',
        //marginBottom:30,
    },
    record_table: {
        minWidth: 300,
    },
    record_button: {
        textDecoration: 'none',
        // boxShadow:'none',
        // textShadow:'none',
        // border:'none',
        // outline:'none',

    },
    record_title: {
        display: 'flex'
    },
    recordText: {
        color: '#5A3DAA',
        fontFamily: "Microsoft JhengHei",
        letterSpacing: 2,
        fontWeight: 'bold',
        textAlign: 'center',
    }
};

class classCard extends React.Component {
    state = {
        //name
        ClassData: [],
        dataInit: [],
        //class score
        score_classData: [],
        score_dataInit: [],
        score_rows: [],
        //record
        record_ClassData: [],
        record_dataInit: [],
        schedule_real: [],
        schedule1: [],
    };

    componentDidMount() {
        //const filterSentence = 'AND(class_id =' + this.props.location.myClassProps + ')';
        table.select({
            //filterByFormula: filterSentence,
            filterByFormula: 'AND(class_id = "國文C班")',
            view: "Grid view",
        }).eachPage((records, fetchNextPage) => {
            this.setState({ records });
            var temp = [];
            var temp2 = [];
            console.log(records);
            const class_id = this.state.records.map((record, index) => record.fields['class_id']);
            const class_day = this.state.records.map((record, index) => record.fields['class_day']);
            const class_start_time = this.state.records.map((record, index) => record.fields['class_start_time']);
            const class_end_time = this.state.records.map((record, index) => record.fields['class_end_time']);

            for (var index = 0; index < class_id.length; index++) {
                //temp.push(createData(class_id[index], class_day[index], class_start_time[index], class_end_time[index]));
                temp.push(createData(class_id), class_day[index] + class_start_time[index] + '-' + class_end_time[index]);
            }
            // for (var index = 0; index < class_id.length; index++) {
            //   //temp.push(createData(class_id[index], class_day[index], class_start_time[index], class_end_time[index]));
            //   temp2.push(createData(class_day[index] + class_start_time[index] + '-' + class_end_time[index]));
            // }
            // this.setState({
            //   date: reserve_date, region: reserve_address, time: reserve_time, class: reserve_class
            // });
            this.setState({ ClassData: temp });
            this.setState({ dataInit: temp });
            this.setState({ class_id: class_id[0] });
            this.setState({ class_time: class_day[0] + class_start_time[0] + '-' + class_end_time[0] });
            fetchNextPage();
        }
        );

        ///score
        score_table.select({
            filterByFormula: 'AND(class_id = "國文C班")',
            view: "Grid view"
        }).eachPage((records, fetchNextPage) => {
            this.setState({ records });
            console.log(records);
            const class_id = this.state.records.map((record, index) => record.fields['class_id']);
            const test_date = this.state.records.map((record, index) => record.fields['test_date']);
            const test_name = this.state.records.map((record, index) => record.fields['test_name']);
            const test_score = this.state.records.map((record, index) => record.fields['test_score'])
            var count = class_id.length;
            var temp = [];
            var temp2 = [];
            var temp3 = [];
            var split_testName = [];
            var split_date = [];
            var temp4 = [];
            // for (var index = 0; index < count; index++) {
            //   temp.push(test_date[index].split("-")[1]);
            // }

            //分考卷名稱
            for (var index = 0; index < count; index++) {
                split_testName.push(test_name[index]);
            }
            var testName = split_testName.filter(function (element, index, arr) {
                return arr.indexOf(element) === index;
            });
            //分日期
            for (var index = 0; index < count; index++) {
                split_date.push(test_date[index]);
            }
            var testDate = split_date.filter(function (element, index, arr) {
                return arr.indexOf(element) === index;
            });
            //
            for (var index = 0 ; index < 4; index++){
                console.log(testName[index]);
                var total = 0;
                var average;
                var num = 0;
                var newaverage;
                for (var x = 0 ; x < class_id.length ; x++){
                  if (testName[index] == test_name[x]){
                    if(test_score[x]<=100){
                    console.log(test_name[x]);
                    console.log(test_score[x]);
                    console.log(x,"x");
                    total += test_score[x];
                    num++;
                  }
                  }
                }
                  console.log(total+"total");
                  console.log(num);
                  average = total / num;
                  newaverage = average.toFixed(1);
                  //console.log(average);
                //console.log(total);
                temp4.push( ScoreData(testDate[index],testName[index],newaverage));
                console.log(testName[index],total,average);
              }
            //
            // var classResult = temp.filter(function (element, index, arr) {
            //     return arr.indexOf(element) === index;
            // });
            // console.log(classResult);
            // for (var index = 0; index < classResult.length; index++) {
            //     temp2.push(classResult[index]);
            // }

            // //table
            // for (var index = 0; index < 4; index++) {
            //     temp3.push(ScoreData(test_date[index], test_name[index], test_score[index]));
            // }
            this.setState({ score_rows: temp4 });
            this.setState({ score_dataInit: temp4 })

            this.setState({ score_classData: temp2 });
            fetchNextPage();
        }
        );
        ///score end
        //record
        record_table.select({
            filterByFormula: 'AND(class_id = "國文C班")',
            view: "Grid view",
        }).eachPage((records, fetchNextPage) => {
            this.setState({ records });
            var temp = [];
            console.log(records);
            const class_id = this.state.records.map((record, index) => record.fields['class_id']);
            const schedule_real = this.state.records.map((record, index) => record.fields['schedule_real']);

            for (var index = 0; index < class_id.length; index++) {
                //temp.push(createData(class_id[index], class_day[index], class_start_time[index], class_end_time[index]));
                //temp.push(createData(schedule_real[index].split("=")[0]));
            }
            this.setState({ record_ClassData: temp });
            this.setState({ record_dataInit: temp });
            this.setState({ schedule1: schedule_real[0].split(" ")[0] });
            this.setState({ schedule2: schedule_real[0].split(" ")[1] });
            //this.setState({ class_time : temp2});
            fetchNextPage();
        }
        );
        //record end
    }

    render() {
        const { classes } = this.props;
        return (
            // 最外面的div
            <div style={{ marginTop: 120, marginLeft: 80, width: 870 }}> {/*class name*/}
                <div align="center">
                    <Card className={classes.card}>
                        <div>
                            <div className={classes.div1}>
                                <div className={classes.divclass}>
                                    <CardContent><Typography className={classes.text}>
                                        {this.state.class_id}

                                    </Typography></CardContent>
                                </div>
                                <div>
                                    <CardContent><div>
                                        <Typography className={classes.textdetail}>{this.state.class_time}</Typography></div>
                                    </CardContent>
                                </div>
                                <div>
                                    <CardContent><div>
                                        <Typography className={classes.textdetail}>台北校區 11樓</Typography>
                                    </div>
                                    </CardContent>
                                </div>

                                <div>
                                    <CardContent>
                                        <Typography className={classes.textrecord}>
                                            <NavLink style={{ textDecoration: 'none', color: '#818181' }} activeClassName='active' to='/teach/classScore'>
                                                <HomeworkButton style={{ marginLeft: 70, height: 20 }} />考試紀錄</NavLink>
                                            <NavLink style={{ textDecoration: 'none', color: '#818181' }} activeClassName='active' to='/teach/teachrecord'>
                                                <TeachButton style={{ marginLeft: 20 }} />教學紀錄</NavLink>
                                        </Typography>

                                    </CardContent>
                                </div>

                            </div>
                        </div>
                    </Card>

                </div> {/*class name end*/}
                <div style={{ display: 'flex' }}> {/*score and record*/}
                    <Paper className={classes.score_paper}>
                        <div className={classes.score_title}>
                            <Typography style={{
                                color: '#969696', fontFamily: "Microsoft JhengHei", letterSpacing: 3, fontSize: 18,
                                fontWeight: 'bold', marginLeft: 32, marginTop: 15
                            }}>考試平均</Typography>
                            <NavLink style={{ textDecoration: 'none', color: '#818181' }} activeClassName='active' to='/teach/classScore'>
                                <IconButton style={{ marginLeft: 400 }}><Button /></IconButton></NavLink>
                        </div>
                        <Paper className={classes.score_root}>

                            <Table className={classes.score_table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{
                                            color: '#969696', fontFamily: "Microsoft JhengHei",
                                            letterSpacing: 4, fontSize: 15, fontWeight: "bold"
                                        }}>日期</TableCell>
                                        <TableCell align="center" style={{
                                            color: '#969696', fontFamily: "Microsoft JhengHei",
                                            letterSpacing: 4, fontSize: 15, fontWeight: "bold"
                                        }}>考試範圍</TableCell>
                                        <TableCell align="center" style={{
                                            color: '#969696', fontFamily: "Microsoft JhengHei",
                                            letterSpacing: 4, fontSize: 15, fontWeight: "bold"
                                        }}>考試平均</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.score_rows.map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell align="center" style={{
                                                color: '#969696', fontFamily: "Microsoft JhengHei",
                                                fontSize: 15
                                            }}>{row.date}</TableCell>
                                            <TableCell align="center" style={{
                                                color: '#969696', fontFamily: "Microsoft JhengHei",
                                                fontSize: 15
                                            }}>{row.range}</TableCell>
                                            <TableCell align="center" style={{
                                                color: '#5A3DAA', fontFamily: "Microsoft JhengHei",
                                                fontSize: 15, fontWeight: "bold"
                                            }}>{row.average}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Paper>

                    <div style={{ marginLeft: 30 }}> {/*record*/}
                        <Paper className={classes.record_paper}>
                            <div className={classes.record_title}>
                                <Typography style={{
                                    color: '#969696', fontFamily: "Microsoft JhengHei", letterSpacing: 4, fontSize: 18,
                                    fontWeight: 'bold', marginLeft: 32, marginTop: 15
                                }}>上週教學進度</Typography>
                                <NavLink style={{ textDecoration: 'none', color: '#818181' }} activeClassName='active' to='/teach/teachrecord'>
                                    <IconButton style={{ marginLeft: 55 }}><Button /></IconButton>
                                </NavLink>
                            </div>
                            <Paper className={classes.record_root}>
                                <div>
                                    <Typography className={classes.recordText} style={{ fontSize: 21, marginTop: 15, marginTop: 55, marginBottom: 55 }}>
                                        {/* 數學講義(一) */}
                                        {this.state.schedule1}</Typography>
                                </div>
                                <Divider variant="middle" />
                                <Typography className={classes.recordText} style={{ fontSize: 18, marginTop: 40, marginTop: 25 }}>
                                    {/* p.50~80 */}
                                    {this.state.schedule2}
                                </Typography>
                            </Paper>
                        </Paper>
                    </div>
                </div> {/*score and record end*/}


            </div>
            //   最外面的div
        );
    }
}

classCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(classCard);