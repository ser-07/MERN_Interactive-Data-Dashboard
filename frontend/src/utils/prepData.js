// const data = `{"Day":"4/10/2022","Age":"15-25","Gender":"Male","A":"790","B":"39","C":"76","D":"503","E":"629","F":"60"}`;

// const data = [
//     {
//       Day: "4/10/2022",
//       Age: "15-25",
//       Gender: "Male",
//       A: "790",
//       B: "39",
//       C: "76",
//       D: "503",
//       E: "629",
//       F: "60"
//     },
//     {
//       Day: "4/10/2022",
//       Age: ">25",
//       Gender: "Male",
//       A: "924",
//       B: "315",
//       C: "926",
//       D: "910",
//       E: "729",
//       F: "13"
//     },
//     {
//       Day: "5/10/2022",
//       Age: "15-25",
//       Gender: "Male",
//       A: "798",
//       B: "382",
//       C: "693",
//       D: "628",
//       E: "786",
//       F: "261"
//     }
//   ];

// console.log(typeof data, data);
// const dataJson = JSON.parse(data);

//Get these from parent component
//   let selectedGender = "Male"; //null, make or female
//   let selectedAge = "15-25"; // null, 15-25 or >25
//   let selectedFeature = "B"; //A, B, C, D, E, F

//char2Data needs to be recalculated if selectedFeature changes
//Chart1Data needs to be recalculated if Age or Geneder changes

//If date range is changed, the data needs to be fetched from backend and both Chart1Data and Chart2Data needs to be calculated.

export const chart1DataCalc = (data, selectedAge, selectedGender) => {
  console.log("data from prepData.js", data);
  console.log("prepData.js", selectedAge, selectedGender);

  let chart1Data = new Map([
    ["A", 0],
    ["B", 0],
    ["C", 0],
    ["D", 0],
    ["E", 0],
    ["F", 0],
  ]);

  // console.log(chart1Data);

  //Chart1data Calc:
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i]);
    for (const [key, value] of Object.entries(data[i])) {
      // console.log(`Key: ${key}, Value: ${value}`);
      //Check for the value of Age is matching the selected Age when the key is Age. Same with Gender
      //   if (key === "Age" && value !== selectedAge) break;
      //   if (key === "Gender" && value !== selectedGender) break;

      //bug fix to accept null values in params:
      if (
        key === "Age" &&
        (selectedAge === null ? false : value !== selectedAge)
      )
        break;
      if (
        key === "Gender" &&
        (selectedGender === null ? false : value !== selectedGender)
      )
        break;

      // console.log(key, value);
      if (key !== "Day" && key !== "Age" && key !== "Gender" && key !== "_id")
        chart1Data.set(key, chart1Data.get(key) + Number(value));
    }
  }
  //   console.log("utils-chart1Data", chart1Data);

  //Convert into format needed for recharts
  const data1arr = Array.from(chart1Data, ([key, value]) => {
    return { name: key, value: value };
  });

  console.log("utils-data1arr", data1arr);
  return data1arr;
};

export const chart2DataCalc = (
  data,
  selectedAge,
  selectedGender,
  selectedFeature
) => {
  let chart2Data = new Map();
  //Chart2data Calc:
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i]);
    let date = "";
    for (const [key, value] of Object.entries(data[i])) {
      //   console.log(`Key: ${key}, Value: ${value}`);
      //Add day to the Map. If date does not exist, add the date with value 0
      if (key === "Day") {
        // console.log(chart2Data.has(key));
        if (!chart2Data.has(value)) {
          chart2Data.set(value, 0);
        }
        // chat2Data.set(key, chart2Data.get(value)+Number(value));
        date = value;
        // console.log(date, chart2Data.get(date));
        continue;
      }
      //Check for the value of Age is matching the selected Age when the key is Age. Same with Gender
      //   if (key === "Age" && value !== selectedAge) break;
      //   if (key === "Gender" && value !== selectedGender) break;
      //Bug fix to accept null values
      if (
        key === "Age" &&
        (selectedAge === null ? false : value !== selectedAge)
      )
        break;
      if (
        key === "Gender" &&
        (selectedGender === null ? false : value !== selectedGender)
      )
        break;
      //Check for the value of Age is matching the selected Age when the key is Age. Same with Gender
      if (key !== selectedFeature) continue;
      //   console.log("Here");
      // console.log(date, chart2Data.get(date));
      //Add the value of the selected feature:
      chart2Data.set(date, chart2Data.get(date) + Number(value));
    }
    // date = "";
    // console.log(chart2Data);
  }

  //   console.log("utils-char2data", chart2Data);

  //   for (const [key, value] of Object.entries(data[i])) {
  //     console.log(`Key: ${key}, Value: ${value}`);
  //   }

  // CONVERT data1 and data2 into below format

  const data2arr = Array.from(chart2Data, ([key, value]) => {
    return { name: key, value: value };
  });
  console.log("utils-data2arr", data2arr);
  return data2arr;
};

//const data = [ {name : 'A' ,value: '1588'}, {name: 'B', value: '200'} ];
