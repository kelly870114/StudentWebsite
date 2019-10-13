import React from 'react';
import axios from 'axios';
import { AppBar, Drawer } from '@material-ui/core';
import NewsCard from './newscard';

export default class ReactApp extends React.Component {
    
    render() {
        const { classes } = this.props;
        return (
                <div>
                    <NewsCard/>
                </div>
            
            )
    }
}