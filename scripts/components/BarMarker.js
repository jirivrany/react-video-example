'use strict';

import React from 'react';

import {compareNumbers} from '../utils/';

export default React.createClass({

    getInitialState: function() {
        return {
            oneSecond: 0,
        };

    },
    
    componentDidMount: function() {
        if (this.props.duration) {
            let oneSecond = Math.floor(this.props.barWidth / this.props.duration);
            this.setState({oneSecond: oneSecond});       
        }
    },
    
    render: function() {
        let oneSecond = this.state.oneSecond;
        let sortedMarks = this.props.timeMarks.sort(compareNumbers);
        let marks = sortedMarks.map(function(mark, index, values){
            let current, previous, markVal;

            current = oneSecond * mark - 5;
            previous = oneSecond * values[index-1] - 5;
            previous = previous ? previous : 0;//fix NaN for the first value
            
            markVal = current - previous;

            return(
                <div key={mark} style={{float: 'left'}}>
                    <div style={{background: 'transparent', width:  markVal + 'px', float: 'left'}}>&nbsp;</div>
                    <div style={{background: 'orange', width: '5px', float: 'left'}}>&nbsp;</div>
                </div>
            );
        });
        
        return (

                 <div style={{width: '100%', position: 'relative', top: '-40px', float: 'left'}}>
                   {marks} 
                  </div>  
        );
    }
});