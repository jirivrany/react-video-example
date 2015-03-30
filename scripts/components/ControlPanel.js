'use strict';

import React from 'react';

import ProgressControl from '../components/ProgressControl';

export default React.createClass({

    render: function() {
        return (
           <ProgressControl {...this.props} style={{width: this.props.vidWidth + 'px'}} />
        );
    }
});