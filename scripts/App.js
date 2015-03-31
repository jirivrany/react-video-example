'use strict';

import React from 'react';
import videoOptions from './config';
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

    _handleResize: function() {
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
        this._handleResize();
        this.initPlayerApi();
        window.addEventListener('resize', this._handleResize);
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this._handleResize);
    },

    render: function() {
      let cpan;
      if (this.state.duration > 0) { //don't mount the seekbar until metadata are loaded
        cpan = <ControlPanel {...this.state} thumbnail={videoOptions} />;
      }   
      
      return (
          <div className='row' ref='master'> 
            <VideoPlayer  ref='player' 
                          width={this.state.vidWidth} 
                          src={videoOptions.src} 
                          type={videoOptions.type} 
                          />

            {cpan}
            
          </div>
      );
    }
});
