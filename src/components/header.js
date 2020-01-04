import React from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
const config = require("../config/config");

const Header = () => {
	return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" href="javascript:void(0)">Demo App</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
					</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">						
						<Link className="nav-link" to="/">Home</Link>
						</li>					  
					</ul>				
				</div>  		  
			</nav>			
		);		
};

export default Header;