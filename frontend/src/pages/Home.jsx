import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Header from "../components/Header";

import ChartComponent from "../components/ChartComponent";
import LineChartComponent from "../components/LineChartComponent";

import { chart1DataCalc, chart2DataCalc } from "../utils/prepData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  console.log("HOme component", window.location.href);
  const [count, setCount] = useState(0);

  console.log("cookies", document);

  //Handle filter state through url:
  let [searchParams, setSearchParams] = useSearchParams({
    start: "2022-10-03",
    end: "2022-10-06",
    Age: null,
    Gender: null,
    Feature: "A",
  });

  const [selectedGender, setSelectedGender] = useState(
    searchParams.get("Gender")
  );
  const [selectedAge, setSelectedAge] = useState(searchParams.get("Age"));
  const [data, setData] = useState({});
  const [chart1Data, setchart1Data] = useState([]);
  const [chart2Data, setchart2Data] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(
    searchParams.get("Feature")
  );

  //state for date picker
  // const [startDate, setStartDate] = useState(new Date("2022-10-04"));
  // const [endDate, setEndDate] = useState(new Date("2022-10-04"));

  const [startDate, setStartDate] = useState(searchParams.get("start"));
  const [endDate, setEndDate] = useState(searchParams.get("end"));

  const [getData, setGetData] = useState(false);
  const [message, setMessage] = useState("");

  // console.log(
  //   startDate.toISOString().split("T")[0],
  //   endDate.toISOString().split("T")[0],
  //   message
  // );
  console.log(message);
  console.log(
    typeof searchParams.get("Age"),
    searchParams.get("Gender"),
    searchParams.get("Feature")
  );

  console.log(selectedAge, selectedGender, selectedFeature);

  const getdata = async () => {
    // const start = startDate.toISOString().split("T")[0];
    // const end = endDate.toISOString().split("T")[0];

    console.log("Fetching data");
    try {
      const res = await fetch(
        `http://localhost:3005/api/data/fetchdata?start=${startDate}&end=${endDate}`,
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
      console.log(data1);
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
  }, [getData]);

  useEffect(() => {
    console.log("data state", data);
    console.log(selectedAge, selectedGender, selectedFeature);
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
  }, [data, selectedAge, selectedGender, selectedFeature]);

  const handleFeatureSelection = (e) => {
    // console.log(e.name);
    // setSelectedFeature(e.name);

    setSearchParams((prev) => {
      prev.set("Feature", e.name);
      setSelectedFeature(e.name);
      return prev;
    });
  };

  const handleDatafetch = (date, method) => {
    console.log("event", method);
    console.log(
      "handleDatafetch",
      // date,
      // startDate,
      // endDate,
      new Date(date),
      new Date(endDate),
      method === "start" && date > new Date(endDate)
    );
    if (method === "start" && date > new Date(endDate)) {
      setMessage("End date should be greater than start date");
      setTimeout(() => setMessage(""), 3000);
    } else setGetData(!getData);
  };

  const handleDateChangeFn = (date, method) => {
    console.log("handleDateChangeFn", typeof method, method, date);
    const dateISO = date.toISOString().split("T")[0];
    if (method === "start") setStartDate(dateISO);
    else setEndDate(dateISO);
    handleDatafetch(date, method);
    setSearchParams((prev) => {
      prev.set(method, dateISO);
      return prev;
    });
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

  return (
    <div className="App">
      <Header />
      <h1>MERN Interactive Dashboard - {count}</h1>
      <div className="dashboard">
        <div className="filters">
          <div className="filter-item">
            <p>Age</p>
            <form className="filter-item-form">
              <div className="radio-item">
                <label>
                  <input
                    type="radio"
                    id="15-25"
                    name="filter-age"
                    value={"15-25"}
                    checked={searchParams.get("Age") === "15-25"}
                    onChange={(e) =>
                      setSearchParams((prev) => {
                        prev.set("Age", e.target.value);
                        setSelectedAge(e.target.value);
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
                    type="radio"
                    id=">25"
                    name="filter-age"
                    value=">25"
                    checked={searchParams.get("Age") === ">25"}
                    onChange={(e) =>
                      setSearchParams((prev) => {
                        prev.set("Age", e.target.value);
                        setSelectedAge(e.target.value);
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

          <div className="filter-item">
            <p>Gender</p>
            <form className="filter-item-form">
              <div className="radio-item">
                <label>
                  <input
                    type="radio"
                    id="male"
                    name="filter-gender"
                    value="Male"
                    checked={selectedGender === "Male"}
                    onChange={(e) =>
                      setSearchParams((prev) => {
                        prev.set("Gender", e.target.value);
                        setSelectedGender(e.target.value);
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
                    type="radio"
                    id="female"
                    name="filter-gender"
                    value="Female"
                    checked={selectedGender === "Female"}
                    onChange={(e) =>
                      setSearchParams((prev) => {
                        prev.set("Gender", e.target.value);
                        setSelectedGender(e.target.value);
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
            />
          </div>
          <div className="charts">
            <LineChartComponent chart2Data={chart2Data} />
          </div>
        </div>
      </div>
      <div className="share-btn-div">
        <button className="share-btn" onClick={() => copyToClip()}>
          Copy URL
        </button>
      </div>
    </div>
  );
}

export default Home;
