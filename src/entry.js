import React from "react";
import ReactDOM from "react-dom";
import {Route, Switch} from "react-router";
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk"
import logger from 'redux-logger'
import rootReducer  from './reducers';

import styled from 'styled-components';

import Home from "./containers/Home";
import Hues from "./containers/Hues";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const app = document.getElementById('app');
const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);

const Content = styled.div`
	display: flex;
	flex-direction: row;
`;

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<div>
				<Content>
					<Navigation/>
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route exact path="/hues" component={Hues}/>
					</Switch>
				</Content>
				<Footer/>
			</div>
		</HashRouter>
	</Provider>,
	app
);