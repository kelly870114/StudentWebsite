import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import image from './image/giny.jpg';

const styles = {
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
};

// function ImageAvatars(props) {
//   const { classes } = props;
//   return (
//     <Grid container justify="center" alignItems="center">
//       <Avatar src={image} className={classes.avatar} />
//       {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.bigAvatar} /> */}
//     </Grid>
//   );
// }

// ImageAvatars.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(ImageAvatars);

//var StuImage = {};
class ImageAvatars extends React.Component {
  state = {
    studentData: [],
  };
  componentDidMount() {
    fetch('https://api.airtable.com/v0/appcXtOTPnE4QWIIt/ImgTest?api_key=keyA7EKdngjou4Dgy')
    .then((resp) => resp.json())
    .then(data => {
       this.setState({ studentData: data.records });
    }).catch(err => {
      // Error 🙁
    });
  }
  render(props){


    const { classes } = this.props;
    const Student = ({student_img}) => (
      <Avatar src={student_img[0].url} className={classes.avatar} />
   );
    
    return (
      <Grid container justify="center" alignItems="center">
        {this.state.studentData.map(stud => <Student {...stud.fields} /> )}
        {/* <Avatar src={studentData.fields.student_img[0].url} className={classes.avatar} /> */}
      </Grid>
   );
  }
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);