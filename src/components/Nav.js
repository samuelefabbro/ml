import React, { useState } from "react"
import styled, { createGlobalStyle } from "styled-components"
import PropTypes from "prop-types"
import { Link } from "gatsby"
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
`

const StyledNav = styled.nav`
    position: fixed;
    top: 0;
    z-index: 100;
    width: 50vw;
    height: 100vh;
    background: #262626;
    opacity: 0.9;
    transform: ${({ showNav }) =>
        showNav ? "translateX(50vw)" : "translateX(100vw)"};
    transition: transform 250ms ease-in-out;
    @media (max-width: 768px) {
        width: 100vw;
        transform: ${({ showNav }) =>
            showNav ? "translateX(0vw)" : "translateX(100vw)"};
    }
`

const StyledDiv = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
`

const MenuItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @media (max-height: 390px) {
        margin-top: -50px;
    }
    a {
        font-family: "Work Sans";
        font-size: 24px;
        color: white;
        padding-top: 13px;
        padding-bottom: 13px;
        text-decoration: none;
        @media (max-width: 768px) {
            font-size: 20px;
            padding-top: 9px;
            padding-bottom: 9px;
        }
        @media (max-height: 390px) {
            padding-top: 6px;
            padding-bottom: 6px;
        }
    }
`

const Social = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    img {
        @media (max-width: 768px) {
            width: 30px;
        }
    }
    a {
        padding: 10px;
    }
    @media (max-height: 390px) {
        bottom: 20px;
    }
`

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
    transform: ${({ hamburger }) =>
        hamburger ? "translate(0,0)" : "translate(0,0)"};
    transition: transform 250ms ease-in-out;
    &:focus {
        outline: none;
        box-shadow: none;
    }
    @media (max-width: 768px) {
        top: 12px;
        right: 12px;
    }
`

const HamburgerBox = styled.span`
    width: 24px;
    height: 20px;
    display: inline-block;
    position: relative;
    @media (max-width: 768px) {
        width: 20px;
    }
`

const HamburgerInner = styled.span`
    width: 100%;
    height: 3;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    transition: background-color 100ms ease-in-out;

    &::after {
        content: "";
        left: 0;
        width: 100%;
        height: 3px;
        position: absolute;
        background-color: ${({ menuTheme, hamburger }) =>
            menuTheme === "light" || hamburger ? "#FFF" : "#262626"};
        top: 8px;
        transform: ${({ hamburger }) =>
            hamburger
                ? "translateY(-8px) rotate(-135deg)"
                : "translateY(0) rotate(0)"};
        transition: background-color 250ms ease-in-out,
            transform 250ms ease-in-out;
        @media (max-width: 768px) {
            transform: ${({ hamburger }) =>
                hamburger
                    ? "translateY(-6px) rotate(-135deg)"
                    : "translateY(0) rotate(0)"};
            height: 2px;
            top: 6px;
        }
    }

    &::before {
        content: "";
        left: 0;
        width: 100%;
        height: 3px;
        position: absolute;
        background-color: ${({ menuTheme, hamburger }) =>
            menuTheme === "light" || hamburger ? "#FFF" : "#262626"};
        top: -8px;
        transform: ${({ hamburger }) =>
            hamburger
                ? "translateY(8px) rotate(135deg)"
                : "translateY(0) rotate(0)"};
        transition: background-color 250ms ease-in-out,
            transform 250ms ease-in-out;
        @media (max-width: 768px) {
            transform: ${({ hamburger }) =>
                hamburger
                    ? "translateY(6px) rotate(135deg)"
                    : "translateY(0) rotate(0)"};
            height: 2px;
            top: -6px;
        }
    }
`

const Nav = ({ menuTheme }) => {
    const [menu, showMenu] = useState(false)

    //console.log(menuTheme)

    return (
        <>
            <GlobalStyle />
            <StyledNav showNav={menu}>
                <StyledDiv>
                    <MenuItems>
                        <Link to="/">Home</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </MenuItems>
                </StyledDiv>
                <Social>
                    <a
                        href="https://www.instagram.com/monica_loddo_ml/"
                        rel="noreferrer"
                        target="_blank"
                    >
                        <img src={Instagram} alt="Monica Loddo Instagram" />
                    </a>
                    <a
                        href="https://www.facebook.com/monica.loddo.5"
                        rel="noreferrer"
                        target="_blank"
                    >
                        <img src={Facebook} alt="Monica Loddo Facebook" />
                    </a>
                </Social>
            </StyledNav>

            <StyledHamburger hamburger={menu} onClick={() => showMenu(!menu)}>
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
}

Nav.defaultProps = {
    menuTheme: "dark",
}
