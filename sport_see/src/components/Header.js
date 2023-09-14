import React from 'react';

import logo from '../assets/logo.png';
import '../styles/Header.css';

export default function Header() {
  return (
    <div className='header'>
      <img src={logo} className='logo'/>
      <ul>
        <li>Accueil</li>
        <li>Profil</li>
        <li>Réglage</li>
        <li>Communauté</li>
      </ul>
    </div>
  );
}