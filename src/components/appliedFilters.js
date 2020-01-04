import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
// const axios = require("axios");
const config = require("../config/config");
// const statusCodes = require("../config/statusCodes");
// const errMessages = require("../config/errMessages");
class AppliedFilters extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("filter component", this.props.filterData);
      const filterHtml = this.props.filterData.map( (item, index) => {
        return <div class="alert alert-dismissible fade show" role="alert">
            {item.value}
            <button onClick={this.props.onClick} type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    })
    return (
      <div className="applied-filters-section">  
        <div className="heading-section">
            <h3>Filters</h3>
        </div>
        <div className="filter-items">
            {filterHtml}
        </div>        
      </div>
    );
  }
}
export default withRouter(AppliedFilters);
