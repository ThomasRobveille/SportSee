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
    await getTodayScoreService(12).then((response) => {
      let data = [];
      data.push({"name": 'Score', "value": response.todayScore, "fill": '#ff0000'})
      setDataScore(data);
    })
  };

  return(
    <div className='todayScore'>
      <h2>Score</h2>
      <RadialBarChart
        cx="50%"
        cy="50%"
        width={300}
        height={300}
        innerRadius="70%"
        outerRadius="80%"
        data={dataScore}
        startAngle={210}
        endAngle={-30}
      >
        <RadialBar
          minAngle={15}
          background={{ fill: '#ffffff' }}
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