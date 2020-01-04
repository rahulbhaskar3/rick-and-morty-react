import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const AppliedFilters = props => {

  return (
    <div className="applied-filters-section">
      <div className="heading-section">
        <h3>Filters</h3>
      </div>
      <div className="filter-items">
        {props.filterData.map((item, key) => {
          return (
            <div key={key} className="alert alert-dismissible fade show" role="alert">
              {item.value}
              <button
                onClick={ ()=>props.removeFilter(item)}
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withRouter(AppliedFilters);
