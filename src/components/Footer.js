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
                <li>Enlace 4</li>
                <li>Enlace 5</li>
            </ul>
        </footer>
    );
};

export default Footer;
