import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
	background-color: #191919;
	color: #f0f0f0;
	padding: 0;
	margin: 0;
	font-size: 1.3em;
	font-weight: 100;
`;

const Ul = styled.ul`
	padding: 3em;
	margin: 0;
	justify-content: center;
	align-items: center;
`;

const Li = styled.li`
	list-style-type: none;
	padding: 1em 0;
	margin: 0;
	display: table;
`;

const activeClassName = 'active';
const StyledLink = styled(NavLink).attrs({
	activeClassName
})`
	padding: 0;
	margin: 0;
	color: #f0f0f0;
	text-decoration: none;
	&:hover {
		color: white;
	}
	&.${activeClassName} {
		font-weight: 400;
		color: white;
	}
	display: table-cell;
`;

export default class Navigation extends React.Component {
	render() {
		return (
			<StyledNav>
				<Ul>
					<Li><StyledLink to='/'>Home</StyledLink></Li>
					<Li><StyledLink to='/hues'>Hues</StyledLink></Li>
				</Ul>
			</StyledNav>
		);
	}
}