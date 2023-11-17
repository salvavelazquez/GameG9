import React, { useState } from "react";
import styled from "styled-components";
import BurguerButton from "./BurguerButton";
import { Link } from 'react-router-dom';

function Navbar() {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        //cuando  esta true lo pasa a false y vice versa
        setClicked(!clicked)
    }


    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownVisible2, setDropdownVisible2] = useState(false);

    const handleDropdownClick = () => {
        setDropdownVisible2(false);
        setDropdownVisible(!dropdownVisible);
    };

    const handleDropdownClick2 = () => {
        setDropdownVisible(false);
        setDropdownVisible2(!dropdownVisible2); 
    };


    return (
        <>
            <NavContainer>

                <Link to="/">
                    <img src="/img/LogoG9.png" alt="Logo" className="logo" />
                </Link>

                <div className={`links ${clicked ? "active" : ""}`}>

                    <a onClick={handleClick} href="/">Home</a>
                    <Link onClick={(e) => { e.preventDefault(); handleDropdownClick2(); }} to="/">Tools▾</Link>
                    {dropdownVisible2 && (
                        <DropdownContainer2>
                            <DropdownLink href="/">Price Comparison</DropdownLink>
                            <DropdownLink href="/">Task List</DropdownLink>
                            
                        </DropdownContainer2>
                    )}

                    <Link onClick={(e) => { e.preventDefault(); handleDropdownClick(); }} to="/">VideoGames▾</Link>
                    {dropdownVisible && (
                        <DropdownContainer>
                            <DropdownLink href="/Dude">Dude</DropdownLink>
                            <DropdownLink href="/SpaceWar">Space War</DropdownLink>
                            <DropdownLink href="/">Zoolopolis</DropdownLink>
                        </DropdownContainer>
                    )}


                    <Link onClick={handleClick} to="/">About Us</Link>

                </div>



                <div className="burguer">
                    <BurguerButton clicked={clicked} handleClick={handleClick} />
                </div>
                <BgDiv className={`initial ${clicked ? " active" : ""}`} />
            </NavContainer>




        </>
    );
}

export default Navbar;

const NavContainer = styled.nav`
.logo {
    z-index: 3;
    width: 7.5em;
    height: 5em;
    padding-left: 1em;
    
    //font-size: 1.5em;
    @media(max-width: 768px){
        width: 110px;
        height: 70px;
    }
}

padding: .4rem;
background-color: #333;
display: flex;
align-items: center;
justify-content: space-between;
a {
    color: white;
    text-decoration: none;
    margin-right: 1rem;
}
.links{
    
    //border: 2px solid red;
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all .5s ease;
    a{
        color: white;
        font-size: 2rem;
        display: block;
    }
    @media(min-width: 992px){
        position: initial;
        margin: 0;
        a{
            font-size: 1rem;
            color: #0cc6ff;
            display: inline;
        }
        display: block;
    }
}

.links.active{
    
    z-index: 3;
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 30%;
    left: 0;
    right: 0;
    text-align: center;
    a{
        font-size: 2rem;
        margin-top: 1rem;
        color: #0cc6ff;
    }
}

.burguer{
    z-index: 3;
    @media(min-width: 992px){
        display: none;
    }
}
`;

const BgDiv = styled.div`
    background-color: #222;
    position: absolute;
    top: -1000px;
    left: -1000px;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: all .6s ease ;
    &.active{
        border-radius: 0 0 80% 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        
    }
    
`;

const DropdownContainer = styled.div`
    position: absolute;

    //top: 13%;
    left: 84%;
    background-color: #333;
    //padding: 1rem;
    display: flex;
    flex-direction: column;
    z-index: 2;
    a {
        color: #0cc6ff;
        text-decoration: none;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }
    border: 2px solid gray;
    border-radius: 10px; 
    @media(max-width: 1115px){
        left: 81%;
        //border: 2px solid red;
    }
`;

const DropdownContainer2 = styled.div`
    position: absolute;

    //top: 13%;
    left: 76%;
    background-color: #333;
    //padding: 1rem;
    display: flex;
    flex-direction: column;
    z-index: 2;
    a {
        color: #0cc6ff;
        text-decoration: none;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }
    border: 2px solid gray;
    border-radius: 10px; 
    @media(max-width: 1115px){
        left: 71%;
        //border: 2px solid red;
    }
`;

const DropdownLink = styled.a`
    //color: white;
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    padding: 1rem;
    padding-top: 0%;
    padding-bottom: 0%;
    
    /*border: 2px solid black;*/
    

    &:hover {
        background-color: gray; // Cambia el color de fondo al posicionarse el mouse sobre el enlace
    }
`;

