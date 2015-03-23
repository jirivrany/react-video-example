'use strict';

import React from 'react';
import VideoPlayer from './components/VideoPlayer';

const App = React.createClass({
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

    render() {
      return (
          <div className='App' ref='master'> 
            <VideoPlayer width={this.state.vidWidth} src="../assets/videos/oceans-clip.mp4" type="video/mp4"/>
          </div>
      );
    }
});

export default App;
