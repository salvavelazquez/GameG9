//import React, { useState } from 'react';
import { ReactDOM } from 'react';
import '../components/Start.css';
import Navbar from './NavBar';
import Footer from './Footer';

function Start() {

    return (
        <>
            <Navbar />
            <main>
                <img src="/img/Montain2.png" alt="Montain" className='fondoMontain' />
                {/* Contenido principal */}
            </main>
            <Footer />
        </>
    );

}

export default Start;
