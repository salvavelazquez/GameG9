//import React, { useState } from 'react';
import { ReactDOM } from 'react';
import '../Start.css';

function Start() {

    return (
        <>
        
            <body>
                <nav className="navbar navbar-expand-lg navBar">
                    <div className="containerImg">
                        <a href="/" class="navbar-brand d-flex align-items-center">
                            <img className="logo" src="/img/Egg.png" alt="Img logo egg"/>
                        </a>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse elementosNav" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto elementos">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Libros
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                    <li><a className="dropdown-item" href="@{/libro/registrar}">Crear Libro</a></li>
                                    <li><hr className="dropdown-divider"/></li>

                                    <li><a className="dropdown-item" href="@{/libro/lista}">Listar Libros</a></li>
                                </ul>
                            </li>


                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Autores
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                    <li><a className="dropdown-item" href="@{/autor/registrar}">Crear Autor</a></li>
                                    <li><hr className="dropdown-divider"/></li>

                                    <li><a className="dropdown-item" href="@{/autor/lista}">Listar Autores</a></li>
                                </ul>
                            </li>



                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Editoriales
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                    <li><a className="dropdown-item" href="@{/editorial/registrar}">Crear Editorial</a></li>
                                    <li><hr className="dropdown-divider"/></li>

                                    <li><a className="dropdown-item" href="@{/editorial/lista}">Listar Editoriales</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>

                <header className="header">
                    <section className="contenedorMain">
                        <div className="tituloBiblioteca">
                            <a className="navbar-brand" href="#">BIBLIOTECA EGG</a>
                        </div>
                        <div className="container contenedorLibros">
                            <p className="tituloLibros">Encontrá todos los Libros Aquí!</p>

                        </div>
                        <div className="bg-circle-1 bg-circle"></div>
                        <div className="bg-circle-2 bg-circle"></div>
                        <div className="bg-circle-3 bg-circle"></div>
                        <div className="bg-circle-4 bg-circle"></div>
                        <h1>Ingresa tu nombre</h1>
                <input
                    type="text"
                    placeholder="Nombre del niño"
                    onChange={(e) => setNombreJugador(e.target.value)}
                />
                <button onClick={() => manejarClickJugar(nombreJugador)}>Jugar</button>
                    </section>
                </header>

                
                
            </body>
            
        </>
    );

}

export default Start;
