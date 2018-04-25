import React from 'react';
class Playbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleLoop = this.toggleLoop.bind(this);
    this.toggleTrack = this.toggleTrack.bind(this);
    this.toggleRandom = this.toggleRandom.bind(this);
    this.state = {
      play: false,
      loop: false,
      random: false
    };
  }
  toggleTrack({ target }) {
    this.state.play ? this.setState({ play: false }) : this.setState({ play: true });
  }
  toggleLoop() {
    this.state.loop ? this.setState({ loop: false }) : this.setState({ loop: true });
  }
  toggleRandom() {
    this.state.random ? this.setState({ random: false }) : this.setState({ random: true });
  }
  render() {
    const { random, loop, play } = this.state;
    return (
      <div className="play-bar">
        {/* Play track */}
        <div className="play-track">
          <p className="current">Current</p>
          <p className="end">End</p>
        </div>
        <div className="controls">
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
          {/* Volume controls */}
          <div>
            <i className="material-icons btn btn-volume">volume_up</i>
            <div className="volume-popup" />
          </div>
        </div>
      </div>
    );
  }
}
module.exports = { Playbar };
