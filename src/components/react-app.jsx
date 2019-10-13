// import React from 'react';
// import axios from 'axios';

// //import EmployeeList from './employee-list'
// //import AppBar from './index/AppBar.jsx'
// import WarnBar from './index/WarnBar.jsx'
// import Exam from './index/Sheet-exam.jsx'
// import Homework from './index/Sheet-hw.jsx'
// import Class from './index/Sheet-class.jsx'
// //import Test from './index/Eexam.jsx'
// //import NavBar from './NavBar.jsx'
// import News from './index/News.jsx'
// import NewsTitle from './index/NewsTitle.jsx'
 
// export default class ReactApp extends React.Component {
 
//     constructor(props) {
//         super(props);
//         this.state = {employees: []};
//         this.Axios = axios.create({
//             baseURL: "/employee",
//             headers: {'content-type': 'application/json'}
//         });
//     }
 
//     componentDidMount() {
//         let _this = this;
//         this.Axios.get('/get')
//           .then(function (response) {
//              console.log(response);
//             _this.setState({employees: response.data});
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//     }
 
//     render() {
//         return (
//                 <div>
//                   <WarnBar/>
//                   <Exam/>
//                   <Homework/>
//                   <Class/>
//                   <NewsTitle/>
//                   <News/>
//                 </div>
//             )
//     }
// }