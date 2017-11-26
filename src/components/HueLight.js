import React from "react";
import styled from 'styled-components';
import {HuePicker} from 'react-color';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/hues';

class HueLight extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			background: this.props.color,
		};
	}

	handleChange(color, event) {
		this.setState({background: color.hex});
		let light = {
			id: this.props.id,
			color: color.hex
		};
		this.props.actions.updateColor(light);
	}

	render() {
		return (
			<div>
				<h3>{this.props.name}</h3>
				<HuePicker
					color = {this.state.background}
					onChangeComplete = {(color, event) => this.handleChange(color, event)}
				/>
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