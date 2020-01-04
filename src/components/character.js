import React from "react";
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from "react-router-dom";
const Character = props => {
  return (
    <div className="col-sm-3">
      <div className="card">
        <img
          className="card-img-top"
          src={props.data.image}
          alt={props.data.name}
        />
        <div className="card-body">
          <h5 className="card-title">{props.data.name}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{props.data.id}</li>
            <li className="list-group-item">{props.data.status}</li>
            <li className="list-group-item">{props.data.species}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
Character.propTypes = {
    data: PropTypes.array
}
Character.defaultProps = {}
export default withRouter(Character);
