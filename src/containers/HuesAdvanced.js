import React from 'react';
import styled from 'styled-components';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/hues';

const H5 = styled.h5`
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

const Content = styled.div`
	border: 1px #444444 solid;
	overflow-y: hidden;
	padding: 0;
	max-height: 50%;
	&:hover {
		overflow-y: scroll;
	}
	&::-webkit-scrollbar {
		display: none;
	}
`;

const MenuItem = styled.div`
	display: flex;
	align-items: center;
	background: #191919;
	padding: 1em 1.5em;
	border-bottom: solid 1px #444444;
`;

class HuesAdvanced extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Content>
				<MenuItem><H5>Scenes</H5></MenuItem>
				<MenuItem><H5>Voice</H5></MenuItem>
			</Content>
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

export default connect(mapStateToProps, matchDispatchToProps)(HuesAdvanced);