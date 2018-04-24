import React from 'react';
// Track that enables user to interact with song currently playing
class Playtrack extends React.Component {
  render() {
    return <div className="play-track" />;
  }
  componentDidMount() {
    playtrack = this;
  }
}
let playtrack;
// The main conatiner for both controls and the playtrack
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
    let btnTrackState = this.state.play ? (
      <i className="material-icons btn btn-pause" onClick={this.toggleTrack}>
        pause
      </i>
    ) : (
      <i className="material-icons btn btn-play" onClick={this.toggleTrack}>
        play_arrow
      </i>
    );
    return (
      <div className="play-bar">
        {/* Play track */}
        <Playtrack />
        <div className="controls">
          {/* Song information, artist and name */}
          <div>
            <h2>Song info</h2>
          </div>
          {/* Player controls */}
          <div>
            <i
              className={'material-icons btn btn-random' + (this.state.random ? ' active' : '')}
              onClick={this.toggleRandom}>
              shuffle
            </i>
            <i className="material-icons btn btn-prev">skip_previous</i>
            {btnTrackState}
            <i className="material-icons btn btn-next">skip_next</i>
            <i className={'material-icons btn btn-loop' + (this.state.loop ? ' active' : '')} onClick={this.toggleLoop}>
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
