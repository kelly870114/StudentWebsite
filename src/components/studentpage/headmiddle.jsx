import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import image from './images/doris.jpg';

const styles = {
  avatar: {
    margin: 10,
    margintTop: 40,
  },
  bigAvatar: {
    marginTop: 40,
    margin: 10,
    width: 60,
    height: 60,
  },
};

// function ImageAvatars(props) {
//   const { classes } = props;
//   console.log( this.props.listNameFromParent );
//   return (
//     <Grid container justify="center" alignItems="center">
//       {/* <Avatar src={image} className={classes.avatar} /> */}
//       <Avatar src={image} className={classes.bigAvatar} />
//     </Grid>
//   );
// }

class ImageAvatars extends React.Component {
  render(props){

    //console.log( this.props.ImgFromParent );
    const { classes } = this.props;
    
    return ( 
      <Grid container justify="center" alignItems="center">
      {/* <Avatar src={image} className={classes.avatar} /> */}
      <Avatar src={this.props.ImgFromParent} className={classes.bigAvatar} />
      </Grid>
   );
  }
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);