import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { getDailyActivityService } from '../services/DailyActivity'

import '../styles/DailyActivity.css';

export default function DailyActivity(props) {
  const [dataDaily, setDataDaily] = useState([]);

  useEffect(() => {
    getDaily();
  })

  async function getDaily(){
    await getDailyActivityService(props.userId).then((response) => {
      let data = [];
      response.sessions.map((item) => {
        let format = item.day.split('-');
        let day = format[2];
        data.push({"name": day, "kilogramme": item.kilogram, "calories": item.calories})
      })
      setDataDaily(data);
    })
  }

  const CustomTooltip = ({ active, payload, label }) => {
    console.log(payload)
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label sessionLabel">{`${payload[0].value} min`}</p>
        </div>
      );
    }
    return null;
  };

  return(
    <div className='dailyActivity'>
      <div className='headerChart'>
        <h2>Activité quotidienne</h2>
        <div className='dailyActivityLegend'>          
          <div className='dailyActivityLegendItem dailyActivityLegendWeight'></div>
          <p className='dailyActivityLegendText'>Poids (kg)</p>          
          <div className='dailyActivityLegendItem dailyActivityLegendCalories'></div>
          <p className='dailyActivityLegendText'>Calories brûlées (kCal)</p>
        </div>
      </div>
      <BarChart 
        width={1000} 
        height={300} 
        data={dataDaily}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >          
        <XAxis dataKey="name" />
        <YAxis dataKey="calories" orientation='right'/>
        <Tooltip content={<CustomTooltip/>}/>
        <Bar 
          dataKey="kilogramme" 
          fill="#000" 
          radius={[10, 10, 0, 0]}
          maxBarSize={10}  
        />
        <Bar 
          dataKey="calories" 
          fill="#ff0000" 
          radius={[10, 10, 0, 0]}
          maxBarSize={10}  
        />
      </BarChart>
    </div>
  )
}