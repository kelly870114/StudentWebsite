import React from 'react';
//import axios from 'axios';

import { Typography } from 'antd';
import ListTitle from './ListTitle'
import ReserveList from './ReserveList'

export default class ReserveComponent extends React.Component{
 
 
    render() {
        return (
                <div style={{marginTop:100 , width:100}}>
                <ListTitle/>
                <ReserveList/>
                </div>
            )
    }
}