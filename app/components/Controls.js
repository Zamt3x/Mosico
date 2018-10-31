import React, { Component } from 'react';
import Sound from 'react-sound';
import Storage from './utils/Storage';

class Controls extends Component {
  state = {
    play: false,
    loop: false,
    random: false,
    appData: null
  }

  toggleTrack = () => {
    const { play } = this.state;
    play ? this.setState({ play: false }) : this.setState({ play: true });
  }

  toggleLoop = () => {
    const { loop } = this.state;
    loop ? this.setState({ loop: false }) : this.setState({ loop: true });
  }

  toggleRandom = () => {
    const { random } = this.state;
    random ? this.setState({ random: false }) : this.setState({ random: true });
  }

  render() {
    const { random, loop, play } = this.state;

    return (
      <div className="controls">
        {/* Play track */}
        <div className="play-track">
          <p className="current">0:00</p>
          <p className="end">4:43</p>
        </div>
        <div className="bar-buttons">
          {/* Song information, artist and name */}
          <div>
            <h2>Song info</h2>
          </div>
          {/* Player controls */}
          <div>
            <i className={'material-icons btn btn-random' + (random ? ' active' : '')} onClick={this.toggleRandom}>
              shuffle
            </i>
            <i className="material-icons btn btn-prev">skip_previous</i>
            <i className={'material-icons btn' + (play ? ' btn-pause' : ' btn-play')} onClick={this.toggleTrack}>
              {play ? 'pause' : 'play_arrow'}
            </i>
            <i className="material-icons btn btn-next">skip_next</i>
            <i className={'material-icons btn btn-loop' + (loop ? ' active' : '')} onClick={this.toggleLoop}>
              loop
            </i>
          </div>
          {/* Volume control */}
          <div>
            <i className="material-icons btn btn-volume">volume_up</i>
            <div className="volume-popup hide" />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    Storage.readFile('app-data.json').then(data => {
      this.setState({ appData: JSON.parse(data) });
    }).catch(err => { this.setState({ appData: null }) });
  }
}

export default Controls;