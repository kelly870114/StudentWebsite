import React from 'react';
//import axios from 'axios';

//import EmployeeList from './employee-list'
// import WarnBar from './index/WarnBar.jsx'
// import Exam from './index/Sheet-exam.jsx'
// import Homework from './index/Sheet-hw.jsx'
// import Class from './index/Sheet-class.jsx'
//import Test from './index/Eexam.jsx'
//import NavBar from './NavBar.jsx'
// import News from './index/News.jsx'
// import NewsTitle from './index/NewsTitle.jsx'
import SelectClass from './SelectClass.jsx'
import { Typography } from 'antd';
import Table from './TableTry.jsx'

export default class ScoreComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            listDataFromChild: null,
        };    
    }
    myCallback = (dataFromChild) => {
        this.setState({ listDataFromChild: dataFromChild });
        console.log('socreComponent');
        console.log(this.state.listDataFromChild);
      }
  
    render() {
        return (
                <div style={{marginTop:100 , width:100}}>
                
                    <SelectClass callbackFromParent={this.myCallback}/>
                    <Table listNameFromParent={this.state.listDataFromChild}/>
                </div>
            )
    }
}