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
    marginTop:'15px',
    overflowX: 'auto',
    marginLeft:'50px',
    marginRight:'50px',
  },
  table: {
    minWidth: 500,
  },
  icon:{
    color:'#888888'
  }
});

let id = 0;
function createData(date, classclass, attendance, homework) {
  id += 1;
  return { id, date, classclass, attendance, homework };
}

const rows = [
  createData('10月7日', '數學B班', '19:00', <RightIcon color="primary"/>),
  createData('10月7日', '數學B班', '19:08', <RightIcon color="primary"/>),
  createData('10月7日', '數學B班', '19:20', <FailIcon color="error"/>),
  createData('10月7日', '數學B班', '19:07', <FailIcon color="error"/>),
  createData('10月7日', '數學B班', '19:33', <FailIcon color="error"/>),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
    
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">日期<IconButton className={classes.icon}><Button1/></IconButton></TableCell>
            <TableCell align="center">班級</TableCell>
            <TableCell align="center">出勤紀錄</TableCell>
            <TableCell align="center">作業紀錄</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell align="center" component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="center">{row.classclass}</TableCell>
              <TableCell align="center">{row.attendance}</TableCell>
              <TableCell align="center">{row.homework}</TableCell>
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
