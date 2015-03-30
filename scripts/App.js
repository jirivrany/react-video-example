'use strict';

import React from 'react';
import VideoPlayer from './components/VideoPlayer';
import ControlPanel from './components/ControlPanel';

export default React.createClass({
    
    getInitialState: function() {
        return {
            vidWidth: 0,
            offsetLeft: 0,
            api: undefined,
            duration: 0,
        };

    },

    handleResize: function() {
        let master = this.refs.master.getDOMNode();
        this.setState({
            vidWidth: master.clientWidth,
            offsetLeft: master.offsetLeft,
        });
    },

    initPlayerApi: function() {
       let player = this.refs.player.getDOMNode();
       player.addEventListener('loadedmetadata', this.loadedMetaData);
       this.setState({ api: player });
    },

    loadedMetaData: function(event) {
      this.setState({duration: event.target.duration});
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
      src: "http://media.xiph.org/mango/tears_of_steel_1080p.webm", //video url goes here
      type: "video/webm", //video type here
      timeMarks: [10, 20, 30.6, 17], //time (s) when something needs to be marked as important 
    },


    render() {
      let cpan;
      if (this.state.duration > 0) {
        cpan = <ControlPanel {...this.state} thumbnail={this.videoOptions} />;
      }   
      
      return (
          <div className='Container' ref='master'> 
            <VideoPlayer  ref='player' 
                          width={this.state.vidWidth} 
                          src={this.videoOptions.src} 
                          type={this.videoOptions.type} 
                          />

            {cpan}
            
          </div>
      );
    }
});
