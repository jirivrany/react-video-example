'use strict';

import React from 'react';

import ProgressControl from '../components/ProgressControl';

export default React.createClass({
    render: function() {
        return (
           <ProgressControl api={this.props.api} />
        );
    }
});