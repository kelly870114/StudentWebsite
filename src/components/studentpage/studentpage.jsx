import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormControl, FormHelperText, Divider } from '@material-ui/core';
import { isNullOrUndefined } from 'util';
import ProfileCard from './profilecard.jsx';
import CouseCard from './coursescard.jsx';
import coursescard from './coursescard.jsx';

const styles = {
  margin: {
    //margin: theme.spacing.unit,
    alignItems: 'center',
    marginLeft: 400,
  },
  
  wrap:{
  display: 'flex',
  flexwrap: 'nowrap',
  },
};

function ImgMediaCard(props) {
  const { classes } = props;
  return (
    <div>
      <div className={classes.wrap}>
      <div>
        <ProfileCard UserId={props.UserId}/>
      </div>
      <div>
        <CouseCard UserId={props.UserId}/>
      </div>
      
      
        {/* <div>
          <TestCard/>
          <HomeworkCard/>
        </div>
        <div>
          <AlertCard/>
        </div>    */}
      </div>
           
    </div>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);