import React, { useEffect, useState } from "react";
import "./chartTest.css";
import BarChart from "./component/BarChart";
import LineChart from "./component/LineChart";
// import { UserData } from "./data";
import PieChart from "./component/PieChart";
import axios from "axios";

const ChartTest = () => {
  const [userData, setUserData] = useState(null);
  const [fetchData, setFetchData] = useState([]);
  const [fetchData2, setFetchData2] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({});

  const reapplyFilters = () => {
    let allFlNm = Object.keys(appliedFilters);
    let filterData = fetchData2;
    for (let i = 0; i < allFlNm.length; i++) {
      filterData = filterData.filter(
        (item) => item[allFlNm[i]] === appliedFilters[allFlNm[i]]
      );
    }

    setFetchData(filterData);
    refreshGraph(filterData);
  };

  const applyFilter = (key, value) => {
    appliedFilters[key] = value;
    setAppliedFilters(appliedFilters);

    reapplyFilters();

    // setFetchData(filterData);
    // refreshGraph(filterData);
  };

  const distinctValues = (key, data) => {
    let values = new Set(data.map((item) => item[key]));
    return Array.from(values);
  };

  const refreshGraph = (d) => {
    //refresh graph..
    console.log(d);
    setUserData({
      //setUserData..
      labels: d.map((item) => item.end_year),
      datasets: [
        {
          label: "Intensity",
          data: d.map((item) => item.intensity),
          backgroundColor: ["green", "red", "blue", "black", "gray"],
          borderColor: "black",
          borderWidth: 2,
        },
        {
          label: "Likelihood",
          data: d.map((item) => item.likelihood),
          backgroundColor: ["green", "red", "blue", "black", "gray"],
          borderColor: "black",
          borderWidth: 2,
        },
        {
          label: "Relevance",
          data: d.map((item) => item.relevance),
          backgroundColor: ["green", "red", "blue", "black", "gray"],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  };
  useEffect(() => {
    async function compnentDidMount() {
      let data = (await axios.get("http://localhost:81/query")).data;

      data = data.map((item) => {
        let date = new Date(item.added);
        item.year = date.getFullYear();
        return item;
      });

      setFetchData(data);
      setFetchData2(data);
      refreshGraph(data);
    }
    compnentDidMount();
  }, []);
  if (!userData) {
    return <></>; //use..
  }
  return (
    <div className="CHART">
      <div className="Dashboard">
        <h1>
          {" "}
          BlackCoffer <span> Dashboard</span>
        </h1>
      </div>
      <label htmlFor="Data-select">Data Visualization Dashboard:</label>
      {/* Intensity
Likelihood
Relevance
Year
Country
Topics
Region
City 
 */}
      <div className="drop_down">
        <select
          id="year-select"
          onChange={(e) => applyFilter("year", e.target.value)}
        >
          {distinctValues("year", fetchData2).map((value, i) => {
            return (
              <option key={i} value={value}>
                {value}
              </option>
            );
          })}
        </select>

        <select
          id="region-select"
          onChange={(e) => applyFilter("region", e.target.value)}
        >
          {distinctValues("region", fetchData2).map((value, i) => {
            return (
              <option key={i} value={value}>
                {value}
              </option>
            );
          })}
        </select>

        <select
          id="topic-select"
          onChange={(e) => applyFilter("topic", e.target.value)}
        >
          {distinctValues("topic", fetchData2).map((value, i) => {
            return (
              <option key={i} value={value}>
                {value}
              </option>
            );
          })}
        </select>

        {/* <select
          id="source-select"
          onChange={(e) => applyFilter("source", e.target.value)}
        >
          {distinctValues("source", fetchData2).map((value, i) => {
            return (
              <option key={i} value={value}>
                {value}
              </option>
            );
          })}
        </select> */}
      </div>
      <div style={{ width: 1000, height: 600 }}>
        <BarChart chartData={userData} />
      </div>
      <div style={{ width: 1000, height: 600 }}>
        <LineChart chartData={userData} />
      </div>
      <div style={{ width: 800, height: 600 }}>
        <PieChart chartData={userData} />
      </div>
    </div>
  );
};

export default ChartTest;
