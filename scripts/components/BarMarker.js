'use strict';

import React from 'react';

import {compareNumbers} from '../utils/';

export default React.createClass({

    getInitialState: function() {
        return {
            oneSecond: 0,
        };

    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.duration) {
            let oneSecond = nextProps.barWidth / nextProps.duration;
            this.setState({oneSecond: oneSecond});       
        }
    },
    
    render: function() {
        
        let oneSecond = this.state.oneSecond;
        let sortedMarks = this.props.timeMarks.sort(compareNumbers);

        let marks = sortedMarks.map(function(mark, index, values){
            let current, previous, markVal;

            current = oneSecond * mark  - 3;
            previous = oneSecond * values[index-1] - 3;
            
            previous = previous ? previous : 0;//fix NaN for the first value
            

            markVal = Math.floor(current - previous);
            
            return(
                <div key={mark} style={{float: 'left'}}>
                    <div style={{background: 'transparent', width:  markVal + 'px', float: 'left'}}>&nbsp;</div>
                    <div style={{background: 'orange', width: '3px', float: 'left'}}>&nbsp;</div>
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