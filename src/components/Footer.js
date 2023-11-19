// src/components/Footer.js
import React from 'react';
import '../components/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <ul>
                <li>Enlace 1</li>
                <li>Enlace 2</li>
                <li><Link to='/spaceWar' className='links'> SpaceWar </Link></li>
                <li><Link to='/Zoolopolis' className='links'> Zoolopolis </Link></li>
                <li>Enlace 5</li>
            </ul>
        </footer>
    );
};

export default Footer;
