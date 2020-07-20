
import React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import styled from "styled-components"
import logo from "../images/logo-overlay.svg"
import logocircle from "../images/MonicaLoddo-logo-circle.svg"
import Footer from "../components/Footer"


const LogoHome = styled.div`
font-family: "Work Sans", sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
  width: 100%;
  background: #ffffff;
  height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  @media (max-width: 768px) {
    height: 190px;
    padding-top: 32px;
  }
  h1 {
    font-weight: 700;
    line-height: 1.2em;
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
    letter-spacing: -0.03em;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  img {
    width: 72px;
    margin: 0;
    padding-bottom: 8px;
    @media (max-width: 768px) {
      width: 60px;
    }
  }
  a {
    color: #262626;
    text-decoration: none;
  }
`;

const VimeoWrapper = styled.div`
 {
    /* position: fixed;
    top: 100px;
    left: 0; */
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;
    // background-image: url(${logocircle});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    iframe {
        width: 100%;
        height: 56.25vw; /* Given a 16:9 aspect ratio, 9/16*100 = 56.25 */
        min-height: 100vh;
        min-width: 177.77vh; /* Given a 16:9 aspect ratio, 16/9*100 = 177.77 */
        /* position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); */
     }
 }
`;

const Overlay = styled.div`
{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    img {
        @media (max-width: 768px) {
            height: 153px;
          }
    }
}`;




const IndexPage = ({ data }) => {
    const document = data.prismicHomepage.data
    if (!document) return null

    const youtube = document.video.text

  return (
    <Layout>
        <LogoHome>
            <img src={document.logo_home.url} alt="" />
            <h1>{document.name.text}</h1>
            <p>{document.tagline.text}</p>
        </LogoHome>

        <VimeoWrapper>
            <Overlay>
                <img src={logo} alt="Monica Loddo Logo" />
            </Overlay>
            <iframe title="intro" src={`https://www.youtube-nocookie.com/embed/${youtube}?rel=0&modestbranding=1&autohide=1&disablekb=1&mute=1&showinfo=0&loop=1&playlist=${youtube}&controls=0&autoplay=1`} frameborder="0" allow="autoplay"></iframe>

        </VimeoWrapper>

        <Footer />



    </Layout>
  )
}

export const query = graphql`
query {
  prismicHomepage {
    data {
      name {
        text
      }
      logo_home {
        url
      }
      tagline {
        text
      }
      video {
        text
      }
    }
  }
}

`
export default IndexPage
