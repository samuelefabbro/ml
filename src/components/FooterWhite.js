import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Instagram from "../images/instagram-icon-white.svg"
import Facebook from "../images/facebook-icon-white.svg"

const StyledFooter = styled.footer`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0 auto;
    padding: 50px;
    @media (max-width: 500px), (max-height: 695px) {
        padding: 0 25px 25px 25px;
    }
    @media (max-height: 540px) {
        display: none;
    }
`

const Social = styled.div`
    display: flex;
    flex-direction: row;
    img {
        width: 40px;
        margin: 8px;
        @media (max-width: 500px), (max-height: 630px) {
            width: 30px;
            margin: 7px;
        }
    }
`

const Menu = styled.div`
    font-family: "Work Sans";
    margin-bottom: 8px;
    color: #ffffff;
    @media (max-width: 500px), (max-height: 695px) {
        margin-bottom: 6px;
    }
    a {
        text-decoration: none;
        color: #ffffff;
        font-size: 20px;
        margin-left: 5px;
        margin-right: 5px;
        @media (max-width: 500px), (max-height: 695px) {
            font-size: 16px;
        }
    }
`

const Copyright = styled.div`
    font-size: 12px;
    color: #ffffff;
    @media (max-width: 500px), (max-height: 695px) {
        font-size: 9px;
    }
`

const Footer = () => {
    return (
        <StyledFooter>
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
            <Menu>
                <Link to="/projects">Projects</Link>/
                <Link to="/about">About</Link>/
                <Link to="/contact">Contact</Link>
            </Menu>
            <Copyright>Copyright © {new Date().getFullYear()}</Copyright>
        </StyledFooter>
    )
}

export default Footer
