import React, { useState } from 'react';
import {
  VictoryLine,
  VictoryScatter,
  VictoryChart, VictoryTheme,
  VictoryLegend,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer
} from 'victory';

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

/**
 * Primary UI component for user interaction
 */
export const VictoryLineChart = () => {
    const [lineState, setLineState] = useState({
      current: true,
      previous: true,
    })
    const toggleLines = key => {
      console.log('Key: ', key)
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
            height={200}
            // voronoiDimension="x"
            labels={({ datum }) => {
              // This was duplicating due to line and scatter plot
              // Will want to redo this with custom Clyout Component
              return /(line)/.test(datum.childName)
                ? `${datum.x}: ${datum.y}`
                : null
            }}
            labelComponent={
              <VictoryTooltip
                constrainToVisibleArea
                cornerRadius={0}
                flyoutStyle={{
                  fill: 'white'
                }}
                style={{
                  fontSize: 4
                }}
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
                    console.log('Props: ', props)
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
          // labels={({ datum }) => datum.y}
          // labelComponent={
          //   <VictoryTooltip
          //   />
          // }
        />
        }
        { lineState.current &&
          <VictoryScatter
            data={curData}
            size={1}
            style={{
              data: {
                fill: "#4887fc"
              }
            }}
          />
        }
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
          // labels={({ datum }) => datum.y}
          // labelComponent={<VictoryTooltip /> }
        />
        }
        { lineState.previous &&
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

        }
      </VictoryChart>
    );
  }
