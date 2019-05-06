import React from 'react';
import DrumPad from './DrumPad';

class PadBank extends React.Component {
	render() {
		let padBank = null;

		this.props.power ?
			padBank = this.props.currentPadBank.map((_drumObj, i, padBankArr) => {
				return (
					<DrumPad
						clipId={padBankArr[i].id}
						clip={padBankArr[i].url}
						keyTrigger={padBankArr[i].keyTrigger}
						keyCode={padBankArr[i].keyCode}
						updateDisplay={this.props.updateDisplay}
						power={this.props.power} />
				)
			}) :
			padBank = this.props.currentPadBank.map((_drumObj, i, padBankArr) => {
				return (
					<DrumPad
						clipId={padBankArr[i].id}
						clip="#"
						keyTrigger={padBankArr[i].keyTrigger}
						keyCode={padBankArr[i].keyCode}
						updateDisplay={this.props.updateDisplay}
						power={this.props.power} />
				)
			});

		return (
			<div className="pad-bank" >
				{padBank}
			</div>
		)
	}
}

export default PadBank;
