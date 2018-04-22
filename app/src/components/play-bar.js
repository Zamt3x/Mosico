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
    let playState = this.state.play ? (
      <div className="btn btn-pause" onClick={this.pause} />
    ) : (
      <div className="btn btn-play" onClick={this.play}>
        &#10148;
      </div>
    );
    return (
      <div className="play-bar">
        <div
          className={this.state.random ? 'btn btn-random active' : 'btn btn-random'}
          onClick={() => {
            this.state.random ? this.setState({ random: false }) : this.setState({ random: true });
          }}>
          <span className="random-top">&#10137;</span>
          <span className="random-bottom">&#10137;</span>
        </div>
        <div className="btn btn-prev">&#10151;</div>
        {playState}
        <div className="btn btn-next">&#10151;</div>
        <div
          className={this.state.loop ? 'btn btn-loop active' : 'btn btn-loop'}
          onClick={() => {
            this.state.loop ? this.setState({ loop: false }) : this.setState({ loop: true });
          }}>
          &#8635;
        </div>
      </div>
    );
  }
}
module.exports = { Playbar };
