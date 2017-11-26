import React from "react";
import styled from 'styled-components';

const Page = styled.div`
	background-color: #2a2d32;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	height 100%;
	width: 100%;
	justify-content: center;
	align-items: center;
	color: #f0f0f0;
`;

const H1 = styled.h1`
	font-size: 15vw;
	font-weight: 200;
	margin-bottom: 0;
`;

const H3 = styled.h3`
 	font-weight: 400;
`;

const A = styled.a`
	padding: 0.5em;
	color: #f0f0f0;
	text-decoration: none;
	font-weight: bold;
`;

export default class Home extends React.Component {

	render() {
		return (
			<Page>
				<H1>mikumo</H1>
				<H3>A simple smart lights controller</H3>
				<p>Created by<A href="https://github.com/Mauyeung">@Mauyeung</A></p>
			</Page>
		);
	}
}