import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {PrivateRoute}  from './helpers/privateRoute';
import Header from "./components/header";

// const routing = (
// 	<Router>
// 	<nav className="navbar navbar-expand-lg navbar-light bg-light">
// 				<a className="navbar-brand" href="/">Demo App</a>
// 				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
// 					<span className="navbar-toggler-icon"></span>
// 				  </button>
// 				<div className="collapse navbar-collapse" id="navbarSupportedContent">
// 					<ul className="navbar-nav mr-auto">
// 					  <li className="nav-item active">						
// 						<Link className="nav-link" to="/">Home</Link>
// 					  </li>					  
// 					</ul>
// 				</div>  		  
// 			</nav>
// 			<Route exact path="/" component={App} />			
//   </Router>
// );

const routing = (
	<Router>
		<Header />
		<Route exact path="/" component={App} />			
  </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
