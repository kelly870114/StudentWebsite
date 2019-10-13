import React from 'react';
import axios from 'axios';
import { AppBar, Drawer } from '@material-ui/core';
import Home from './Home.jsx';
import MobileHome from './mobileHome'


// const styles = theme => ({
//     root: {
//         display: 'flex',
//     },
// });
function isMobile(){
    try { document.createEvent("TouchEvent") ; return true;}
    catch(e) { return false; }
    console.log("isMobile");
}

export default class ReactApp extends React.Component {
    
    
    render() {
        const { classes } = this.props;
        if (isMobile()){
            return(
                <dive><MobileHome UserId={this.props.UserId}/></dive>
            )
        }
        else{
            return (
                <div>
                    <Home UserId={this.props.UserId}/>
                </div>
            
            )
        }
        // return (
        //         <div>
        //             <Home  UserId={this.props.UserId}/>
        //         </div>
            
        //     )
    }
}