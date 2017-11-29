import React from "react";
import styled from 'styled-components';
import {HuePicker} from 'react-color';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/hues';

const H3 = styled.h3`
	font-weight: 400;
	margin: 0;
	padding; 0;
	flex-grow: 1;
`;

const Group = styled.div`
	display: flex;
	align-items: center;
	background: #191919;
	padding: 1em 1.5em;
	border-bottom: solid 1px #444444;
`;

class HueGroup extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Group>
				<H3>{this.props.name}</H3>
			</Group>
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

export default connect(mapStateToProps, matchDispatchToProps)(HueGroup);