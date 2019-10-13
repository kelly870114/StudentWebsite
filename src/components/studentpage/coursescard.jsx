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
import Airtable from 'airtable';


//const TABLE_NAME = 'ClassMember';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const tableR = base('ClassRoom');
const tableD = base('ClassDay');


const styles = {
  card: {
    //maxWidth: 345,
    //minWidth: '70vw',
    marginLeft: 60,
    //marginRight: 40,
    marginTop: 100,
    marginBottom: 100,
    width: "45vw",
    height: 600,
    overflowX:'auto',
    overflowY:'auto',
  },

  coursecard:{
    fontSize: 18,
    color: "#5E5E5E",
    fontWeight: "bold",
    fontFamily: "Microsoft JhengHei",
    marginLeft: 50,
    marginTop: 50,
  },
  
  div1:{
    display: 'flex',
    
  },

  cousecard:{
    width:'35vw',
    height: 95,
    margin: 'auto',
    marginTop: 40,
    overflowX:'auto',
    overflowY:'auto',
  },

  classtypecss:{
    fontSize: 30,
    color: "#FFBF5F",
    fontWeight: "bold",
    fontFamily: "Microsoft JHengHei",
    marginTop: 25,
    marginLeft: 55,
  },

  timecss:{
    fontSize: 14,
    color: "#808080",
    fontWeight: "regular",
    fontFamily: "Microsoft JHengHei",
    marginTop: 25,
    marginLeft: 60,
  },

  regioncss:{
    fontSize: 14,
    color: "#808080",
    fontWeight: "regular",
    fontFamily: "Microsoft JHengHei",
    marginTop: 0,
    marginLeft: 60,
  }
  
  
};

function createData(class_id, class_day, classroom_place,class_start_time, class_end_time) {
  class_day = class_day + " " +class_start_time + " - " + class_end_time;

  return { class_id, class_day, classroom_place};
}

class ImgMediaCard extends React.Component {
  state = {
    // class_id:'',
    // class_day:'',
    // class_start_time:'',
    // class_end_time:'',
    // classroom_id:'',
    // classroom_place:'',
    // classroom_id_link:'',
    stu_class_data:[],
  };

  componentDidMount() {
    //https://chinarajames.com/airtable-api-linked-records/
    //const filterSentence = 'OR(student_id=' + this.props.UserId + ')';
    const filterSentence = 'OR(FIND("' + this.props.UserId + '", student_id) > 0)' ;
    console.log(filterSentence);
    //classDay
    tableD.select({
      view: "Grid view",
      filterByFormula: filterSentence
      //maxRecords: 1
      }).eachPage((records, fetchNextPage) => {
        this.setState({records});
        const classroom_id_link = this.state.records.map((record, index) => record.fields['classroom_id_link']);
        const class_id = this.state.records.map((record, index) => record.fields['class_id']);
        const class_day = this.state.records.map((record, index) => record.fields['class_day']);
        const class_start_time = this.state.records.map((record, index) => record.fields['class_start_time']);
        const class_end_time = this.state.records.map((record, index) => record.fields['class_end_time']);


        var temp=[];
        var count = classroom_id_link.length;
        for(var index = 0; index < count; index++){
          const record_id = classroom_id_link[index];
          const class_idR = class_id[index];
          const class_dayR = class_day[index];
          const class_start_timeR = class_start_time[index];
          const class_end_timeR = class_end_time[index];
          //let classroom_place;

          tableR.find(record_id, (err, record) => {
            if (err) {
              console.error(err)
              return
            }
            const classroom_place = record.fields['classroom_place'];
            temp.push(createData(class_idR,class_dayR,classroom_place, class_start_timeR, class_end_timeR));
            //console.log(temp);

          })
          //temp.push(createData(class_id[index],class_day[index],classroom_place));
          //const classroom_place = this.state.record.map((record, index) => record.fields['classroom_place']);

        }
        this.setState({ stu_class_data : temp });
        console.log(this.state.stu_class_data);
        fetchNextPage(); 
      }
      );
  }
  
  render(props){
    const { classes } = this.props;
    const { stu_class_data } = this.state;

    return (
      <div>
      <Card className={classes.card} >
  
          <Typography className={classes.coursecard}>學生課程</Typography>
          {/* {this.state.stu_class_data.map(score => <ClassCard {...score} /> )} */}
          {(this.state.stu_class_data)
                .map((n,index) => {
                  return (
                    <Card  key={n.class_id} className={classes.cousecard}>
                    <div className={classes.div1}>
                        <div>
                            <Typography className={classes.classtypecss}>{n.class_id}</Typography>
                        </div>
                        <div>
                            <Typography className={classes.timecss}>{n.class_day}</Typography>
                            <Typography className={classes.regioncss}>{n.classroom_place}</Typography>
                        </div>
                    </div>
                </Card>
                
                  );
                })}
          {/* {this.state.stu_class_data.map(course => <ClassCard {...course} /> )} */}

          <Card className={classes.cousecard}>
             <div className={classes.div1}>
                 <div>
                     <Typography className={classes.classtypecss}>國文C班</Typography>
                </div>
                 <div>
                     <Typography className={classes.timecss}>星期四 21:00 - 22:00</Typography>
                     <Typography className={classes.regioncss}>台北校區 11樓</Typography>
                 </div>
             </div>
          </Card>
          <Card className={classes.cousecard}>
             <div className={classes.div1}>
                 <div>
                     <Typography className={classes.classtypecss}>英文A班</Typography>
                </div>
                 <div>
                     <Typography className={classes.timecss}>星期五 21:00 - 22:00</Typography>
                     <Typography className={classes.regioncss}>台北校區 11樓</Typography>
                 </div>
             </div>
          </Card>
      
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

//         <Typography className={classes.coursecard}>學生課程</Typography>
    
//         <Card className={classes.cousecard}>
//             <div className={classes.div1}>
//                 <div>
//                     <Typography className={classes.classtypecss}>數 學 A 班</Typography>
//                 </div>
//                 <div>
//                     <Typography className={classes.timecss}>每 周 三 21:00 - 22:00</Typography>
//                     <Typography className={classes.regioncss}>台北校區 11樓</Typography>
//                 </div>
//             </div>
           
//         </Card>

//         <Card className={classes.cousecard}>
//             <div className={classes.div1}>
//                 <div>
//                     <Typography className={classes.classtypecss}>數 學 A 班</Typography>
//                 </div>
//                 <div>
//                     <Typography className={classes.timecss}>每 周 三 21:00 - 22:00</Typography>
//                     <Typography className={classes.regioncss}>台北校區 11樓</Typography>
//                 </div>
//             </div>
           
//         </Card>
//     </Card>
//     </div>
    
//   );
// }

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);