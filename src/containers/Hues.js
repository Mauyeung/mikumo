import React from "react";
import styled from 'styled-components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/hues';
import HueLight from '../components/HueLight';

const Page = styled.div`
   background-color: #2a2d32;
   display: flex;
   flex-direction: column;
   height: 100vh;
   width: 100%;
   justify-content: center;
   align-items: center;
   color: #f0f0f0;
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
`;

class Hues extends React.Component {

  componentWillMount() {
    this.props.actions.findHueLights();
  }

  renderAvailableLights() {
    return this.props.state.lights.map((light) => {
      return (
        <HueLight key={light.id} id = {light.id} name={light.name} color={light.color}/>
      );
    });
  }

  render() {
    return (
    	<Page>
      	<h1>Currently Available Lights</h1>
        <Ul>{this.renderAvailableLights()}</Ul>
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