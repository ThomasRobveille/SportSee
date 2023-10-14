import React, {useEffect, useState } from 'react';
import { LineChart, Line, XAxis, Tooltip, ReferenceArea } from 'recharts';
import { getSessionChartService } from '../services/SessionChart'
import '../styles/SessionChart.css';

export default function SessionChart(props) {
  const [dataSession, setDataSession] = useState([]);
  
  const [cursorX, setCursorX] = useState(null);
  const [showReference, setShowReference] = useState(false);

  useEffect(() => {
    getSession();
  })

  async function getSession(){
    await getSessionChartService(props.userId).then((response) => {
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

  const CustomTooltip = ({ active, payload, label }) => {
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
    <div className='sessionContainer'>
      <h2 className='titleSession'>Durée moyenne des sessions</h2>
      <div className='sessionChart'>      
        <LineChart
          width={250} 
          height={250} 
          strokeWidth={1} 
          data={dataSession} 
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          onMouseMove={(e) => {
            setCursorX(e.activeTooltipIndex)
            setShowReference(true)
          }}
          onMouseLeave={() => setShowReference(false)}
          >
          <XAxis 
            type="category"
            dataKey="name"
            tickLine={true}
            stroke="red"
            padding={{right:5, left:5}}
            tick={{ fontSize: 13, stroke: "white", opacity: 0.8}}
            cursor="crosshair"
          />
          <Tooltip content={<CustomTooltip/>}/> 
          <Line type="monotone" dataKey="value" stroke="#fff" />
          {showReference !== null && (
            <ReferenceArea
              x1={cursorX}
              fillOpacity={0.3}
            />
          )}
        </LineChart>
      </div>
    </div>
    
  )
}