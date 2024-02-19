import { useState, useEffect } from "react";
import Header from "../components/Header";

function Home() {
  console.log("HOme component");
  const [count, setCount] = useState(0);
  const getdata = async () => {
    try {
      const res = await fetch(
        "http://localhost:3005/api/data/fetchdata?start=2022-10-04&end=2022-10-04",
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
      )
        .then((res) => res.json())
        .then((data) => data);

      console.log(res);
      setCount(res.length);
    } catch (error) {
      console.log(`Error while fetching ${error}`);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="App">
      <Header />
      <h1>MERN Interactive Dashboard - {count}</h1>
    </div>
  );
}

export default Home;
