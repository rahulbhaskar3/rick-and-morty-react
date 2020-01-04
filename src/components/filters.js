import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
const axios = require("axios");
const config = require("../config/config");
const statusCodes = require("../config/statusCodes");
const errMessages = require("../config/errMessages");
class Filters extends Component {
  constructor(props) {
    super(props);
    console.log("filter component", this.props.filterData);
  }

  render() {
    return (
      <div className="left-nav">
        <aside className="col-sm-3">
          <div className="card">
            <article className="card-group-item">
              <header className="card-header">Gender</header>
              <div className="filter-content">
                <div className="card-body">
                  <form>
                    {this.props.filterData.gender.map(item => {
                      return (
                        <label className="form-check">
                          <input
                            className="form-check-input"
                            name="gender"
                            type="radio"
                            value={item}
                            onChange={ ()=> this.props.applyFilter({type:'gender', value:item})}
                          />
                          <span className="form-check-label">{item}</span>
                        </label>
                      );
                    })}
                  </form>
                </div>
              </div>
            </article>
            <article className="card-group-item">
              <header className="card-header">
                <h6 className="title">Species </h6>
              </header>
              <div className="filter-content">
                <div className="card-body">
                  {this.props.filterData.species.map(item => {
                    return (
                      <label className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="speciesFilter"
                          value={item}
                          onChange={ ()=> this.props.applyFilter({type:'species', value:item})}
                        />
                        <span className="form-check-label">{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </article>
            <article className="card-group-item">
              <header className="card-header">
                <h6 className="title">Origin </h6>
              </header>
              <div className="filter-content">
                <div className="card-body">
                  {this.props.filterData.origin.map(item => {
                    return (
                      <label className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="originFilter"
                          value={item}
                          onChange={ ()=> this.props.applyFilter({type:'origin', value:item})}
                        />
                        <span className="form-check-label">{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </article>
          </div>
        </aside>
      </div>
    );
  }
}
export default withRouter(Filters);
