'use strict';

import React from 'react';
import VideoPlayer from './components/VideoPlayer';
import ControlPanel from './components/ControlPanel';

export default React.createClass({
   getInitialState: function() {
        return {
            vidWidth: 0,
            playerApi: undefined
        };

    },

    handleResize: function() {
        let player = this.refs.master.getDOMNode();
        this.setState({
            vidWidth: player.clientWidth
        });
    },

    initPlayerApi: function() {
       this.setState({ api: this.refs.player.refs.api.getDOMNode() });
    },

    componentDidMount: function() {
        this.handleResize();
        this.initPlayerApi();
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
          <div className='Container' ref='master'> 
            <VideoPlayer ref='player' width={this.state.vidWidth} src={this.videoOptions.src} type={this.videoOptions.type} />
            <ControlPanel api={this.state.api} />
          </div>
      );
    }
});
