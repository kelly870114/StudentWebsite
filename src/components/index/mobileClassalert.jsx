import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Airtable from 'airtable';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';

const TABLE_NAME = 'ReserveStudent';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);

let id = 0;
function createData(date, time, area, className) {
  id += 1;
  return { id, date, time, area, className};
}

const styles = {
  card: {
    //maxWidth: 345,
    height: 70,
    marginBottom:10,
  },

  // card2: {
  //   //maxWidth: 345,
  //   height: 75,
  //   marginTop: 30,
  // },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  typocss: {
      fontFamily: "Segoe UI",
      fontSize: 15,
      color: "#818181",
      fontWeight: 'bold',
  },
  typocss2: {
    fontFamily: "Segoe UI",
    color: "#818181",
    fontWeight: 'regular',
    fontSize: 12,
    marginTop: -10,
    marginLeft: 4,
   },
   typocss3: {
    fontFamily: "Microsoft Jhenghei",
    fontSize: 20,
    color: "#FFBF5F",
    fontWeight: 'bold',
    marginTop:8,
},
   div1:{
    position:"absolute",
    display: "inline",
    display: 'flex',
  },
  div2:{
      marginLeft:100,
  }
//    divider:{
//     borderLeft: 6,
//     height: 500,
//    },
};
class ClickCard extends React.Component{
  state={
    reserveData:[],
  }
  componentMount(){
    const filterSentence = 'AND(student_id =' + this.props.UserId + ')';
    table.select({
    filterByFormula: filterSentence,
    view: "Grid view",
    maxRecords: 3,
    }).eachPage((records, fetchNextPage) => {

      const reserve_date = records.map((record, index) => record.fields['reserve_date']);
      const reserve_address = records.map((record, index) => record.fields['reserve_address']);
      const reserve_time = records.map((record, index) => record.fields['reserve_time']);
      const reserve_class = records.map((record, index) => record.fields['reserve_class']);

      var temp=[];
      for(var index = 0; index < reserve_class.length; index++) {
        temp.push(createData(reserve_date[index].split("-")[1] + "/" + reserve_date[index].split("-")[2], 
        reserve_time[index], reserve_address[index], reserve_class[index].split(" ")[0]));
      }
    
      this.setState({ reserveData : temp });
      fetchNextPage(); 
    }
    );
  
}

  componentDidUpdate(prevProps){
    if (this.props.UserId !== prevProps.UserId) {
      const filterSentence = 'AND(student_id =' + this.props.UserId + ')';
      table.select({
      filterByFormula: filterSentence,
      view: "Grid view",
      maxRecords: 3,
      }).eachPage((records, fetchNextPage) => {

        const reserve_date = records.map((record, index) => record.fields['reserve_date']);
        const reserve_address = records.map((record, index) => record.fields['reserve_address']);
        const reserve_time = records.map((record, index) => record.fields['reserve_time']);
        const reserve_class = records.map((record, index) => record.fields['reserve_class']);

        var temp=[];
        for(var index = 0; index < reserve_class.length; index++) {
          temp.push(createData(reserve_date[index].split("-")[1] + "/" + reserve_date[index].split("-")[2], 
          reserve_time[index], reserve_address[index], reserve_class[index].split(" ")[0]));
        }
      
        this.setState({ reserveData : temp });
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

        const reserve_date = records.map((record, index) => record.fields['reserve_date']);
        const reserve_address = records.map((record, index) => record.fields['reserve_address']);
        const reserve_time = records.map((record, index) => record.fields['reserve_time']);
        const reserve_class = records.map((record, index) => record.fields['reserve_class']);

        var temp=[];
        for(var index = 0; index < reserve_class.length; index++) {
          temp.push(createData(reserve_date[index].split("-")[1] + "/" + reserve_date[index].split("-")[2], 
          reserve_time[index], reserve_address[index], reserve_class[index].split(" ")[0]));
        }
      
        this.setState({ reserveData : temp });
        fetchNextPage(); 
      }
      );
  }

  render(){
    const { classes } = this.props;

    const ReserveCard =({date, time, area, className}) => (

      <Card className={classes.card}>
      <div>
      < CardActionArea>
          <div className={classes.div1}> 
          <div>
          <CardContent>
              <Typography className={classes.typocss}>
                {date}
              </Typography>
              <br></br>
              <Typography className={classes.typocss2}>
                  {time}
              </Typography>
          </CardContent>
          </div>
          <div>
          <CardContent>
              <div className={classes.div1}>
              <Typography className={classes.typocss3}>{area}</Typography>
              </div>
              <div className={classes.div2}>
              <Typography className={classes.typocss3}>{className}</Typography>
              </div>
          </CardContent>
          </div>
          </div>
        </CardActionArea>
        </div>
      </Card> 


    );

    return (
      // Card1
    <div>
      {this.state.reserveData.map(reserve => <ReserveCard {...reserve} /> )}
      {/* <Card className={classes.card}>
    <div>
      < CardActionArea>
          <div className={classes.div1}> 
          <div>
          <CardContent>
              <Typography className={classes.typocss}>
                11/20
              </Typography>
              <br></br>
              <Typography className={classes.typocss2}>
                  12:20
              </Typography>
          </CardContent>
          </div>
          <div>
          <CardContent>
              <div className={classes.div1}>
              <Typography className={classes.typocss3}>古亭校區</Typography>
              </div>
              <div className={classes.div2}>
              <Typography className={classes.typocss3}>國文C班</Typography>
              </div>
          </CardContent>
          </div>
          </div>
        </CardActionArea>
        </div>
      </Card>     */}
    </div>
  );
  }
}

// function ClickCard(props) {
//   const { classes } = props;
//   return (
//     // Card1
//     <div>
//     <Card className={classes.card}>
//    <div>
//       <CardActionArea>
//         <div className={classes.div1}> 
//         <div>
//         <CardContent>
//             <Typography className={classes.typocss}>
//                 11/20
//             </Typography>
//             <br></br>
//             <Typography className={classes.typocss2}>
//                 12:20
//             </Typography>
//         </CardContent>
//         </div>
//         <div>
//         <CardContent>
//             <div className={classes.div1}>
//             <Typography className={classes.typocss3}>古亭校區</Typography>
//             </div>
//             <div className={classes.div2}>
//             <Typography className={classes.typocss3}>國文C班</Typography>
//             </div>
//         </CardContent>
//         </div>
//         </div>
//       </CardActionArea>
//       </div>
//     </Card>


//     {/* Card2 */}
//     <Card className={classes.card2}>
//    <div>
//       <CardActionArea>
//         <div className={classes.div1}> 
//         <div>
//         <CardContent>
//             <Typography className={classes.typocss}>
//                 11/20
//             </Typography>
//             <br></br>
//             <Typography className={classes.typocss2}>
//                 12:20
//             </Typography>
//         </CardContent>
//         </div>
//         <div>
//         <CardContent>
//             <div className={classes.div1}>
//             <Typography className={classes.typocss3}>古亭校區</Typography>
//             </div>
//             <div className={classes.div2}>
//             <Typography className={classes.typocss3}>國文C班</Typography>
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

ClickCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClickCard);