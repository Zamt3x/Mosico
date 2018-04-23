import React from 'react';
class Playbar extends React.Component {
  constructor() {
    super();
    this.state = {
      play: false,
      loop: false,
      random: false
    };
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }
  pause() {
    this.setState({ play: false });
  }
  play() {
    this.setState({ play: true });
  }
  render() {
    return (
      <div className="play-bar">
        <i
          className={this.state.random ? 'material-icons btn btn-random active' : 'material-icons btn btn-random'}
          onClick={() => {
            this.state.random ? this.setState({ random: false }) : this.setState({ random: true });
          }}>
          shuffle
        </i>
        <i className="material-icons btn btn-prev">skip_previous</i>
        {this.state.play ? (
          <i className="material-icons btn btn-pause">pause_circle_outline</i>
        ) : (
          <i className="material-icons btn btn-play">play_circle_outline</i>
        )}
        <i className="material-icons btn btn-next">skip_next</i>
        <i
          className={this.state.loop ? 'material-icons btn btn-loop active' : 'material-icons btn btn-loop'}
          onClick={() => {
            this.state.loop ? this.setState({ loop: false }) : this.setState({ loop: true });
          }}>
          loop
        </i>
      </div>
    );
  }
}
module.exports = { Playbar };
