import React from 'react';
import {ProgressBar} from 'react-bootstrap';
import {toVideoDuration} from '../utils/';
import Thumbnail from '../components/Thumbnail';
import BarMarker from '../components/BarMarker';


export default React.createClass({

    getInitialState() {

        return {
            progress: 0,
            seekTime: 0,
            rawSeekTime: 0,
            showTicket: 'hidden',
            ticketLeft: 0,
        };
    },

    componentWillReceiveProps (nextProps) {

       if (this.props.api !== nextProps.api) {
            nextProps.api.addEventListener('timeupdate', this._onTimeUpdate, false);
      }

    },

    componentDidMount() {
        this._updateBarState();
    },

    _updateBarState() {
        let bar = this.refs.seekbar.getDOMNode();
        this.setState({offsetLeft: bar.offsetLeft});
    },

    _onMouseSeek(event) {
        let api = this.props.api,
            pos = (event.pageX -  this.props.offsetLeft) / this.props.vidWidth, 
            ttt = pos * api.duration;

        this.setState( {seekTime: toVideoDuration(ttt),
                        rawSeekTime: ttt,  
                        showTicket: 'visible',
                        ticketLeft: event.pageX });
    },

    _onTimeUpdate() {

        let api = this.props.api,
            progress = Math.floor((100 / api.duration) * api.currentTime);

        this.setState({ progress });
    },


    _onMouseOut() {

        this.setState( {showTicket: 'hidden'});
    },

    _seek (event) {
       

        let api = this.props.api,
            pos = (event.pageX - this.props.offsetLeft) / this.props.vidWidth; 
        
        api.currentTime = pos * api.duration;
    },

    render() {
        return (
            <div className='progress-controls' 
                                onClick={this._seek} 
                                onMouseOver={this._onMouseSeek} 
                                onMouseMove={this._onMouseSeek} 
                                onMouseOut={this._onMouseOut}
                                >
                 
                <ProgressBar ref="seekbar" 
                                now={this.state.progress}  
                                />

                <BarMarker timeMarks={this.props.thumbnail.timeMarks}
                            barWidth={this.props.vidWidth}
                            duration={this.props.duration}
                 />

<<<<<<< HEAD
                  <div style={{visibility: this.state.showTicket, position: 'absolute', left: this.state.ticketLeft - 100  }} >
=======
                <div style={{visibility: this.state.showTicket, position: 'absolute', left: this.state.ticketLeft - 100}} >
>>>>>>> new-time-marks
                    <strong>{this.state.seekTime}</strong>
                    <br />
                    <Thumbnail video={this.props.thumbnail} seek={this.state.rawSeekTime} width="200px" />  
                       
                </div>

                  
            </div>
                  
        );
    }
});
