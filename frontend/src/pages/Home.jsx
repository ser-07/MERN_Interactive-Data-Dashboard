import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";

import Header from "../components/Header";

import ChartComponent from "../components/ChartComponent";
import LineChartComponent from "../components/LineChartComponent";
import LineChartExtComponent from "../components/LineChartExtComponent";

import { chart1DataCalc, chart2DataCalc } from "../utils/prepData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  // console.log("HOme component", window.location.href);
  const [count, setCount] = useState(0);

  // Cookies.set("language", "english");
  // console.log("cookies", document.cookie);
  console.log("Cookies from Home.js", Cookies.get());

  let [searchParams, setSearchParams] = useSearchParams({
    start:
      Cookies.get("cfilter_start") === undefined
        ? "2022-10-03"
        : Cookies.get("cfilter_start"),

    end:
      Cookies.get("cfilter_end") === undefined
        ? "2022-10-06"
        : Cookies.get("cfilter_end"),
    Age:
      Cookies.get("cfilter_age") === undefined
        ? null
        : Cookies.get("cfilter_age"),
    Gender:
      Cookies.get("cfilter_gender") === undefined
        ? null
        : Cookies.get("cfilter_gender"),
    Feature:
      Cookies.get("cfilter_Feature") === undefined
        ? "A"
        : Cookies.get("cfilter_Feature"),
  });

  const [selectedGender, setSelectedGender] = useState(
    searchParams.get("Gender") === null
      ? Cookies.get("cfilter_gender")
      : searchParams.get("Gender")
  );

  const [selectedAge, setSelectedAge] = useState(
    searchParams.get("Age") === null
      ? Cookies.get("cfilter_age")
      : searchParams.get("Age")
  );

  const [data, setData] = useState({});
  const [chart1Data, setchart1Data] = useState([]);
  const [chart2Data, setchart2Data] = useState([]);

  const [selectedFeature, setSelectedFeature] = useState(
    searchParams.get("Feature") === null
      ? Cookies.get("cfilter_Feature")
      : searchParams.get("Feature")
  );

  const [selectedTest, setSelectedTest] = useState(null);

  //State to store the color data for chart1 - Selected feature:
  const [chartColorData, setChartColorData] = useState([
    "#1f77b4",
    "#ff7f0e",
    "#ff7f0e",
    "#ff7f0e",
    "#ff7f0e",
    "#ff7f0e",
  ]);

  //state for date picker
  // const [startDate, setStartDate] = useState(new Date("2022-10-04"));
  // const [endDate, setEndDate] = useState(new Date("2022-10-04"));

  const [startDate, setStartDate] = useState(
    searchParams.get("start") === undefined
      ? Cookies.get("cfilter_start")
      : searchParams.get("start")
  );

  const [endDate, setEndDate] = useState(
    searchParams.get("end") === undefined
      ? Cookies.get("cfilter_end")
      : searchParams.get("end")
  );

  const [getData, setGetData] = useState(false);
  const [message, setMessage] = useState("");

  // console.log(
  //   startDate.toISOString().split("T")[0],
  //   endDate.toISOString().split("T")[0],
  //   message
  // );
  // console.log(message);
  // console.log(
  //   typeof searchParams.get("Age"),
  //   searchParams.get("Gender"),
  //   searchParams.get("Feature")
  // );

  console.log(
    "state values:",
    selectedAge,
    selectedGender,
    selectedFeature,
    startDate,
    endDate
  );

  console.log(
    "search Param values",
    searchParams.get("Age"),
    searchParams.get("Gender"),
    searchParams.get("Feature"),
    searchParams.get("start"),
    searchParams.get("end")
  );

  console.log(
    "Cookie values",
    Cookies.get("cfilter_age"),
    Cookies.get("cfilter_gender"),
    Cookies.get("cfilter_Feature"),
    Cookies.get("cfilter_start"),
    Cookies.get("cfilter_end")
  );

  const getdata = async () => {
    // const start = startDate.toISOString().split("T")[0];
    // const end = endDate.toISOString().split("T")[0];

    // console.log("Fetching data");
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/data/fetchdata?start=${startDate}&end=${endDate}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      // .then((res) => res.json())
      // .then((data) => {
      //   // data
      //   setData(data);
      //   return data;
      // });
      const data1 = await res.json();
      // console.log(data1);
      setData(data1);

      // console.log("data state", data);
      // setCount(res.length);

      // setCount(data.length);
      // setchart1Data(chart1DataCalc(data, selectedAge, selectedGender));
      // setchart2Data(chart2DataCalc(data, selectedAge, selectedGender, "A"));
      // console.log("data returned from prepData.js", chart1Data, chart2Data);
    } catch (error) {
      console.log(`Errord while fetching ${error}`);
    }
  };

  useEffect(() => {
    getdata();
    // const data1 = getdata();
    // setData(data1);
    setSearchParams(searchParams);
    handleSetCookies();
    handleChartColor(selectedFeature);
  }, [getData]);

  useEffect(() => {
    console.log("data state", data);
    // console.log(selectedAge, selectedGender, selectedFeature);
    setCount(data.length);
    const d1 = chart1DataCalc(data, selectedAge, selectedGender);
    const d2 = chart2DataCalc(
      data,
      selectedAge,
      selectedGender,
      selectedFeature
    );
    setchart1Data(d1);
    setchart2Data(d2);
    // console.log(
    //   "data returned from prepData.js",
    //   chart1Data,
    //   chart2Data,
    //   d1,
    //   d2
    // );
    // Cookies.set("searchParams", window.location.href);
  }, [data, selectedAge, selectedGender, selectedFeature]);

  const handleSetCookies = () => {
    Cookies.set("cfilter_age", searchParams.get("Age"));
    Cookies.set("cfilter_gender", searchParams.get("Gender"));
    Cookies.set("cfilter_Feature", searchParams.get("Feature"));
    Cookies.set("cfilter_start", searchParams.get("start"));
    Cookies.set("cfilter_end", searchParams.get("end"));
  };

  const handleChartColor = (featStr) => {
    let tempChartColorData = [
      "#ff770e",
      "#ff7f0e",
      "#ff7f0e",
      "#ff7f0e",
      "#ff7f0e",
      "#ff7f0e",
    ];

    tempChartColorData[featStr.charCodeAt(0) - 65] = "#1f77b4";
    setChartColorData(tempChartColorData);
  };

  const handleFeatureSelection = (e) => {
    // console.log(e.name, typeof e.name, e.name.charCodeAt(0) - 65);

    handleChartColor(e.name);

    setSearchParams((prev) => {
      prev.set("Feature", e.name);
      setSelectedFeature(e.name);
      return prev;
    });

    Cookies.set("cfilter_Feature", e.name);
  };

  const handleDatafetch = (date, method) => {
    // console.log("event", method);
    // console.log(
    //   "handleDatafetch",
    //   // date,
    //   // startDate,
    //   // endDate,
    //   new Date(date),
    //   new Date(endDate),
    //   method === "start" && date > new Date(endDate)
    // );
    if (method === "start" && date > new Date(endDate)) {
      setMessage("End date should be greater than start date");
      toast.warn("End date should be greater than start date", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: { "font-size": "20px", "font-weight": "700" },
      });
      setTimeout(() => setMessage(""), 3000);
    } else setGetData(!getData);
  };

  const handleDateChangeFn = (date, method) => {
    // console.log("handleDateChangeFn", typeof method, method, date);
    const dateISO = date.toISOString().split("T")[0];
    if (method === "start") {
      setStartDate(dateISO);
      Cookies.set("cfilter_start", dateISO);
    } else {
      setEndDate(dateISO);
      Cookies.set("cfilter_end", dateISO);
    }
    handleDatafetch(date, method);
    setSearchParams((prev) => {
      prev.set(method, dateISO);
      return prev;
    });
    // Cookies.set("cfilter_start", e.name)
  };

  const copyToClip = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("URL Copied to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: { "font-size": "20px", "font-weight": "700" },
    });
  };

  const handleClearCookie = () => {
    // console.log("Clear cookie button clicked");
    // console.log(Cookies.get());
    const x = Cookies.get();

    for (const [key, value] of Object.entries(x)) {
      // console.log("key", key, typeof key);
      Cookies.remove(key);
    }

    toast.success("Cookies are cleared!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: { "font-size": "20px", "font-weight": "700" },
    });
  };

  // console.log("XXXXXX", chart1Data, chart2Data);

  return (
    <div className="App">
      <Header />
      <h1>MERN Interactive Dashboard</h1>
      <div className="dashboard">
        <div className="filters">
          <div className="filter-item filter-item-Age">
            <p>Age</p>
            <form className="filter-item-form">
              <div className="radio-item">
                <label>
                  <input
                    type="checkbox"
                    id="15-25"
                    name="filter-age"
                    value={"15-25"}
                    checked={searchParams.get("Age") === "15-25"}
                    onClick={(e) =>
                      //Check if the previous Age value for cookie, state and search params are the same as the current selection. If yes, make all of them null
                      setSearchParams((prev) => {
                        if (prev.get("Age") !== e.target.value) {
                          prev.set("Age", e.target.value);
                          Cookies.set("cfilter_age", e.target.value);
                        } else {
                          prev.set("Age", null);
                          Cookies.set("cfilter_age", null);
                        }

                        setSelectedAge((prev) =>
                          prev === e.target.value ? "null" : e.target.value
                        );
                        return prev;
                      })
                    }
                  />
                  15-25
                </label>
              </div>

              <div className="radio-item">
                <label>
                  <input
                    type="checkbox"
                    id=">25"
                    name="filter-age"
                    value=">25"
                    checked={searchParams.get("Age") === ">25"}
                    onClick={(e) =>
                      //Check if the previous Age value for cookie, state and search params are the same as the current selection. If yes, make all of them null
                      setSearchParams((prev) => {
                        if (prev.get("Age") !== e.target.value) {
                          prev.set("Age", e.target.value);
                          Cookies.set("cfilter_age", e.target.value);
                        } else {
                          prev.set("Age", null);
                          Cookies.set("cfilter_age", null);
                        }

                        setSelectedAge((prev) =>
                          prev === e.target.value ? "null" : e.target.value
                        );
                        return prev;
                      })
                    }
                  />
                  {">25"}
                </label>
              </div>
            </form>
          </div>
          <div className="date-filter">
            <span>StartDate: </span>
            <DatePicker
              selected={startDate}
              // name="start"
              onChange={(date) => handleDateChangeFn(date, "start")}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="YYYY-MM-dd"
            />
            <span>End Date:</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => handleDateChangeFn(date, "end")}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="YYYY-MM-dd"
              // className={`${startDate > endDate ? "red" : ""}`}
            />
          </div>

          <div className="filter-item filter-item-Gender">
            <p>Gender</p>
            <form className="filter-item-form">
              <div className="radio-item">
                <label>
                  <input
                    type="checkbox"
                    id="male"
                    name="filter-gender"
                    value="Male"
                    checked={selectedGender === "Male"}
                    onClick={(e) =>
                      //Check if the previous gender value for cookie, state and search params are the same as the current selection. If yes, make all of them null
                      setSearchParams((prev) => {
                        if (prev.get("Gender") !== e.target.value) {
                          prev.set("Gender", e.target.value);
                          Cookies.set("cfilter_gender", e.target.value);
                        } else {
                          prev.set("Gender", null);
                          Cookies.set("cfilter_gender", null);
                        }

                        setSelectedGender((prev) =>
                          prev === e.target.value ? "null" : e.target.value
                        );
                        return prev;
                      })
                    }
                  />
                  male
                </label>
              </div>

              <div className="radio-item">
                <label>
                  <input
                    type="checkbox"
                    id="female"
                    name="filter-gender"
                    value="Female"
                    checked={selectedGender === "Female"}
                    onClick={(e) =>
                      //Check if the previous gender value for cookie, state and search params are the same as the current selection. If yes, make all of them null
                      setSearchParams((prev) => {
                        if (prev.get("Gender") !== e.target.value) {
                          prev.set("Gender", e.target.value);
                          Cookies.set("cfilter_gender", e.target.value);
                        } else {
                          prev.set("Gender", null);
                          Cookies.set("cfilter_gender", null);
                        }

                        setSelectedGender((prev) =>
                          prev === e.target.value ? "null" : e.target.value
                        );
                        return prev;
                      })
                    }
                  />
                  female
                </label>
              </div>
            </form>
          </div>
        </div>
        <div className="chart-div">
          <div className="charts">
            <ChartComponent
              chart1Data={chart1Data}
              // handleFeatureSelection={(e) => handleFeatureSelection(e)
              handleFeatureSelection={handleFeatureSelection}
              chartColorData={chartColorData}
            />
          </div>
          <div className="charts">
            {chart2Data.length > 0 ? (
              <LineChartExtComponent chart2Data={chart2Data} />
            ) : null}
          </div>
        </div>
      </div>
      <div className="btn-container">
        <div className="share-btn-div">
          <button className="share-btn" onClick={() => copyToClip()}>
            Copy URL
          </button>
        </div>
        <div className="clear-cookie-btn-div">
          <button onClick={handleClearCookie}>Clear Cookies</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
