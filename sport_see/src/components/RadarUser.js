import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import { getRadarUserService } from '../services/RadarUser'

import axios from 'axios';
import '../styles/RadarUser.css';

export default function RadarUser() {
  const [dataPerformance, setDataPerformance] = useState([]);

  useEffect(() => {
    getPerformance();
  });

  async function getPerformance(){
    await getRadarUserService(12).then((response) => {
      let data = [];
      response.data.map((item) => {
        if(item.kind === 1) data.push({"subject": 'Cardio', "A": item.value, "fullMark": 200})
        if(item.kind === 2) data.push({"subject": 'Energie', "A": item.value, "fullMark": 200})
        if(item.kind === 3) data.push({"subject": 'Endurance', "A": item.value, "fullMark": 200})
        if(item.kind === 4) data.push({"subject": 'Force', "A": item.value, "fullMark": 200})
        if(item.kind === 5) data.push({"subject": 'Vitesse', "A": item.value, "fullMark": 200})
        if(item.kind === 6) data.push({"subject": 'Intensité', "A": item.value, "fullMark": 200})
      })
      setDataPerformance(data);
    });
  }

  return(
    <div className='radarChart'>
      <RadarChart
        outerRadius={90}
        width={300}
        height={300}
        data={dataPerformance}
      >
        <PolarAngleAxis dataKey="subject" tick={{ fill: "white", fontSize: 15 }} />
        <PolarGrid gridType='polygon' radialLines={false} polarRadius={[0, 10, 27, 49, 72, 95]} />
        <Radar dataKey="A" stroke="#ff0000" fill="#ff0000" fillOpacity={0.6} />
      </RadarChart>
    </div>
  )
}