import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RightIcon from '@material-ui/icons/DoneRounded';
import FailIcon from '@material-ui/icons/CloseRounded';
import Button1 from '@material-ui/icons/KeyboardArrowDownRounded';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const styles = theme => ({
  root: {
    width: '80vw',
    marginTop:40,
    marginBottom:40,
    overflowX: 'auto',
    marginLeft:'5vw',
    marginRight:'5vw',
    //minWidth:500,
  },
  table: {
    //minWidth: 500,
  },
  icon:{
    color:'#888888',
    marginLeft:0,
  }
});

let id = 0;
function createData(classclass, date, score, rank) {
  id += 1;
  return { id, classclass, date, score, rank };
}


const rows = [
  createData('數學B班', '3月14日', '87分', '100名'),
  createData('數學B班', '3月14日', '87分', '100名'),
  createData('數學B班', '3月14日', '87分', '100名'),
  createData('數學B班', '3月14日', '87分', '100名'),
  createData('數學B班', '3月14日', '87分', '100名'),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
    
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">班級<IconButton className={classes.icon}><Button1/></IconButton></TableCell>
            <TableCell align="center">日期</TableCell>
            <TableCell align="center">分數</TableCell>
            <TableCell align="center">排名</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell align="center" component="th" scope="row">
                {row.classclass}
              </TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.score}</TableCell>
              <TableCell align="center">{row.rank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
