import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText, Divider, Typography } from '@material-ui/core';

export default class FormDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.handleClickOpen}
            variant="contained"
            style={{height:30,backgroundColor:'#5A3DAA',marginLeft:125,marginTop: 28,borderRadius: 12}} >
          <Typography style={{fontFamily: "Microsoft JhengHei", 
          color:'white',fontSize:13,fontWeight: "bold", color:'white'}}>更改</Typography>
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">
          <a style={{color:'#5A3DAA',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",
            fontSize:25}}>更改密碼</a>
              </DialogTitle>
          <DialogContent>
            <DialogContentText>
            <a style={{fontFamily: "Microsoft JhengHei",letterSpacing:4 }}>目前密碼</a>
            </DialogContentText>
            <TextField style={{marginTop: 10, width: 300}} autoFocus margin="dense" id="passwd1"
              label="舊密碼" type="password" fullWidth variant="outlined" />
          </DialogContent>

          <DialogContent>
            <DialogContentText>
            <a style={{fontFamily: "Microsoft JhengHei",letterSpacing:4 }}>新密碼</a>
            </DialogContentText>
            <TextField style={{width: 300}} margin="dense" id="passwd2" label="請輸入新密碼"
              type="password" fullWidth variant="outlined"/>
          </DialogContent>

          <DialogContent>
            <TextField style={{width: 300}} margin="dense" id="passwd3" label="再次輸入新密碼"
              type="password" fullWidth variant="outlined"/>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消
            </Button>
            <Button onClick={this.handleClose} color="primary">
              確認
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}