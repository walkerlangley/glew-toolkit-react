import React, { useState } from 'react';
import {
  VictoryLine,
  VictoryLabel,
  // VictoryScatter,
  VictoryChart,
  VictoryTheme,
  VictoryLegend,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer
} from 'victory';

// const curData = [
//   { x: 'jan 1 2020', y: 4000, label: 4000 },
//   { x: 'jan 15 2020', y: 3000, label: 3000},
//   { x: 'feb 1 2020', y: 2000, label: 2000},
//   { x: 'feb 15 2020', y: 2780, label: 2780},
//   { x: 'mar 1 2020', y: 1890, label: 1890},
//   { x: 'mar 15 2020', y: 2390, label: 2390},
//   { x: 'apr 1 2020', y: 3490, label: 3490},
// ];

const curData = [
  { x: 'Jan 1 2020', y: 4000, },
  { x: 'Jan 15 2020', y: 3000,},
  { x: 'Feb 1 2020', y: 2000, },
  { x: 'Feb 15 2020', y: 2780,},
  { x: 'Mar 1 2020', y: 1890, },
  { x: 'Mar 15 2020', y: 2390,},
  { x: 'Apr 1 2020', y: 3490, },
];

const prevData = [
  { x: 'Jan 1 2020', y: 2400},
  { x: 'Jan 15 2020', y: 1398},
  { x: 'Feb 1 2020', y: 9800},
  { x: 'Feb 15 2020', y: 3908},
  { x: 'Mar 1 2020' , y: null },
  { x: 'Mar 15 2020', y: 3800,},
  { x: 'Apr 1 2020', y: 4300,},
];

// *
// * Colors
// *
const blueGrey50 = "#dcddde";

const strokeDasharray = "10, 5";
const strokeLinecap = "round";
const strokeLinejoin = "round";

// class CustomFlyout extends React.Component {
  const CustomFlyout = ({ x, y, datum, dx, dy }) => {
    return (
  // render() {
    // const {x, y, dx, dy, orientation} = this.props;
    // const newY = orientation === "bottom" ? y - 35 : y + 35;
    // console.log('Propr: ', this.props)
    // return (
      <g>
        <rect
          x={x + 25}
          y={y - 15}
          width="50"
          dx={dx}
          dy={dy}
          height="30"
          rx="1.5"
          fill="white"
          stroke="#868C97"
          stroke-width="0.3"
        />
        <rect
          x={x + 25}
          y={y - 15}
          width="50"
          dx={dx}
          dy={dy}
          height="10"
          rx="1.5"
          fill="#f3f4f7"
          stroke="#868C97"
          stroke-width="0.3"
        />
        <line
          x1={x + 25}
          y1={y - 5}
          x2={x + 75}
          y2={y - 5}
          stroke="#868C97"
          stroke-width="0.3"
        />
        <text
          x={x + 43}
          y={y - 8}
          fontSize="5"
          fontWeight="bold"
          fill="#596e79"
        >
          Details
        </text>
      </g>
      // <g>
      //   <circle cx={x} cy={newY} r="20" stroke="tomato" fill="none"/>
      //   <circle cx={x} cy={newY} r="25" stroke="orange" fill="none"/>
      //   <circle cx={x} cy={newY} r="30" stroke="gold" fill="none"/>
      // </g>
    );
  // }
}


/**
 * Primary UI component for user interaction
 */
export const VictoryLineChart = () => {
    const [lineState, setLineState] = useState({
      current: true,
      previous: true,
    })
    const toggleLines = key => {
      const newState = {
        ...lineState,
        [key]: !lineState[key]
      }
      setLineState(newState)
    }

    return (
      <VictoryChart
        width={400}
        height={200}
        margin={{
          top: 0, right: 30, left: 100, bottom: 0,
        }}
        containerComponent={
          <VictoryVoronoiContainer
            // mouseFollowTooltips
            // height={200}
            voronoiDimension="x"
            voronoiPadding={50}
            labels={({ datum }) => {
              // This was duplicating due to line and scatter plot
              // If using labelComponent, I think you have to use label, which sucks
              // because I can't see to style these data points
              return /(line)/.test(datum.childName)
                ? `${datum.x}: ${datum.y}`
                : null
            }}
            labelComponent={
              <VictoryTooltip
                cornerRadius={2}
                flyoutComponent={<CustomFlyout/>}
                // // dx={50}
                // // dy={18}
                // // constrainToVisibleArea
                // // cornerRadius={0}
                // horizontal={true}
                // flyoutStyle={{
                //   stroke: "#8EA2AC",
                //   fill: 'white',
                //   strokeWidth: 0.3
                // }}
                style={{
                  fontSize: 4,
                  color: '#596e79'
                  // marginLeft: 30,
                  // transform: `translate(${50}px, ${30}px)`
                }}
                // labelComponent={<CustomFlyout />}
                labelComponent={
                  <VictoryLabel
                    dx={50}
                    dy={5}
                    />
                }
               />
            }
          />
        }
      >
      <VictoryLegend
        x={300}
        y={40}
        centerTitle
        orientation="horizontal"
        // gutter={20}
        events={[{
          target: "data",
          eventHandlers: {
            onClick: () => {
              return [
                {
                  target: "data",
                  mutation: (props) => {
                    const line = props.datum.name;
                    toggleLines(line.toLowerCase())
                  }
                }
              ];
            }
          }
        }]}
        data={[
          { name: "Current", symbol: { fill: "#4887fc"}, },
          { name: "Previous", symbol: { fill: "#8EA2AC" } },
        ]}
        style={{
          data: {
            fontSize: 5,
            strokeWidth: 2
          },
          labels: { fontSize: 4 }
        }}
      />
      <VictoryAxis dependentAxis
        style={{
          grid: {
            fill: "none",
            stroke: blueGrey50,
            strokeDasharray,
            strokeLinecap,
            strokeLinejoin,
            pointerEvents: "painted"
          },
          tickLabels: {
            fontSize: 5,
            color: blueGrey50,
          },
        }}
      />
      <VictoryAxis
        theme={VictoryTheme.material}
        scale="time"
        style={{
          grid: {
            fill: blueGrey50,
            stroke: blueGrey50,
            strokeLinecap,
            strokeLinejoin,
            pointerEvents: "painted"
          },
          tickLabels: {fontSize: 5 },
        }}
        // tickFormat={(x) => new Date(x).getFullYear()}
      />
      { lineState.current &&
        <VictoryLine
          style={{
            data: {
              stroke: "#4887fc",
              strokeWidth: 0.5,
             },
            parent: { border: "1px solid #ccc"}
          }}
          data={curData}
        />
        }
        {/* { lineState.current &&
          <VictoryScatter
            data={curData}
            size={1}
            style={{
              data: {
                fill: "#4887fc"
              }
            }}
            labels={({ datum }) => datum.y}
            labelComponent={<VictoryTooltip/>}
          />
        } */}
        { lineState.previous &&
        <VictoryLine
          style={{
            data: {
              stroke: "#8EA2AC",
              strokeWidth: 0.5,
             },
            parent: { border: "1px solid #ccc"}
          }}
          data={prevData}
        />
        }
        {/* { lineState.previous &&
          <VictoryScatter
            data={prevData}
            size={1}
            labels={() => null}
            style={{
              data: {
                fill: "#8EA2AC"
              }
            }}
          />
        } */}
      </VictoryChart>
    );
  }
