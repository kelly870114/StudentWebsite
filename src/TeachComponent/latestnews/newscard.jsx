import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Airtable from 'airtable';

const TABLE_NAME = 'Announcement';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);

let counter = 0;
let counter2 = 0;
//let counter3 = 0;
function createData(title, subheader, content, button) {
  counter += 1;
  //button = 
  return { title, subheader, content};
}
function createData2(title2, subheader2, content2) {
  counter2 += 1;
  return { title2, subheader2, content2};
}
// function createData3(button){
//   counter3 += 1;
//   return {button};
// }

const styles = theme => ({
  card: {
    maxWidth: 400,
    fontFamily: 'Microsoft JhengHei',
  },
  card2: {
    marginLeft: 50,
    maxWidth: 400,
    fontFamily: 'Microsoft JhengHei',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  
  margin: {
      marginTop: 50,
      marginBottom: 10,
      marginLeft: 40,
      display:'flex',
  },
  width: {
      width: 500,
      fontFamily: 'Microsoft JhengHei', 
  },
  typo:{
    fontFamily: 'Microsoft JhengHei',
    width: 350,
    marginLeft:10,
  },

  headtypo:{
    fontFamily: 'Microsoft JhengHei',
    fontWeight: 'bold',
  },
  
});

class RecipeReviewCard extends React.Component {
  state = { expanded2: false };
  state = { expanded : false};
  state = {
    announceData:[],
    announceData2:[],
    buttonData:[],
    // title: '',
    // subheader: '',
    // content: '',
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleExpandClick2 = () => {
    this.setState(state => ({ expanded2: !state.expanded2 }));
  };

  componentDidMount(){
    table.select({
        view: "Grid view",
        }).eachPage((records, fetchNextPage) => {  
            const announce_title = records.map((record, index) => record.fields['announce_title']);
            const announce_body = records.map((record, index) => record.fields['announce_body']);
            const announce_date = records.map((record, index) => record.fields['announce_date']);
            const announce_title2 = records.map((record, index) => record.fields['announce_title']);
            const announce_body2 = records.map((record, index) => record.fields['announce_body']);
            const announce_date2 = records.map((record, index) => record.fields['announce_date']);
            
            //const test_score = records.map((record, index) => record.fields['test_score']);
  
          var temp=[];
          var temp2=[];
          
          for(var index = 0; index < announce_title.length; index++) {
            
            if(index % 2 == 0){
              temp.push(createData(announce_title[index], announce_date[index], announce_body[index],));
            }
            else{
              temp2.push(createData2(announce_title2[index],announce_date2[index],announce_body2[index]))
            }            
          }
          this.setState({ announceData : temp , announceData2 : temp2 });
          fetchNextPage(); 
        }
        );

  }

  render() {
    const { classes } = this.props;
    const CardHead =({title,subheader,content}) =>(
      <div className={classes.margin}>
        <Card className={classes.card}>
        <CardHeader
        className={classes.width}
        classes={{
          title: classes.headtypo,
        }}
          title={title}
          subheader={subheader}
        />
        {/* <CardActions className={classes.actions}>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions> */}
        {/* <Collapse in={this.state.expanded} timeout="auto" unmountOnExit> */}
          <CardContent className={classes.width}>
            <Typography paragraph className={classes.typo}>
            {content}
            </Typography>
          </CardContent>
        {/* </Collapse> */}
      </Card>
      </div>
    );

    const CardHead2 =({title2,subheader2,content2}) =>(
      <div className={classes.margin}>
        <Card className={classes.card}>
        <CardHeader
        className={classes.width}
        classes={{
          title: classes.headtypo,
        }}
          title={title2}
          subheader={subheader2}
        />
        {/* <CardActions className={classes.actions} >
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded2,
            })}
            onClick={this.handleExpandClick2}
            aria-expanded={this.state.expanded2}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions> */}
        {/* <Collapse in={this.state.expanded2} timeout="auto" unmountOnExit> */}
          <CardContent className={classes.width}> 
            <Typography paragraph className={classes.typo}>
            {content2}
            </Typography>
          </CardContent>
        {/* </Collapse> */}
      </Card>
      </div>
    );

    return (
    <div className={classes.margin}>
    
    <div>
        {this.state.announceData.map(score => <CardHead {...score} /> )}
      </div>

      <div>
        {this.state.announceData2.map(score2 => <CardHead2 {...score2} /> )}  
      </div>
      </div>
      
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);