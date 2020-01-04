import React, {Component} from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
const config = require("../config/config");

class Header extends Component{
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: String,
      showData: [],
      currentPage: Number,
      paging: {}			
		};
		this.handleSearch = this.handleSearch.bind(this);
	}
	
	handleSearchChange(e){
		this.setState({searchTerm: e.target.value});
	}
	handleSearch(){
		console.log("EMail: " + this.state.searchTerm);
		// event.preventDefault();
		
    fetch(config.BASE_API_URL+'?name='+this.state.searchTerm)
    .then((results ) => {
      results.json().then((userlist) =>{
				console.log(userlist);
        this.setState({ showData: userlist.results }, function(){});
        this.setState({ paging: userlist.info }, function(){});          
      });         
    });    
  }

	render(){
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
					<form className="form-inline my-2 my-lg-0">
 					  <input className="form-control mr-sm-2" type="text" value={this.state.searchTerm} onChange={(e) =>this.handleSearchChange(e)} />
	 				  <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.handleSearch()} type="button">Search</button>
	 				</form>					
				</div>  		  
			</nav>			
		);
	}

	// render(){
	// 	return(
	// 		<nav className="navbar navbar-expand-lg navbar-light bg-light">
	// 			<a className="navbar-brand" href="#">Navbar</a>
	// 			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	// 				<span className="navbar-toggler-icon"></span>
	// 			  </button>
	// 			<div className="collapse navbar-collapse" id="navbarSupportedContent">
	// 				<ul className="navbar-nav mr-auto">
	// 				  <li className="nav-item active">
	// 					<a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
	// 				  </li>
	// 				  <li className="nav-item">
	// 					<a className="nav-link" href="#">Link</a>
	// 				  </li>
	// 				  <li className="nav-item dropdown">
	// 					<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	// 					  Dropdown
	// 					</a>
	// 					<div className="dropdown-menu" aria-labelledby="navbarDropdown">
	// 					  <a className="dropdown-item" href="#">Action</a>
	// 					  <a className="dropdown-item" href="#">Another action</a>
	// 					  <div className="dropdown-divider"></div>
	// 					  <a className="dropdown-item" href="#">Something else here</a>
	// 					</div>
	// 				  </li>
	// 				  <li className="nav-item">
	// 					<a className="nav-link disabled" href="#">Disabled</a>
	// 				  </li>
	// 				</ul>
	// 				<form className="form-inline my-2 my-lg-0">
	// 				  <input className="form-control mr-sm-2" type="text" />
	// 				  <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => this.handleSearch(e)} type="button">Search</button>
	// 				</form>
	// 			</div>  		  
	// 		</nav>
	// 	);
	// }
}

export default Header;