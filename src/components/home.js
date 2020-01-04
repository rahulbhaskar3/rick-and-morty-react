import React, { Component, useEffect, useState } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import "../home.scss";
import Filters from "../components/filters";
import Character from "../components/character";
import AppliedFilters from "../components/appliedFilters";
const config = require("../config/config");

const Home = () => {
  const [showData, setShowData] = useState([]);
  const [appliedFilters, setAppliedFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [paging, setPaging] = useState({});
  const [filters, setFilters] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    GetShowData();
  }, []);

  const GetShowData = (pageNum = 0) => {
    let URL;
    if (pageNum != "" && pageNum != 0) {
      URL = config.BASE_API_URL + "?page=" + pageNum;
    } else {
      URL = config.BASE_API_URL;
    }
    fetch(URL).then(results => {
      results.json().then(showDataList => {
        if (showDataList.results.length > 0) {
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

          setShowData(showDataList.results);
          setPaging(showDataList.info);
          setCurrentPage(pageNum);
          setFilters(allFilters);
          setDataLoaded(true);
        }
      });
    });
  };

  const getFilteredResults = filterVal => {
    // console.log(filterVal);

    // case 1 when collection is blank
    // case 2, when type same, but value same
    // case 3, when type same , but value different
    // case 4, when type different, value different

    if (appliedFilters.length == 0) {
      setAppliedFilter([...appliedFilters].concat([filterVal]));
    } else {
      let getTypes = appliedFilters.map(item => item.type);
      let getValues = appliedFilters.map(item => item.value);

      if (getTypes.includes(filterVal.type)) {
        if (getValues.includes(filterVal.value)) {
          //case 3 nothing todo
        } else {
          setAppliedFilter(
            [
              ...appliedFilters.filter(item => item.value == filterVal.value)
            ].concat([filterVal])
          );
        }
      } else {
        //case 4
        setAppliedFilter([...appliedFilters].concat([filterVal]));
      }
    }

    console.log(appliedFilters);
    callFilterHandler(constructUrl(appliedFilters));
  };

  const callFilterHandler = (URL, pageNum = 0) => {
    // console.log(URL);
    fetch(URL).then(results => {
      results.json().then(showDataList => {
        // console.log(showDataList);

        setShowData(showDataList.results);
        setPaging(showDataList.info);
        setCurrentPage(pageNum);
      });
    });
  };

  const constructUrl = filters => {
    let qs = "";
    let filterURL = "";
    for (var key in filters) {
      // console.log(filters[key].type);
      let filterType = filters[key].type;
      let filterValue = filters[key].value;
      // console.log(filterType, filterValue);
      // if(qs.indexOf(filterType) !== -1)
      qs +=
        encodeURIComponent(filterType) +
        "=" +
        encodeURIComponent(filterValue) +
        "&";

      // console.log("qs", qs);
    }
    if (qs.length > 0) {
      qs = qs.substring(0, qs.length - 1); //chop off last "&"
      filterURL = filterURL + "?" + qs;
    }

    // console.log(filterURL);
    return config.BASE_API_URL + filterURL;
  };

  const removeFilter = item => {
    console.log(appliedFilters, item);

    // this.setState(
    //   {
    //     appliedFilters: this.state.appliedFilters.filter(
    //       i => i.type != item.type && i.value != item.value
    //     )
    //   },
    //   function() {}
    // );
    setAppliedFilter(
      appliedFilters.filter(i => i.type != item.type && i.value != item.value)
    );
  };

  {
    let renderPageNumbers = "";
    if (Object.entries(paging).length !== 0) {
      let pageNumberState = paging.pages;
      const pageNumbers = [];
      for (let i = 1; i <= pageNumberState; i++) {
        pageNumbers.push(i);
      }

      renderPageNumbers = pageNumbers.map(number => {
        return (
          <li
            className={
              currentPage === number ? "active page-item" : "page-item"
            }
            key={number}
            id={number}
          >
            <a
              className="page-link"
              title={config.BASE_API_URL + "?page=" + number}
              onClick={() => GetShowData(number)}
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
        {Object.entries(appliedFilters).length !== 0 ? (
          <AppliedFilters
            filterData={appliedFilters}
            removeFilter={removeFilter}
          />
        ) : null}

        {dataLoaded ? (
          <Filters filterData={filters} applyFilter={getFilteredResults} />
        ) : null}

        <div className="product-section">
          {showData.map((listValue, index) => {
            let divStyle = { width: "18rem" };
            return <Character data={listValue} />;
          })}
        </div>
        <nav aria-label="Page navigation example" className="pagination-custom">
          {renderPageNumbers !== "" ? (
            <ul className="pagination">{renderPageNumbers}</ul>
          ) : null}
        </nav>
      </div>
    );
  }
};

export default withRouter(Home);
