import React from 'react';

import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Dashboard from '../components/Dashboard';

import '../styles/Home.css';

// import axios from 'axios';

// axios.get('http://localhost:3000/user/12').then((response) => {
//   console.log(response.data);
// });

export default function Home() {
  return (
    <div>
      <Header/>
      <div className='main_container'>
        <Sidebar/>
        <Dashboard/>
      </div>
      {/* <Rechart/> */}
    </div>
  );
}