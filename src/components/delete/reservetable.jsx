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

const styles = theme => ({
  root: {
    //width: '80%',
    marginTop:'40px',
    overflowX: 'auto',
    marginLeft:'50px',
    marginRight:'50px',
    minWidth:'500px',
  },
  table: {
    minWidth: 500,
  },
  icon:{
    color:'#888888'
  }
});

let id = 0;
function createData(classclass, date, score, rank) {
  id += 1;
  return { id, classclass, date, score, rank };
}

const rows = [
  createData('3月14日', '台北校區', '10:00', '100名'),
  createData('3月14日', '古亭校區', '11:00', '100名'),
  createData('3月14日', '板橋校區', '11:00', '100名'),
  createData('3月14日', '古亭校區', '12:00', '100名'),
  createData('3月14日', '台北校區', '13:00', '100名'),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
    
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">日期</TableCell>
            <TableCell align="center">校區</TableCell>
            <TableCell align="center">補課時間</TableCell>
            <TableCell align="center">預約</TableCell>
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
