import React, { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';;

const data = [
  { name: 'Jan 1 2020', uv: 4000, pv: 2400, amt: 2400, },
  { name: 'Jan 15 2020', uv: 3000, pv: 1398, amt: 2210, },
  { name: 'Feb 1 2020', uv: 2000, pv: 9800, amt: 2290, },
  { name: 'Feb 15 2020', uv: 2780, pv: 3908, amt: 2000, },
  { name: 'Mar 1 2020', uv: 1890, amt: 2181, },
  { name: 'Mar 15 2020', uv: 2390, pv: 3800, amt: 2500, },
  { name: 'Apr 1 2020', uv: 3490, pv: 4300, amt: 2100, },
];

/**
 * Primary UI component for user interaction
 */
export const RechartLine = () => {
    const [lineState, setLineState] = useState({
      pv: false,
      uv: false,
    })

    const toggleLines = key => {
      const newState = {
        ...lineState,
        [key]: !lineState[key]
      }
      setLineState(newState)
    }

    return (
      <LineChart
        width={900}
        height={400}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend
          onClick={({dataKey}) => toggleLines(dataKey)}
          />
        <Line
          type="line"
          hide={lineState.pv}
          dataKey="pv"
          stroke="#4887fc"
          activeDot={{ r: 8 }}
          animationEasing='ease-in-out'
          isAnimationActive={false}
          animateNewValues={false}
          />
        <Line
          hide={lineState.uv}
          type="line"
          dataKey="uv"
          stroke="#8EA2AC"
          animationEasing='ease-in-out'
          isAnimationActive={false}
          animateNewValues={false}
          />

      </LineChart>
    );
  }
