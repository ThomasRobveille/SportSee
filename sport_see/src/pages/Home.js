import React from 'react';

import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Dashboard from '../components/Dashboard';

import '../styles/Home.css';

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