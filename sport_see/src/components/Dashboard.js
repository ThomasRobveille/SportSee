import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../styles/Dashboard.css';

import calorieImg from '../assets/calories-icon.png';
import proteinImg from '../assets/protein-icon.png';
import carbohydrateImg from '../assets/carbs-icon.png';
import lipidImg from '../assets/fat-icon.png';

import DailyActivity from './DailyActivity';
import TodayScore from './TodayScore';
import RadarUser from './RadarUser';
import SessionChart from './SessionChart';


export default function Dashboard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState('');
  const [score, setScore] = useState(0);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbohydrate, setCarbohydrate] = useState(0);
  const [lipid, setLipid] = useState(0);
  const [dataPerformance, setDataPerformance] = useState([]);

  function getName() {
    axios.get('http://localhost:3000/user/12').then((response) => {
      console.log(response.data);
      setFirstName(response.data.data.userInfos.firstName);
      setLastName(response.data.data.userInfos.lastName);
      setScore(response.data.data.todayScore);
      setCalories(response.data.data.keyData.calorieCount);
      setProtein(response.data.data.keyData.proteinCount);
      setCarbohydrate(response.data.data.keyData.carbohydrateCount);
      setLipid(response.data.data.keyData.lipidCount);
    });
  }

  function getPerformance(){
    axios.get('http://localhost:3000/user/12/performance').then((response) => {
      let data = [];
      response.data.data.data.map((item) => {
        if(item.kind === 1) data.push({subject: 'cardio', value: item.value, fullMark: 200})
        if(item.kind === 2) data.push({subject: 'energy', value: item.value, fullMark: 200})
        if(item.kind === 3) data.push({subject: 'endurance', value: item.value, fullMark: 200})
        if(item.kind === 4) data.push({subject: 'strength', value: item.value, fullMark: 200})
        if(item.kind === 5) data.push({subject: 'speed', value: item.value, fullMark: 200})
        if(item.kind === 6) data.push({subject: 'intensity', value: item.value, fullMark: 200})
      })
      return data
    });
  }

  useEffect(() => {
    getName();
  })

  return (
    <div className='Dashboard'>
      <div>
        <h1>Bonjour <span>{ firstName }</span></h1>
        <span>Félicitation ! Vous avez explosé vos objectifs hier 👏</span>
      </div>
      <div className='userData'>
        <div className='diagramme'>
          <div className='one'>
            <DailyActivity/>
          </div>
          <div className='square'>
            <div>
              <SessionChart/>
            </div>
            <div>
              <RadarUser data={dataPerformance}/>
            </div>
            <div>
              <TodayScore score={score}/>
            </div>
          </div>          
        </div>
        <div className='keyData'>
          <div className='dataCal data'>
            <img src={calorieImg} className='iconData'/>
            <div className='unitData'>
              <p>{ calories }Kcal</p>
              <span>calories</span>
            </div>              
          </div>
          <div className='dataPro data'>
            <img src={proteinImg} className='iconData'/>
            <div className='unitData'>
              <p>{ protein }g</p>
              <span>protéine</span>
            </div> 
          </div>
          <div className='dataGlu data'>
            <img src={carbohydrateImg} className='iconData'/>
            <div className='unitData'>
              <p>{ carbohydrate }g</p>
              <span>glucide</span>
            </div> 
          </div>
          <div className='dataLip data'>
            <img src={lipidImg} className='iconData'/>
            <div className='unitData'>
              <p>{ lipid }g</p>
              <span>lipide</span>
            </div>       
          </div>  
        </div>      
      </div>
    </div>
  );
}