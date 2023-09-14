import React from  'react';

import yogaLogo from '../assets/yoga_vector.png';
import nageLogo from '../assets/nage_vector.png';
import veloLogo from '../assets/velo_vector.png';
import muscuLogo from '../assets/muscu_vector.png';

import '../styles/Sidebar.css';

export default function SideBar() {
  return (
    <div className='sidebar'>
      <ul>
        <li><img src={yogaLogo}/></li>
        <li><img src={nageLogo}/></li>
        <li><img src={veloLogo}/></li>
        <li><img src={muscuLogo}/></li>
      </ul>
      <span>Copyright, SportSee 2020</span>
    </div>
  );
}