import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import orange from '@material-ui/core/colors/orange';
import purple from '@material-ui/core/colors/purple';
import Arrowright from '@material-ui/icons/ArrowRightAltRounded';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { FormControl, FormHelperText, Divider, CardContent } from '@material-ui/core';
import { isNullOrUndefined } from 'util';
import HomeTable from './hometable.jsx';
import Alertsnack from './alertsnackbar.jsx';
import Classalert from './classalert.jsx';

const styles = {
  card: {
    //maxWidth: 345,
    //minWidth: '70vw',
    marginLeft: 30,
    //marginRight: 40,
    marginTop: 100,
    //marginBottom: 100,
    width: "28vw",
    height: 697,
    overflowX:'scroll',
    overflowY:'scroll',
    
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
    fontFamily: "Microsoft JhengHei",
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
          className={classes.typetestcss}
          title={<a style={{fontSize:20,fontWeight: "bold",fontFamily: "Microsoft JhengHei",
            letterSpacing:4,color:'#6C6C6C'}}>預警</a>}
        />
        <CardContent>
            <Alertsnack UserId={props.UserId}/>
        </CardContent>

        <CardHeader
            className={classes.typetestcss}
            title={<a style={{fontSize:20,fontWeight: "bold",fontFamily: "Microsoft JhengHei",
            letterSpacing:4,color:'#6C6C6C'}}>補課提醒</a>}
        />

        <CardContent>
            <Classalert UserId={props.UserId}/>
        </CardContent>
    
    </Card>
    </div>
    
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);