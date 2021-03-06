import React from 'react';
import PadBank from './components/PadBank';
import {bankOne, bankTwo} from './sampleBank';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			power: true,
			display: '',
			currentPadBank: bankOne,
			currentPadBankId: 'Heater Kit',
			sliderVal: 0.3
		}
		this.displayClipName = this.displayClipName.bind(this);
		this.selectBank = this.selectBank.bind(this);
		this.adjustVolume = this.adjustVolume.bind(this);
		this.powerControl = this.powerControl.bind(this);
		this.clearDisplay = this.clearDisplay.bind(this);
	}

	powerControl() {
		this.setState({
			power: !this.state.power,
			display: ' '
		});
	}

	selectBank() {
		if (this.state.power) {
			this.state.currentPadBankId === 'Heater Kit' ?
				this.setState({
					currentPadBank: bankTwo,
					display: 'Smooth Piano Kit',
					currentPadBankId: 'Smooth Piano Kit',
				}) :
				this.setState({
					currentPadBank: bankOne,
					display: 'Heater Kit',
					currentPadBankId: 'Heater Kit',
				});
		}
	}

	displayClipName(name) {
		if (this.state.power) {
			this.setState({display: name});
		}
	}

	adjustVolume(e) {
		if (this.state.power) {
			this.setState({
				sliderVal: e.target.value,
				display: "Volume: " + Math.round(e.target.value * 100)
			});
			setTimeout(() => this.clearDisplay(), 1000);
		}
	}

	clearDisplay() {
		this.setState({display: ' '});
	}
	
	render() {
		const powerIndicator = this.state.power ? {
			opacity: '100'
		} : {
				opacity: '0'
			};

		const powerSlider = this.state.power ? {
			transform: `translate(${30}px)`
		} : {
				transform: `translate(${0}px)`
			};

		const bankSlider = this.state.currentPadBank === bankOne ? {
			transform: `translate(${0}px)`
		} : {
				transform: `translate(${30}px)`
			};
			
		const clips = [].slice.call(document.getElementsByClassName('clip'));
			
		clips.forEach(sound => {
			sound.volume = this.state.sliderVal
		});

		return (
			<div id="drum-machine" className="inner-container">
				<PadBank
					power={this.state.power}
					updateDisplay={this.displayClipName}
					clipVolume={this.state.sliderVal}
					currentPadBank={this.state.currentPadBank} />

				<div className="logo">
					<div className="inner-logo">{'drumMachine V.1.2'}</div>
				</div>

				<div className="controls-container">
					<div className="control">
						<p>Power</p>
						<div id="indicator" style={powerIndicator} />
						<div onClick={this.powerControl} className="select">
							<div className="inner" style={powerSlider} />
						</div>
					</div>

					<p id="display">
						{this.state.display}
					</p>

					<div className="volume-slider">
						<input type="range" min="0" max="1" step="0.01" value={this.state.sliderVal} onChange={this.adjustVolume} />
					</div>

					<div className="control">
						<p>Bank</p>
						<div onClick={this.selectBank} className="select">
							<div style={bankSlider} className="inner" />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default App;
