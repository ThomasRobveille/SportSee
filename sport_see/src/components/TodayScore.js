import React, { useEffect, useState } from 'react';
import { getTodayScoreService } from '../services/TodayScore';
import { RadialBarChart, RadialBar } from 'recharts';

import '../styles/TodayScore.css';

export default function TodayScore(props) {
  const [dataScore, setDataScore] = useState([]);

  useEffect(() => {
    getScore();
  });

  async function getScore(){
    await getTodayScoreService(props.userId).then((response) => {
      let data = [{"name": 'Score', "value": 100, "background": 100, "fill": '#ffffff'}];
      data.push({"name": 'Score', "value": response.todayScore*100, "background": 100, "fill": '#ff0000'})
      setDataScore(data);
    })
  };

  return(
    <div className='todayScore'>
      <h2>Score</h2>
      <RadialBarChart
        cx={150} 
        cy={150}
        width={300}
        height={300}
        innerRadius="60%"
        outerRadius="80%"
        data={dataScore}
        startAngle={210}
        endAngle={-30}
      >
        <RadialBar
          minAngle={15}
          label={{ position: 'insideStart', fill: '#fff' }}
          background
          clockWise
          cornerRadius={10}
          dataKey="value"
        />
      </RadialBarChart>
      <div className="score">
        <span className="scoreResult">{props.score*100}%</span>
        <span className="scoreText">de votre<br/>objectif</span>
      </div>
    </div>
  )
}