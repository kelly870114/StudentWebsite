import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Airtable from 'airtable';
import Typography from 'antd/lib/typography/Typography';

const TABLE_NAME = 'Homework';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);
const classDayTable = base('ClassDay');
const sutdentTable = base('Student');

const styles = theme => ({
  root: {
    width: '90%',
    height: '70%',
    marginLeft: 15,
    marginBottom: 20,
    //marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    overflowY: 'auto',
    marginBottom:20,
  },
  table: {
    minWidth: 500,
  },
});

let id = 0;
function createData(Class, Homework, Date) {
  id += 1;
  return { id, Class, Homework, Date };
}

// const rows = [
//   createData('Math B', '繳交數學本 p.66~p.70' , '10/2'),
//   createData('Chinese A', '繳交數學本 p.66~p.70', '10/2'),
//   createData('English C', '繳交數學本 p.66~p.70', '10/2'),
//   createData('Math B', '繳交數學本 p.66~p.70', '10/2'),
// ];

// function SimpleTable(props) {
//   const { classes } = props;

//   return (
//     <Paper className={classes.root}>
//       <Table className={classes.table}>
//         <TableHead>
//           <TableRow>
//             <TableCell>Class</TableCell>
//             <TableCell >Homework</TableCell>
//             <TableCell>Date</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map(row => (
//             <TableRow key={row.id}>
//               <TableCell component="th" scope="row">{row.Class}</TableCell>
//               <TableCell>{row.Homework}</TableCell>
//               <TableCell>{row.Date}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// }

class SimpleTable extends React.Component {
  state = {
    //studentData: [],
    rows:[],
  };
  componentDidMount(){
 
      const filterSentence = 'OR(FIND("' + this.props.UserId + '", student_id) > 0)' ;
      console.log(filterSentence);
      sutdentTable.select({
      filterByFormula: filterSentence,
      view: "Grid view",
      //maxRecords: 3,
      }).eachPage((records, fetchNextPage) => {
        const class_id_link = records.map((record, index) => record.fields['class_id_link']);
        console.log(class_id_link);
        console.log(class_id_link.length);

        //Homework Table
        for(var i = 0 ; i < class_id_link.length; i++){
          classDayTable.find(class_id_link[0][i], (err, record) => {
            if (err) {
                console.error(err)
                return
            }
            const class_id = record.fields['class_id'];

            table.select({
              view: "Grid view",
              //'AND(class_id_link ="' + class_id_link[0][i] + '")',
              filterByFormula: 'AND(class_id_link ="' + class_id + '")',
              }).eachPage((records, fetchNextPage) => {
            
              console.log(records);
  
              const class_id = records.map((record, index) => record.fields['class_id']);
              const hw_name = records.map((record, index) => record.fields['hw_name']);
              const hw_date = records.map((record, index) => record.fields['hw_date']);
  
  
              var temp=[];
              for(var index = 0; index < class_id.length; index++) {
                temp.push(createData(class_id[index], hw_name[index], hw_date[index]));
              }
               this.setState({ rows : temp });
               fetchNextPage(); 
              }
              );

          })

          }

      }
      );
  }
  componentDidUpdate(prevProps){
    if (this.props.UserId !== prevProps.UserId) {
 
      const filterSentence = 'OR(FIND("' + this.props.UserId + '", student_id) > 0)' ;
      console.log(filterSentence);
      sutdentTable.select({
      filterByFormula: filterSentence,
      view: "Grid view",
      //maxRecords: 3,
      }).eachPage((records, fetchNextPage) => {
        const class_id_link = records.map((record, index) => record.fields['class_id_link']);

        //Homework Table
        var temp=[];
        for(var i = 0 ; i < class_id_link.length; i++){
          classDayTable.find(class_id_link[0][i], (err, record) => {
            if (err) {
                console.error(err)
                return
            }
            //console.log(record);
            const class_id = record.fields['class_id'];

            table.select({
              view: "Grid view",
              //'AND(class_id_link ="' + class_id_link[0][i] + '")',
              filterByFormula: 'AND(class_id_link ="' + class_id + '")',
              }).eachPage((records, fetchNextPage) => {
            
              console.log(records);
  
              const class_id = records.map((record, index) => record.fields['class_id']);
              const hw_name = records.map((record, index) => record.fields['hw_name']);
              const hw_date = records.map((record, index) => record.fields['hw_date']);
  
  
              //var temp=[];
              for(var index = 0; index < class_id.length; index++) {
                temp.push(createData(class_id[index], hw_name[index], hw_date[index]));
              }
              console.log(temp);
              //this.setState({ rows : temp });
              // fetchNextPage(); 
          
              }
              );

          })

          }
          this.setState({ rows : temp });
      }
      );
    }
  }
  render(props){
    const { classes } = this.props;
    const { rows } = this.state;  
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell><Typography style={{fontSize:16,fontWeight: "bold",fontFamily: "Microsoft JhengHei",
            letterSpacing:4,color:'#969696'}}>班級</Typography></TableCell>
              <TableCell ><Typography style={{fontSize:16,fontWeight: "bold",fontFamily: "Microsoft JhengHei",
            letterSpacing:4,color:'#969696'}}>作業</Typography></TableCell>
              <TableCell><Typography style={{fontSize:16,fontWeight: "bold",fontFamily: "Microsoft JhengHei",
            letterSpacing:4,color:'#969696'}}>繳交日期</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row"><Typography style={{fontSize:16,fontFamily: "Microsoft JhengHei",
            letterSpacing:4,color:'#969696'}}>{row.Class}</Typography></TableCell>
                <TableCell><Typography style={{fontSize:16,fontFamily: "Microsoft JhengHei",
            letterSpacing:4,color:'#969696'}}>{row.Homework}</Typography></TableCell>
                <TableCell><Typography style={{fontSize:16,fontFamily: "Microsoft JhengHei",
            letterSpacing:2,color:'#969696'}}>{row.Date}</Typography></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);