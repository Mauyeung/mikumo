import React from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {HuePicker} from 'react-color';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/hues';

const H4 = styled.h4`
	font-weight: 400;
	margin: 0;
	padding; 0;
	flex-grow: 1;
`;

const H4v2 = styled.h4`
	font-weight: 300;
	margin: 0;
	padding; 0;
	flex-grow: 1;
`;

const Light = styled.div`
	align-items: center;
	background: #191919;
	padding: 1em 1.5em;
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
			color: this.props.metadata.color,
			effect: this.props.metadata.state.effect,
			on: this.props.metadata.state.on,
			bri: this.props.metadata.state.bri,
			sat: this.props.metadata.state.sat,
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
		this.setState({color: color.hex});
		let light = {
			id: this.props.metadata.id,
			color: color.hex
		};
		this.props.actions.updateColor(light);
	}

	handleOnOff(value) {
		this.setState({on: value});
		let light = {
			id: this.props.metadata.id,
			on: value
		};
		this.props.actions.updateOnOff(light);
	}

	handleBrightnessChange(value) {
		let temp = Math.round(value);
		this.setState({bri: temp});
		let light = {
			id: this.props.metadata.id,
			bri: temp
		};
		this.props.actions.updateBrightness(light);
	}

	handleSaturationChange(value) {
		let temp = Math.round(value);
		this.setState({sat: temp});
		let light = {
			id: this.props.metadata.id,
			sat: temp
		};
		this.props.actions.updateSaturation(light);
	}

	handleEffect() {
		let temp = this.state.effect;
		console.log(temp);
		if (temp === 'colorloop') {
			temp = 'none';
		} else {
			temp = 'colorloop';
		}
		this.setState({effect: temp});
		console.log(this.state.effect);
		let light = {
			id: this.props.metadata.id,
			effect: temp
		};
		console.log(light);
		this.props.actions.updateEffect(light);
	}

	selected() {
		if (this.state.selected) {
			return (
				<OptionsContainer>
					<div>
						<PickerContainer>
						<H4v2>Color</H4v2>
							<PickerWarpper>
								<HuePicker
									color={this.state.color}
									onChangeComplete = {(color) => this.handleColorChange(color)}
								/>
							</PickerWarpper>
						</PickerContainer>
						<SliderContainer>
							<H4v2>Brightness</H4v2>
							<Slider 
								sliderStyle={{margin:0}}
								defaultValue={this.state.bri}
								min={0}
								max={254}
								onChange={(event, value) => this.handleBrightnessChange(value)}
							/>
						</SliderContainer>
						<SliderContainer>
							<H4v2>Saturation</H4v2>
							<Slider sliderStyle={{margin:0}}
								defaultValue={this.state.sat}
								min={0}
								max={254}
								onChange={(event, value) => this.handleSaturationChange(value)}
							/>
						</SliderContainer>
						<ToggleContainer>
							<H4v2>Color Loop</H4v2>
							<div>
							<Toggle  
								defaultToggled={this.state.effect === 'colorloop'? true : false}
								onToggle={() => this.handleEffect()}
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
			color: this.state.color
		}
		return (
			<div ref={(node) => {this.node = node}}>
				<Light>
					<SelectedContainer>
						<H4>{this.props.metadata.name}</H4>
						<div>
							<Toggle 
								defaultToggled={this.state.on}
								trackSwitchedStyle={{backgroundColor: this.state.color}}
								thumbSwitchedStyle={{backgroundColor: '#f0f0f0'}}
								onToggle={() => this.handleOnOff(!this.state.on)}
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