import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {HuePicker} from 'react-color';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/hues';

const H5 = styled.h5`
	font-weight: 400;
	margin: 0;
	padding; 0;
	flex-grow: 1;
`;

const H5options = styled.h5`
	font-weight: 300;
	margin: 0;
	padding; 0;
	flex-grow: 1;
`;

const Light = styled.div`
	align-items: center;
	background: #191919;
	padding: 0.5em 1.5em;
	border-bottom: solid 1px #444444;
	&:hover {
		cursor: pointer;
	}
`;

const SelectedContainer = styled.div`
	display: flex;
	padding: 0.5em 0;
`;

const OptionsContainer = styled.div`
	display: flex;
	padding: 0.5em 0;
`;

const ToggleContainer = styled.div`
	display: flex;
	padding: 0.5em 0;
`;

const PickerContainer = styled.div`
	padding: 0.5em 0;
`;

const PickerWarpper = styled.div`
	padding-top: 0.5em;
`;

const SliderContainer = styled.div`
	padding: 0.5em 0;
	margin: 0;
`;

class HueLight extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selected: false,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillMount() {
		document.addEventListener('click', this.handleClick, false);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClick, false);
	}

	handleClick(e) {
		if (this.node.contains(e.target)) {
			this.setState({selected: true});
		} else {
			this.setState({selected: false});
		}
	}

	handleColorChange(color) {
		let light = {
			id: this.props.metadata.id,
			color: color.hex
		};
		this.props.actions.updateColor(light);
	}

	handleOnOff(value) {
		let light = {
			id: this.props.metadata.id,
			on: value
		};
		this.props.actions.updateOnOff(light);
	}

	handleBrightnessChange(value) {
		let temp = Math.round(value);
		let light = {
			id: this.props.metadata.id,
			bri: temp
		};
		this.props.actions.updateBrightness(light);
	}

	handleSaturationChange(value) {
		let temp = Math.round(value);
		let light = {
			id: this.props.metadata.id,
			sat: temp
		};
		this.props.actions.updateSaturation(light);
	}

	handleEffect() {
		console.log('inside loop')
		let temp = this.props.metadata.state.effect;
		if (temp === 'colorloop') {
			temp = 'none';
		} else {
			temp = 'colorloop';
		}
		let light = {
			id: this.props.metadata.id,
			effect: temp
		};
		this.props.actions.updateEffect(light);
	}

	selected() {
		if (this.state.selected) {
			return (
				<OptionsContainer>
					<div>
						<PickerContainer>
						<H5options>Color</H5options>
							<PickerWarpper>
								<HuePicker
									color={this.props.metadata.color}
									onChangeComplete = {(color) => this.handleColorChange(color)}
								/>
							</PickerWarpper>
						</PickerContainer>
						<SliderContainer>
							<H5options>Brightness</H5options>
							<Slider 
								sliderStyle={{margin:0}}
								defaultValue={this.props.metadata.state.bri}
								min={0}
								max={254}
								onChange={(event, value) => this.handleBrightnessChange(value)}
							/>
						</SliderContainer>
						<SliderContainer>
							<H5options>Saturation</H5options>
							<Slider sliderStyle={{margin:0}}
								defaultValue={this.props.metadata.state.sat}
								min={0}
								max={254}
								onChange={(event, value) => this.handleSaturationChange(value)}
							/>
						</SliderContainer>
						<ToggleContainer>
							<H5options>Color Loop</H5options>
							<div>
							<Toggle  
								defaultToggled={this.props.metadata.state.effect === 'colorloop'? true : false}
								onToggle={() => this.handleEffect()}
								toggled={this.props.metadata.state.effect === 'colorloop'? true : false}
							/>
							</div>
						</ToggleContainer>
					</div>
				</OptionsContainer>
			);
		} else {
			return ;
		}
	}

	render() {
		let colorSync = {
			color: this.props.metadata.color
		}
		return (
			<div ref={(node) => {this.node = node}}>
				<Light>
					<SelectedContainer>
						<H5>{this.props.metadata.name}</H5>
						<div>
							<Toggle 
								defaultToggled={this.props.metadata.state.on}
								toggled={this.props.metadata.state.on}
								onToggle={() => this.handleOnOff(!this.props.metadata.state.on)}
							/>
						</div>
					</SelectedContainer>
					{this.selected()}
				</Light>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		state: state.hues
	};
}

function matchDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch),
	};
}

export default connect(mapStateToProps, matchDispatchToProps)(HueLight);