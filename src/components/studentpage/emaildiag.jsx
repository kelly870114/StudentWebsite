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
import { fetchUpdateStudentEmail,fetchUpdateAccountEmail } from '../../api';
import SelectInput from '@material-ui/core/Select/SelectInput';

import Airtable from 'airtable';

const TABLE_NAME = 'Student';
const ACCOUNT_TABLE_NAME = 'Account';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);
const accountTable = base(ACCOUNT_TABLE_NAME);

function sleep (time){
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default class FormDialog extends React.Component {
  state = {
    open: false,
    student_email:'',
    record_id:'',
    account_record_id:'',
  };
  componentDidMount(){
    const filterSentence = 'AND(student_id =' + this.props.UserId + ')';
    table.select({
      filterByFormula: filterSentence,
      view: "Grid view",
      maxRecords: 1
      }).eachPage((records, fetchNextPage) => {
        this.setState({records});

        const student_email = this.state.records.map((record, index) => record.fields['student_email']);
        const record_id = this.state.records.map((record, index) => record.id.id);

        //for account table
        accountTable.select({
          filterByFormula: 'AND(account_id="' + student_email[0] + '")',
          view: "Grid view",
          maxRecords: 1
          }).eachPage((records, fetchNextPage) => {
            this.setState({records});
            const account_record_id = this.state.records.map((record, index) => record.id.id);
    
            this.setState({ student_email : student_email, record_id : record_id[0], account_record_id : account_record_id[0]});
            fetchNextPage(); 
          }
        );



        //this.setState({ student_email : student_email, record_id : record_id[0]});
          
        fetchNextPage(); 
      }
    );
  }
  

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
        [name] : event.target.value});
  };

  handleSubmit = (e)=> {
    e.preventDefault()


    let data = {fields:{student_email:{}}};
    let dataAccount = {fields:{account_id:{}}};

    console.log(this.state.account_record_id);
    //data.fields.student_id = this.props.UserId;
    data.fields.student_email = this.state.student_email;
    dataAccount.fields.account_id = this.state.student_email;
    fetchUpdateStudentEmail(data,this.state.record_id);
    fetchUpdateAccountEmail(dataAccount,this.state.account_record_id);
    this.setState({ open: false });
    // sleep(500).then(() => {
    //   window.location.reload();
    // })
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
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
          <a style={{color:'#5A3DAA',fontFamily: "Microsoft JhengHei",letterSpacing:4,fontWeight: "bold",
            fontSize:25}}>更改信箱</a>
              </DialogTitle>
          <DialogContent>
            <DialogContentText>
            <a style={{fontFamily: "Microsoft JhengHei",letterSpacing:4
            }}>以後可以用此信箱登入</a>
            </DialogContentText>
            <TextField
              style={{marginTop: 30, width: 300}}
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              onChange={this.handleChange('student_email')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消
            </Button>
            <Button onClick= {this.handleSubmit} color="primary">
              確認
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}