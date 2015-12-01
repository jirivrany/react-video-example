/*eslint-disable no-unused-vars*/
import React from 'react';
import {ProgressBar} from 'react-bootstrap';
import {toVideoDuration} from '../utils/';
import Thumbnail from '../components/Thumbnail';
import BarMarker from '../components/BarMarker';


export default React.createClass({

    getInitialState: function() {

        return {
            progress: 0,
            seekTime: 0,
            rawSeekTime: 0,
            showTicket: 'hidden',
            ticketLeft: 0
        };
    },

    componentDidMount: function() {
        this.props.api.addEventListener('timeupdate', this._onTimeUpdate, false);
        this._updateBarState();
    },

    _updateBarState: function() {
        let bar = this.refs.seekbar.getDOMNode();
        this.setState({offsetLeft: bar.offsetLeft});
    },

    _onMouseSeek: function(event) {
        let api = this.props.api,
            pos = (event.pageX - this.props.offsetLeft) / this.props.vidWidth,
            ttt = pos * api.duration;

        this.setState( {seekTime: toVideoDuration(ttt),
                        rawSeekTime: ttt,
                        showTicket: 'visible',
                        ticketLeft: event.pageX });
    },

    _onTimeUpdate: function() {

        let api = this.props.api,
            progress = Math.floor((100 / api.duration) * api.currentTime);

        this.setState({ progress });
    },


    _onMouseOut: function() {

        this.setState( {showTicket: 'hidden'});
    },

    _seek: function(event) {


        let api = this.props.api,
            pos = (event.pageX - this.props.offsetLeft) / this.props.vidWidth;


        api.currentTime = pos * api.duration;
    },

    render: function() {
        return (
            <div className='progress-controls'
                                onClick={this._seek}
                                onMouseOver={this._onMouseSeek}
                                onMouseMove={this._onMouseSeek}
                                onMouseOut={this._onMouseOut}
                                >

                <ProgressBar ref="seekbar"
                                now={this.state.progress}
                                style={{width: this.props.vidWidth + 'px'}}
                                />

                <BarMarker timeMarks={this.props.thumbnail.timeMarks}
                            barWidth={this.props.vidWidth}
                            duration={this.props.duration}
                 />

                   <div style={{visibility: this.state.showTicket, position: 'absolute', left: this.state.ticketLeft - 100 }} >
                    <strong>{this.state.seekTime}</strong>
                    <br />
                    <Thumbnail video={this.props.thumbnail} seek={this.state.rawSeekTime} width="200px" />

                </div>


            </div>

        );
    }
});
