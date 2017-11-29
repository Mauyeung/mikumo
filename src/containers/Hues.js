import React from 'react';
import styled from 'styled-components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/hues';
import HueLight from '../components/HueLight';
import HueGroup from '../components/HueGroup';
import HuesAdvanced from './HuesAdvanced';

const Page = styled.div`
	background-color: #212121;
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
	align-items: center;
	color: #f0f0f0;
	padding: 2em;
`;

const Ul = styled.ul`
	padding: 0;
	margin: 0;
`;

const Li = styled.li`
	list-style-type: none;
	margin: 0;
	padding: 0;
	display: table;
	width: 100%;
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

const Container = styled.div`
	width: 80%;
	height: 100%;
`;

const AdvancedContainer = styled.div`
	padding: 1em 0;
`;

const H3 = styled.h4`
	color: palevioletred;
	font-weight: 400;
	margin: 0.5em 0;
	margin-top: 1em;
	padding; 0;
`;

const H4 = styled.h5`
	color: white;
	font-weight: 400;
	margin: 0.5em 0;
	padding; 0;
	&:hover {
		cursor: pointer;
	}
`;

class Hues extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			advancedSelected: false,
		};
	}

	componentWillMount() {
		this.props.actions.initialize();
	}

	renderAvailableLights() {
		return this.props.state.lights.map((light) => {
			return (
				<Li><HueLight key={light.id} metadata={light}/></Li>
			);
		});
	}

	renderAvailableGroups() {
		return this.props.state.groups.map((group) => {
			return (
				<Li><HueGroup key={group.id} name={group.name}/></Li>
			);
		});
	}

	handleAdvancedSelected() {
		this.setState({advancedSelected: !this.state.advancedSelected});
	}

	renderAdvanced() {
		if (this.state.advancedSelected) {
			return (
				<HuesAdvanced/>
			);
		} else {
			return ;
		}
	}

	render() {
		return (
			<Page>
				<Container>
					<H3>Lights</H3>
					<Content>
						<Ul>{this.renderAvailableLights()}{this.renderAvailableLights()}{this.renderAvailableLights()}</Ul>
					</Content>
					<H3>Groups</H3>
					<Content>
						<Ul>{this.renderAvailableGroups()}</Ul>
					</Content>
					<AdvancedContainer>
						<H4 onClick={() => {this.handleAdvancedSelected()}}>Advanced</H4>
						{this.renderAdvanced()}
					</AdvancedContainer>
				</Container>
			</Page>
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
	}
}

export default connect(mapStateToProps, matchDispatchToProps)(Hues);