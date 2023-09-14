import React, {useEffect, useState } from 'react';
import { LineChart, Line, XAxis, Tooltip } from 'recharts';
import { getSessionChartService } from '../services/SessionChart'

import axios from 'axios';
import '../styles/SessionChart.css';

export default function SessionChart() {
  const [dataSession, setDataSession] = useState([]);

  useEffect(() => {
    getSession();
  })

  async function getSession(){
    await getSessionChartService(12).then((response) => {
      let data = [];
      response.sessions.map((item) => {
        let object = {"name": "", "value": ""};
        if (item.day === 1) object.name = 'L';
        if (item.day === 2) object.name = 'M';
        if (item.day === 3) object.name = 'M';
        if (item.day === 4) object.name = 'J';
        if (item.day === 5) object.name = 'V';
        if (item.day === 6) object.name = 'S';
        if (item.day === 7) object.name = 'D';
        object.value = item.sessionLength;
        data.push(object)
      })
      setDataSession(data);
    })
  }

  const CustomTick = ({ x, y, payload }) => (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
        {payload.value}
      </text>
    </g>
  );

  return(
    <div className='sessionChart'>
      <LineChart width={250} height={250} data={dataSession} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" tick={<CustomTick/>}/>
        <Tooltip /> 
        <Line type="monotone" dataKey="value" stroke="#fff" />
      </LineChart>
    </div>
  )
}