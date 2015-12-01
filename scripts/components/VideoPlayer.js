/*eslint-disable no-unused-vars*/
'use strict';

import React from 'react';


export default React.createClass({

    render: function() {

        return (
                <video ref="api" width={this.props.width} id='video-player' preload='metadata' controls>
                    <source src={this.props.src} type={this.props.type} />
                </video>
            );
    }
});
