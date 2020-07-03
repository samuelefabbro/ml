import React, { useState } from "react"
import styled,{ createGlobalStyle } from "styled-components"
import { Link } from 'gatsby'
const GlobalStyle = createGlobalStyle`
    body{
        background-color: #FFF;
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

const StyledNav = styled.nav`
    position: absolute;
    width: 50vw;
    height: 100vh;
    background: #262626;
    opacity: 0.9;
    transform: ${({showNav})=> showNav ? 'translateX(50vw)' : 'translateX(100vw)'};
    transition: transform 250ms ease-in-out;
`;

const StyledDiv = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    a { 
        font-family: "Work Sans";
        font-size: 24px;
        color: white;
        padding-top: 10px;
        padding-bottom: 10px;
        text-decoration: none;
     }
`;

const StyledHamburger = styled.button`
    position: absolute;
    top: 22px;
    right: 22px;
    padding: 10px;
    display: inline-block;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    z-index: 999;
    transform: ${({hamburger}) => hamburger ? "translate(0,0)" : "translate(0,0)"};
    transition: transform 250ms ease-in-out;
    &:focus {
        outline: none;
        box-shadow: none;
    }
`;

const HamburgerBox = styled.span`
    width: 24px;
    height: 20px;
    display: inline-block;
    position: relative;
`;

const HamburgerInner = styled.span`
    width: 100%;
    height: 3;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${({hamburger})=>hamburger ? 'transparent' : 'transparent'};
    transition: background-color 100ms ease-in-out;
    &::after{
        content: '';
        left: 0;
        width: 100%;
        height: 3px;
        position: absolute;
        background-color: ${({hamburger})=>hamburger ? '#FFF' : '#262626'};
        top: 8px;
        transform: ${({hamburger}) => hamburger ? 'translateY(-8px) rotate(-135deg)':'translateY(0) rotate(0)'};
        transition: background-color 250ms ease-in-out, transform 250ms ease-in-out;
    }

    &::before{
        content: '';
        left: 0;
        width: 100%;
        height: 3px;
        position: absolute;
        background-color: ${({hamburger})=>hamburger ? '#FFF' : '#262626'};
        top: -8px;
        transform: ${({hamburger}) => hamburger ? 'translateY(8px) rotate(135deg)':'translateY(0) rotate(0)'};
        transition: background-color 250ms ease-in-out, transform 250ms ease-in-out;
    }
`;

const Nav = () => {
    const[menu, showMenu] = useState(false)

    return(
        <>
            <GlobalStyle />
            <StyledNav showNav={menu}>
                <StyledDiv>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/contact">Contact</Link>
                </StyledDiv>

            </StyledNav>
            
            <StyledHamburger hamburger={menu} onClick={()=>showMenu(!menu)}>
                <HamburgerBox>
                    <HamburgerInner hamburger={menu} />
                </HamburgerBox>
            </StyledHamburger>
        </>
    )
}

export default Nav
