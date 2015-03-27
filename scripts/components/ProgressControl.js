import React from 'react';
import {ProgressBar, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {toVideoDuration} from '../utils/timeFunctions';


export default React.createClass({

    getInitialState() {

        return {
            progress: 0,
            seekTime: 0,
            offsetLeft: 0,
            offsetWidth: 0
        };
    },

    componentWillReceiveProps (nextProps) {

       if (this.props.api !== nextProps.api) {
            nextProps.api.addEventListener('timeupdate', this._onTimeUpdate, false);
       }

    },

    componentDidMount() {
        let bar = this.refs.seekbar.getDOMNode();
        this.setState({offsetLeft: bar.offsetLeft});
        this.setState({offsetWidth: bar.offsetWidth});
    },


    _onMouseSeek(event) {
        let api = this.props.api,
            pos = (event.pageX - event.target.offsetLeft) / event.target.offsetWidth;

        this.setState( {seekTime: toVideoDuration(pos * api.duration) });
    },

    _onTimeUpdate() {

        let api = this.props.api,
            progress = Math.floor((100 / api.duration) * api.currentTime);

        this.setState({ progress });
    },

    _seek (event) {
       

        let api = this.props.api,
            pos = (event.pageX - this.state.offsetLeft) / this.state.offsetWidth;
            
        console.log(pos);

        console.log("pageX", event.pageX);
        
            

        api.currentTime = pos * api.duration;
    },

    render() {

        let timeInfo = <Tooltip>{this.state.seekTime}</Tooltip>;

        return (

            <div className='progress-controls'>
                  <OverlayTrigger   placement='bottom' 
                                    overlay={timeInfo}>
      
                  
                  <ProgressBar  ref="seekbar" 
                                now={this.state.progress}  
                                onClick={this._seek} 
                                onMouseOver={this._onMouseSeek} 
                                onMouseMove={this._onMouseSeek}
                                />
                  </OverlayTrigger>  
            </div>
        );
    }
});
