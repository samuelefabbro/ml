import React from "react"
import { Link } from 'gatsby'
import styled from "styled-components"
import Instagram from "../images/instagram-icon-black.svg"
import Facebook from "../images/facebook-icon-black.svg"

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 50px;
  @media (max-width: 768px) {
    padding: 25px;
  }
`;

const Social = styled.div`
  display: flex;
  flex-column: row;
  img {
    width: 40px;
    margin: 8px;
    @media (max-width: 768px) {
      width: 30px;
      margin: 7px;
    }
  }
`;

const Menu = styled.div`
    font-family: "Work Sans";
    margin-bottom: 8px;
    @media (max-width: 768px) {
      margin-bottom: 6px;
    }
    a {
      text-decoration: none;
      color: #262626;
      font-size: 20px;
      margin-left: 5px;
      margin-right: 5px;
      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
`;

const Copyright = styled.div`
    font-size: 12px;
    color: #262626;
    @media (max-width: 768px) {
      font-size: 9px;
    }
`;


const Footer = () => {
  
  return (
    <StyledFooter>
      <Social>
        <a href="https://www.instagram.com/monica_loddo_ml/" rel="noreferrer" target="_blank"><img src={Instagram} alt="Monica Loddo Instagram"/></a>
        <a href="https://www.facebook.com/monica.loddo.5" rel="noreferrer" target="_blank"><img src={Facebook} alt="Monica Loddo Facebook"/></a>
      </Social>
      <Menu>
        <Link to="/projects">Projects</Link>
        /
        <Link to="/about">About</Link>
        /
        <Link to="/contact">Contact</Link>
      </Menu>
      <Copyright>
          Copyright © {new Date().getFullYear()}
      </Copyright>
    </StyledFooter>
  )
}




export default Footer