'use strict';

import React from 'react';
import VideoPlayer from './components/VideoPlayer';

export default React.createClass({
   getInitialState: function() {
        return {
            vidWidth: 0
        };

    },

    handleResize: function() {
        let player = this.refs.master.getDOMNode();
        this.setState({
            vidWidth: player.clientWidth
        });
    },

    componentDidMount: function() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },


    videoOptions: {
      src: "../assets/videos/oceans-clip.mp4",//video url goes here
      type: "video/mp4",//video type here
    },


    render() {
      return (
          <div className='App' ref='master'> 
            <VideoPlayer width={this.state.vidWidth} src={this.videoOptions.src} type={this.videoOptions.type} />
          </div>
      );
    }
});
