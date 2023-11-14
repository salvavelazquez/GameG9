import React, { useState } from 'react';
import '../components/Navbar.css';

const NavBar = () => {
    const [mostrarLista, setMostrarLista] = useState(false);

    const toggleLista = () => {
        setMostrarLista(!mostrarLista);
    };

    return (
        <nav>
            <img src="/img/LogoG9.png" alt="Logo" className="logo" />
            <div className="menu">
                <ul>
                    <li onClick={toggleLista}>Juegos</li>
                    {mostrarLista && (
                        <ul className="submenu">
                            <li>spaceWaR</li>
                            <li>DUDE</li>
                        </ul>
                    )}
                    <li>Herramientas</li>
                    <li>Colaboradores</li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;