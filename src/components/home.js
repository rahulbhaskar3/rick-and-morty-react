import React, { Component, useEffect } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import "../home.scss";
import Filters from "../components/filters";
import Character from "../components/character";
import AppliedFilters from "../components/appliedFilters";
const config = require("../config/config");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showData: [],
      currentPage: Number,
      paging: {},
      filters: {},
	  appliedFilters: [],
	  dataLoaded:false
    };
    this.appliedFilters = [];
    this.getFilteredResults = this.getFilteredResults.bind(this);
    console.log(this.state);
  }

  componentDidMount() {
    this.GetShowData();
  }

  GetShowData(pageNum = 0) {
    let URL;
    if (pageNum != "" && pageNum != 0) {
      URL = config.BASE_API_URL + "?page=" + pageNum;
    } else {
      URL = config.BASE_API_URL;
    }
    fetch(URL).then(results => {
      results.json().then(showDataList => {
        if(showDataList.results.length > 0){  
          
          let speciesFilter = [
            ...new Set(showDataList.results.map(data => data.species))
          ];
          let genderFilter = [
            ...new Set(showDataList.results.map(data => data.gender))
          ];
          let originFilter = [
            ...new Set(showDataList.results.map(data => data.origin.name))
          ];
          let allFilters = {
            species: speciesFilter,
            gender: genderFilter,
            origin: originFilter
          };
          this.setState({ showData: showDataList.results }, function() {});
          this.setState({ paging: showDataList.info }, function() {});
          this.setState({ currentPage: pageNum }, function() {});
          this.setState({ filters: allFilters }, function() {});
          this.setState({ dataLoaded: true }, function() {});
        }else{
          this.setState({ showData: [] }, function() {});
          this.setState({ paging: showDataList.info }, function() {});
          this.setState({ currentPage: 0 }, function() {});
          this.setState({ filters: {} }, function() {});
          this.setState({ dataLoaded: false }, function() {});          
        }
      });
    });
  }

  getFilteredResults(filterVal) {
    let appliedFiltersLen = this.appliedFilters.length > 0 ? this.appliedFilters.push(filterVal) : '';
    if(appliedFiltersLen > 0){
      const exists = this.appliedFilters.some(item => item.type === filterVal.type);
      if(exists){
        console.log('exists');
        this.appliedFilters.map((item, index) => {
          if(item.type === filterVal.type){
            item.value = filterVal.value;
          }
        });
      }else{
        this.appliedFilters.push(filterVal);
      }
    }else{
      this.appliedFilters.push(filterVal);
    }
    this.setState({ appliedFilters: this.appliedFilters}, function() {
      console.log(this.state.appliedFilters);
      let filterURL = this.constructUrl(this.state.appliedFilters);
      this.callFilterHandler(filterURL);
    });
    
  }

  callFilterHandler(URL, pageNum=0){
    console.log(URL);
    fetch(URL).then(results => {
      results.json().then(showDataList => {
        console.log(showDataList);
        this.setState({ showData: showDataList.results }, function() {});
        this.setState({ paging: showDataList.info }, function() {});
        this.setState({ currentPage: pageNum }, function() {});
        this.setState({ dataLoaded: true }, function() {});
      });
    });
  }

  constructUrl(filters){
    let qs = '';let filterURL='';
    for(var key in filters) {
      // console.log(filters[key].type);
      let filterType = filters[key].type;
      let filterValue = filters[key].value;
      console.log(filterType, filterValue);
      // if(qs.indexOf(filterType) !== -1)
      qs += encodeURIComponent(filterType) + "=" + encodeURIComponent(filterValue) + "&";

      console.log('qs', qs);
    }
    if (qs.length > 0){
      qs = qs.substring(0, qs.length-1); //chop off last "&"
      filterURL = filterURL + "?" + qs;
    }

    console.log(filterURL);
    return config.BASE_API_URL+filterURL

  }

  removeFilter(filterVal){ alert('remove');
    console.log(filterVal);
  }

  render() {
    let renderPageNumbers = '';
    console.log(this.state.paging);
    if(Object.entries(this.state.paging).length !== 0){
      let pageNumberState = this.state.paging.pages;
      const pageNumbers = [];
      for (let i = 1; i <= pageNumberState; i++) {
        pageNumbers.push(i);
      }  
    
      renderPageNumbers = pageNumbers.map(number => {
        return (
          <li
            className={
              this.state.currentPage === number ? "active page-item" : "page-item"
            }
            key={number}
            id={number}
          >
            <a
              className="page-link"
              title={config.BASE_API_URL + "?page=" + number}
              onClick={() => this.GetShowData(number)}
              href="javascript:void(0)"
            >
              {number}
            </a>
          </li>
        );
      });
    }
    // [ ID, Name, Status, Species, Gender, Image, Created, Origin, Last Location, etc]
    return (
      <div className="card-container">
        {
          Object.entries(this.state.appliedFilters).length !== 0 ? 
            <AppliedFilters filterData={this.state.appliedFilters}  onClick={this.removeFilter(this.state.appliedFilters)}  /> : 
            null
        }
        
        {
			    this.state.dataLoaded?
			    <Filters filterData={this.state.filters} applyFilter={this.getFilteredResults} />:null
    		}

        <div className="product-section">
          {this.state.showData.map((listValue, index) => {
            let divStyle = { width: "18rem" };
            return <Character data={listValue} />;
          })}
        </div>
        <nav aria-label="Page navigation example" className="pagination-custom">
          {renderPageNumbers !== '' ? <ul className="pagination">{renderPageNumbers}</ul> : null}
        </nav>
      </div>
    );
  }
}

export default withRouter(Home);
