import Data from "../models/data.model.js";

export const fetchData = async (req, res, next) => {
  console.log("Query params", req.query);
  //http://localhost:3005/api/data/fetchdata?start=2020-11-03&end=2022-12-03
  const { start, end } = req.query;
  // console.log(start, typeof start, typeof end, end);
  const startDate = new Date(start);
  const endDate = new Date(end);
  // console.log(startDate, endDate);

  try {
    // const resData = await Data.find({
    //   Day: { $gte: "2020-07-25", $lte: "2024-07-31" },
    // });

    // const resData = await Data.find({
    //   Day: { $gte: start },
    // });

    const resData = await Data.find({
      $expr: {
        $and: [
          { $gte: [{ $toDate: "$Day" }, startDate] },
          { $lte: [{ $toDate: "$Day" }, endDate] },
        ],
      },
    });

    console.log(resData);
    res.status(200).json(resData);
  } catch (error) {
    console.log(error);
  }

  //query mongoDB to find all records withing that specified date range:
};
