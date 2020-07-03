import React from "react"
import "normalize.css"
import { Link } from "gatsby"
import styled from "styled-components"
import logo from "../images/MonicaLoddo-logo-circle.svg"

const LogoHome = styled.div`
font-family: "Work Sans", sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
  width: 100%;
  background: #ffffff;
  height: 216px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 34px;
  @media (max-width: 768px) {
    height: 168px;
    padding-top: 32px;
  }
  h1 {
    font-weight: 700;
    font-size: 36px;
    margin:0;
    letter-spacing: 0.3px;
    @media (max-width: 768px) {
      font-size: 28px;
    }
  }
  p {
    font-weight: 400;
    font-size: 14px;
    margin-top: 3px;
    letter-spacing: -0.03em;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  img {
    margin: 0;
    padding-bottom: 8px;
    @media (max-width: 768px) {
      height: 82px;
    }
  }
  a {
    color: #262626;
    text-decoration: none;
  }
`;

const Header = () => (
    <LogoHome>
      <Link to="/"><img src={logo} alt="Monica Loddo Logo" /></Link>
      <Link to="/"><h1>Monica Loddo</h1></Link>
      <Link to="/"><p>Architect & Interior Designer</p></Link>
    </LogoHome>
)

export default Header