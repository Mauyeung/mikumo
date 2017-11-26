import React from "react";
import styled from 'styled-components';

const StyledFooter = styled.footer`
	background-color: #191919;
	display: flex;
	color: #f0f0f0;
	padding: 1.25em;
	@media only screen and (max-width: 425px) {
		flex-direction: column-reverse;
	}
`;

const H3 = styled.h3`
  color: palevioletred;
  font-weight: 400;
`;

export default class Footer extends React.Component {
	render() {
		return (
			<StyledFooter>
				<H3>© 2017 Mikumo</H3>
			</StyledFooter>
		);
	}
}