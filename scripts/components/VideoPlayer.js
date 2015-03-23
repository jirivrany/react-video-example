'use strict';

import React from 'react';



let VideoPlayer = React.createClass({

    render: function() {

        return (
            <div >
                <video ref="myvideo" width={this.props.width} id='video-player' preload='metadata' controls>
                    <source src={this.props.src} type={this.props.type} />
                </video>
            </div>);
    }
});

export default VideoPlayer;

