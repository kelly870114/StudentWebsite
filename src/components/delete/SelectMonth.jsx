import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
//import Typography from '@material-ui/core/Typography';
//import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft:'42px',
    marginTop:'20px',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 278,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class NativeSelects extends React.Component {
  state = {
    age: '',
    name: 'hai',
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-native-simple"
          >
            選擇月份
          </InputLabel>
          <Select
            native
            value={this.state.age}
            onChange={this.handleChange('age')}
            input={
              <OutlinedInput
                name="Age"
                labelWidth={this.state.labelWidth}
                id="outlined-age-native-simple"
              />
            }
          >
            <option value="" />
            <option value="">一月</option>
            <option value="">二月</option>
            <option value="">三月</option>
            <option value="">四月</option>
            <option value="">五月</option>
            <option value="">六月</option>
            <option value="">七月</option>
            <option value="">八月</option>
            <option value="">九月</option>
            <option value="">十月</option>
            <option value="">十一月</option>
            <option value="">十二月</option>
          </Select>
        </FormControl>
      </div>
    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NativeSelects);
