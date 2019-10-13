import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
import orange from '@material-ui/core/colors/orange';
import purple from '@material-ui/core/colors/purple';
import Arrowright from '@material-ui/icons/ArrowRightAltRounded';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { FormControl, FormHelperText, Divider } from '@material-ui/core';
import { isNullOrUndefined } from 'util';
import HomeTable from './hometable';

const styles = {
  card: {
    //maxWidth: 345,
    //minWidth: '70vw',
    marginLeft: 40,
    //marginRight: 40,
    marginTop: 50,
    marginBottom: 100,
    width: "55vw",
    height: "400",
    //overflowX:'scroll',
    
  },
  
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  logocss: {
    marginLeft: 250,
    marginRight: 250,
  },
  margin: {
    //margin: theme.spacing.unit,
    alignItems: 'center',
    marginLeft: 400,
  },
  cssLabel: {
    '&$cssFocused': {
      color: orange[300],
    },
  },
  cssFocused: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: orange[300],
    },
  },
  notchedOutline: {},
  typetestcss:{
    fontSize: 18,
    color: "#969696",
    fontWeight: "bold",
    fontFamily: "Microsoft JhengHei",
    marginLeft: 20,
    marginTop: 10,
  },
  buttonmore:{
    marginLeft: 600,
    marginRight: 10,
    color: "#B9B9B9",
  },
  div1:{
    display: 'flex',
    
  },
  datetypecss:{
    fontSize: 18,
    color: "#969696",
    fontWeight: "regular",
    fontFamily: "Microsoft JHengHei",
    marginTop: 10,
  },
  scoretypecss:{
    fontSize: 50,
    color: "#FFBF5F",
    fontWeight: "bold",
    fontFamily: "Microsoft JHengHei",
    marginTop: 10,
  },
  classtypecss:{
    fontSize: 25,
    color: "#969696",
    fontWeight: "regular",
    fontFamily: "Microsoft JHengHei",
    marginTop: 10,
  },
};

function ImgMediaCard(props) {
  const { classes } = props;
  return (
    <div>
    <Card className={classes.card} >
    {/* big card */}
     
      <CardHeader
          // action={
          //   <IconButton>
          //     <Arrowright/>
          //   </IconButton>
          // }
          className={classes.typetestcss}
          title={<a style={{fontSize:20,fontWeight: "bold",fontFamily: "Microsoft JhengHei",
            letterSpacing:4,color:'#6C6C6C'}}>作業提醒</a>}
        />

        <HomeTable UserId={props.UserId}/>
      
    
    </Card>
    </div>
    
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);