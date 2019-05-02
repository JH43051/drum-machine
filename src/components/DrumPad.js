import React from 'react';

const activeStyle = {
  backgroundColor: 'orange',
  boxShadow: "0 3px orange",
  height: 77,
  marginTop: 13
}

const inactiveStyle = {
  backgroundColor: '#1bb2dd',
  marginTop: 10,
  border: "2px solid black",
  boxShadow: "1px 1px 3px #1bb2dd"
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle
    }
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  activatePad() {
    if (this.props.power) {
      this.state.padStyle.backgroundColor === 'orange' ?
        this.setState({
          padStyle: inactiveStyle
        }) :
        this.setState({
          padStyle: activeStyle
        });
    } else {
      this.state.padStyle.marginTop === 13 ?
        this.setState({
          padStyle: inactiveStyle
        }) :
        this.setState({
          padStyle: {
            height: 77,
            marginTop: 13,
            backgroundColor: 'grey',
            boxShadow: "0 3px grey"
          }
        });
    }
  }
  playSound(e) {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
  }
  render() {
    return (
      <div id={this.props.clipId} 
        onClick={this.playSound} 
        className="drum-pad" 
        style={this.state.padStyle} >
          <audio className='clip' id={this.props.keyTrigger} src={this.props.clip}></audio>
          {this.props.keyTrigger}
      </div>
    )
  }
}

export default DrumPad;