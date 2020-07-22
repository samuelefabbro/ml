
import React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import styled from "styled-components"
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

const Video = styled.div`
    width: 100%;
`;

const Overlay = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    @media (max-width: 768px) {
            transform: translate(-50%, -35%);
          }
    img {
        @media (max-width: 768px) {
            height: 130px;
          }
        @media (max-width: 500px) {
            height: 100px;

          }
    }
`;



const IndexPage = ({ data }) => {
    const document = data.prismicHomepage.data
    if (!document) return null


  return (
    <Layout>
        <LogoHome>
            <img src={document.logo_home.url} alt={document.logo_home.alt} />
            <h1>{document.name.text}</h1>
            <p>{document.tagline.text}</p>
        </LogoHome>

        <Video>
            
            <Overlay>
              <img src={document.overlay.url} alt={document.overlay.alt} />
            </Overlay>
            <video loop autoPlay muted width="100%">
                <source src={document.video1.url} type="video/mp4" />
            </video>
        </Video>

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
      video1 {
        url
      }
      overlay {
        url
      }
    }
  }
}
`
export default IndexPage
