import React, { useState, useEffect } from "react";
import {
  Label,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";

function LineChartExtComponent({ chart2Data }) {
  //   const initialData = [
  //     {
  //       name: "4/10/2022",
  //       value: 39,
  //     },
  //     {
  //       name: "5/10/2022",
  //       value: 382,
  //     },
  //     {
  //       name: "6/10/2022",
  //       value: 20,
  //     },
  //     {
  //       name: "7/10/2022",
  //       value: 80,
  //     },
  //     {
  //       name: "8/10/2022",
  //       value: 50,
  //     },
  //   ];

  const getAxisYDomain = (from, to, ref, offset, data) => {
    // const refData = initialData.slice(from - 1, to);\
    // console.log(from, to);
    const refData = data.filter((d) => {
      if (
        new Date(d.name).valueOf() >= from &&
        new Date(d.name).valueOf() <= to
      )
        return d;
    });

    // console.log("refdata", [refData[0][ref], refData[0][ref]], refData);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach((d) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });

    return [(bottom | 0) - offset, (top | 0) + offset, refData];
  };

  const [compState, setCompState] = useState({});

  useEffect(() => {
    let tempData = chart2Data
      ?.map((d) => {
        // console.log(d, new Date(d.name).valueOf());
        let x = new Date(d.name).valueOf();
        return { ...d, x };
      })
      .sort((p1, p2) => (p1.x > p2.x ? 1 : p1.x < p2.x ? -1 : 0));

    // console.log("tempdata", tempData);

    const initialState = {
      data: tempData,
      filteredData: tempData,
      left: "dataMin-1",
      right: "dataMax+1",
      refAreaLeft: "",
      refAreaLeftCustom: "",
      refAreaRight: "",
      refAreaRightCustom: "",
      top: "dataMax+10",
      bottom: "dataMin-10",
      animation: true,
    };

    setCompState(initialState);
  }, [chart2Data]);

  const zoom = () => {
    // let { refAreaLeft, refAreaRight } = this.state;
    let {
      refAreaLeftCustom,
      refAreaRightCustom,
      refAreaLeft,
      refAreaRight,
      filteredData,
    } = compState;

    const { data } = compState;

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      //   this.setState(() => ({
      //     refAreaLeft: "",
      //     refAreaRight: "",
      //   }));

      setCompState({ ...compState, refAreaLeft: "", refAreaRight: "" });
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // console.log("coordinates", refAreaLeft, refAreaRight);
    // yAxis domain
    const [bottom, top, filteredDataNew] = getAxisYDomain(
      // new Date(refAreaLeft).toLocaleDateString(),
      // new Date(refAreaRight).toLocaleDateString(),
      refAreaLeft,
      refAreaRight,
      "value",
      1,
      filteredData
    );

    setCompState({
      ...compState,
      refAreaLeft: "",
      refAreaRight: "",
      data,
      filteredData: filteredDataNew,
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
    });
  };

  const zoomOut = () => {
    const { data } = compState;

    setCompState({
      ...compState,
      data: data.slice(),
      filteredData: data,
      refAreaLeft: "",
      refAreaRight: "",
      left: "dataMin-1",
      right: "dataMax+1",
      top: "dataMax+10",
      bottom: "dataMin-10",
    });
  };

  return (
    compState.data !== undefined && (
      <div
        className="highlight-bar-charts"
        style={{ userSelect: "none", width: "100%" }}
      >
        <button type="button" className="btn update" onClick={() => zoomOut()}>
          Zoom Out
        </button>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={800}
            height={400}
            data={compState.filteredData}
            onMouseDown={(e) => {
              setCompState({
                ...compState,
                refAreaLeft: e.activeLabel,
                refAreaLeftCustom: new Date(e.activeLabel).toLocaleDateString(),
              });
            }}
            onMouseMove={(e) =>
              compState.refAreaLeft &&
              setCompState({
                ...compState,
                refAreaRight: e.activeLabel,
                refAreaRightCustom: new Date(
                  e.activeLabel
                ).toLocaleDateString(),
              })
            }
            // eslint-disable-next-line react/jsx-no-bind
            onMouseUp={() => zoom()}
          >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis
              allowDataOverflow
              dataKey="x"
              // domain={[left, right]}
              domain={[
                compState.data[0].name,
                compState.data[compState.data.length - 1].name,
              ]}
              scale="time"
              type="number"
              tickFormatter={(d) => new Date(d).toLocaleDateString()}
            />
            <YAxis
              allowDataOverflow
              domain={[compState.bottom, compState.top]}
              type="number"
              yAxisId="1"
            />
            <Tooltip
              labelFormatter={(value) => {
                return `label: ${new Date(value).toLocaleDateString()}`;
              }}
            />
            <Line
              yAxisId="1"
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              animationDuration={300}
            />
            {compState.refAreaLeft && compState.refAreaRight ? (
              <ReferenceArea
                yAxisId="1"
                x1={compState.refAreaLeft}
                x2={compState.refAreaRight}
                strokeOpacity={0.3}
              />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  );
}

export default LineChartExtComponent;
