import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import red from '@material-ui/core/colors/red';
import deeppurple from '@material-ui/core/colors/deepPurple';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import Divder from '@material-ui/core/Divider';
import Divider from '@material-ui/core/Divider';
import Airtable from 'airtable';

const TABLE_NAME = 'TestScore';
const TABLE_NAME_ATTEND = 'Attend';
const TABLE_NAME_STU = 'Student';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);
const tableAttend = base(TABLE_NAME_ATTEND);
const tableStudent = base(TABLE_NAME_STU);


const variantIcon = {
    gradealert: ErrorIcon,
    classalert: ErrorIcon,
};

const styles1 = theme => ({
    gradealert: {
        backgroundColor: red[500],
      },  
    classalert: {
        backgroundColor: deeppurple[500],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      // action={[
      //   <IconButton
      //     key="close"
      //     aria-label="Close"
      //     color="inherit"
      //     className={classes.close}
      //     onClick={onClose}
      //   >
      //     <CloseIcon className={classes.icon} />
      //   </IconButton>,
      // ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['gradealert', 'classalert']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
    fontFamily: 'Microsoft JhengHei',
    fontSize: 14,
  },
  divider:{
      marginTop:30,
      marginBottom: 0,
  }
});

function createData(class_id) {
  // class_id = class_id.split("");
  // console.log(class_id.length);
  // for(var i = 0 ; i < class_id.length; i ++){
  //   class_id += (class_id[i] + " ");
  // }
  // console.log(class_id);
  class_id = "成 績 預 警 : " + class_id; 
  return { class_id };
}

function createAttendData(class_id, attend_date) {
  // class_id = class_id.split("");
  // console.log(class_id.length);
  // for(var i = 0 ; i < class_id.length; i ++){
  //   class_id += (class_id[i] + " ");
  // }
  // console.log(class_id);
  var attend_month = attend_date.split("-");
  //class_id = "缺 課 預 警 : " + attend_date + " " + class_id; 
  class_id = "缺 課 預 警 : " + attend_month[1] + "-" + attend_month[2] + " " + class_id; 
  return { class_id };
}

class CustomizedSnackbars extends React.Component {
  state = {
    open: false,
    userData:[],
    attendData:[],
  };

  // shouldComponentUpdate(nextProps) {
  //   if (this.props.UserId !== nextProps.UserId) {
  //     console.log("in true");
  //     return true;
  //   }
  //     return false;
  //  }

  componentDidUpdate(prevProps){
      if (this.props.UserId !== prevProps.UserId) {
        const filterSentence = 'AND(student_id =' + this.props.UserId + ')';
        console.log(filterSentence);
        table.select({
          filterByFormula: filterSentence,
          view: "Grid view",
          //maxRecords: 3,
          }).eachPage((records, fetchNextPage) => {  
            const class_id = records.map((record, index) => record.fields['class_id']);
            const test_score = records.map((record, index) => record.fields['test_score']);
    
            var temp=[];
            for(var index = 0; index < test_score.length; index++) {
              if(test_score[index] < 60){
                temp.push(createData(class_id[index]));
              }
              
            }
            this.setState({ userData : temp });
            fetchNextPage(); 
          }
          );
    
          tableAttend.select({
            
            filterByFormula: filterSentence,
            view: "Grid view",
            //maxRecords: 3,
            }).eachPage((records, fetchNextPage) => {  
              const class_id = records.map((record, index) => record.fields['class_id']);
              const attend_true = records.map((record, index) => record.fields['attend_true']);
              const attend_date = records.map((record, index) => record.fields['attend_date']);
              var temp=[];
              for(var index = 0; index < attend_true.length; index++) {
                if(attend_true[index] != true){
                  temp.push(createAttendData(class_id[index],attend_date[index]));
                }
              }
              this.setState({ attendData : temp });
              fetchNextPage(); 
            }
            );
        
    }      
  }
  componentDidMount(){
  //componentDidUpdate(prevProps){
    //if (this.props.UserId !== prevProps.UserId) {
      const filterSentence = 'AND(student_id =' + this.props.UserId + ')';
      console.log(filterSentence);
      table.select({
        filterByFormula: filterSentence,
        view: "Grid view",
        //maxRecords: 3,
        }).eachPage((records, fetchNextPage) => {  
          const class_id = records.map((record, index) => record.fields['class_id']);
          const test_score = records.map((record, index) => record.fields['test_score']);
  
          var temp=[];
          for(var index = 0; index < test_score.length; index++) {
            if(test_score[index] < 60){
              temp.push(createData(class_id[index]));
            }
            
          }
          this.setState({ userData : temp });
          fetchNextPage(); 
        }
        );
  
        tableAttend.select({
          
          filterByFormula: filterSentence,
          view: "Grid view",
          //maxRecords: 3,
          }).eachPage((records, fetchNextPage) => {  
            const class_id = records.map((record, index) => record.fields['class_id']);
            const attend_true = records.map((record, index) => record.fields['attend_true']);
            const attend_date = records.map((record, index) => record.fields['attend_date']);
            var temp=[];
            for(var index = 0; index < attend_true.length; index++) {
              if(attend_true[index] != true){
                temp.push(createAttendData(class_id[index],attend_date[index]));
              }
            }
            this.setState({ attendData : temp });
            fetchNextPage(); 
          }
          );
      
  //}      
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    console.log(this.props.UserId);
    const { classes } = this.props;
    const ClassCard =({class_id}) => (
     <MySnackbarContentWrapper
      variant="gradealert"
      className={classes.margin}
      message={class_id}
      /> 
    );
    const AttendCard =({class_id, attend_date}) => (
      <MySnackbarContentWrapper
       variant="classalert"
       className={classes.margin}
       message={class_id}
       /> 
     );
    
    return (
      <div>
        <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          {/* <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="This is a success message!"
          /> */}
        </Snackbar>
        {this.state.userData.map(score => <ClassCard {...score} /> )}
        {this.state.attendData.map(absent => <AttendCard {...absent} /> )}
        {/* <MySnackbarContentWrapper
          variant="gradealert"
          className={classes.margin}
          message=" 成 績 預 警 : 物 理 A 班"
        /> */}

        {/* <MySnackbarContentWrapper
          variant="classalert"
          className={classes.margin}
          message=" 缺 課 預 警 : 物 理 A 班"
        /> */}
        </div>
        <Divider className={classes.divider}/>
        <div>
            
        </div>
      </div>
    );
  }
}

CustomizedSnackbars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(CustomizedSnackbars);