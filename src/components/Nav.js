import React, { useState } from "react"
import styled,{ createGlobalStyle } from "styled-components"
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import logoWhite from "../images/MonicaLoddo-logo-white.svg"
import Facebook from "../images/facebook-icon-white.svg"
import Instagram from "../images/instagram-icon-white.svg"

const GlobalStyle = createGlobalStyle`
    body{
        background-color: #FFFFFF;
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

const StyledNav = styled.nav`
    position: fixed;
    width: 50vw;
    height: 100vh;
    background: #262626;
    opacity: 0.9;
    transform: ${({showNav})=> showNav ? 'translateX(50vw)' : 'translateX(100vw)'};
    transition: transform 250ms ease-in-out;
    @media (max-width: 768px) {
        width: 100vw;
        transform: ${({showNav})=> showNav ? 'translateX(0vw)' : 'translateX(100vw)'};
      }
`;

const StyledDiv = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

`;

const Logo = styled.div`

     margin-top 100px;
     img {
        width: 60px;
     }

`;

const MenuItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
     a {
        font-family: "Work Sans";
        font-size: 24px;
        color: white;
        padding-top: 13px;
        padding-bottom: 13px;
        text-decoration: none;
     }
`;

const Social = styled.div`
     display: flex;
     justify-content: center;
     margin-bottom: 50px;
     a {
        padding: 10px;
     }
`;

const StyledHamburger = styled.button`
    position: fixed;
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
    background-color: transparent;
    transition: background-color 100ms ease-in-out;

    &::after{
        content: '';
        left: 0;
        width: 100%;
        height: 3px;
        position: absolute;
        background-color: ${({menuTheme, hamburger})=> (menuTheme === "light" || hamburger) ? '#FFF' : '#262626'};
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
        background-color: ${({menuTheme, hamburger})=> (menuTheme === "light" || hamburger) ? '#FFF' : '#262626'};
        top: -8px;
        transform: ${({hamburger}) => hamburger ? 'translateY(8px) rotate(135deg)':'translateY(0) rotate(0)'};
        transition: background-color 250ms ease-in-out, transform 250ms ease-in-out;
    }
`;

const Nav = ({ menuTheme }) => {
    const[menu, showMenu] = useState(false)

    //console.log(menuTheme)


    return(
        <>
            <GlobalStyle />
            <StyledNav showNav={menu}>
                <StyledDiv>
                    <Logo>
                        <Link to="/"><img src={logoWhite} alt="Monica Loddo Logo"/></Link>
                    </Logo>
                    <MenuItems>
                        <Link to="/projects">Projects</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </MenuItems>
                    <Social>
                        <a href="http://instagram.com"><img src={Instagram} alt="Monica Loddo Facebook"/></a>
                        <a href="http://facebook.com"><img src={Facebook} alt="Monica Loddo Facebook"/></a>
                    </Social>
                </StyledDiv>

            </StyledNav>

            <StyledHamburger hamburger={menu} onClick={()=>showMenu(!menu)}>
                <HamburgerBox>
                    <HamburgerInner menuTheme={menuTheme} hamburger={menu} />
                </HamburgerBox>
            </StyledHamburger>
        </>
    )
}

export default Nav

Nav.propTypes = {
    menuTheme: PropTypes.oneOf(["light", "dark"]),
};

Nav.defaultProps = {
    menuTheme: "dark",
}
