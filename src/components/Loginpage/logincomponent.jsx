import React from 'react';
import axios from 'axios';
import { AppBar, Drawer } from '@material-ui/core';
import Login from './login.jsx';

const styles = theme => ({
    root: {
        display: 'flex',
        background:'#FFF6E8',
    },
});
function isMobile(){
    try { document.createEvent("TouchEvent") ; return true;}
    catch(e) { return false; }
    console.log("isMobile");
}
// if (isMobile()){
//     return(
//     <div>hi</div>
//     )
// )};

export default class ReactApp extends React.Component {
    
    render() {
        const { classes } = this.props;
        if (isMobile()){
            return(
                <dive>hi</dive>
            )
        }
        else{
            return (
                <div>
                    <Login/>
                </div>
            
            )
        }
        
    }
}