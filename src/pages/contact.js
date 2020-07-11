import { Parser } from 'html-to-react'
import React from "react"
import { graphql } from 'gatsby'
import styled from "styled-components"
import SEO from "../components/SEO"
import Layout from "../components/Layout"
import FooterWhite from "../components/FooterWhite"


const Header = styled.section`
background: #262626;
height: 100vh;
    padding-top: 100px;
    @media (max-width: 840px) {

      padding-top: 50px;
    }
`;

const Logo = styled.div`
    width: 72px;
    margin: 0 auto;
    img {
      width: 72px;
    }
    @media (max-width: 840px) {
      width: 60px;
      margin: 0 auto 36px auto;
      img {
        width: 60px;
      }
    }
`;

const Title = styled.h1`
    color: #ffffff;
    font-size: 32px;
    font-family: "Work Sans";
    font-weight: 600;
    text-align: center;
    margin: 105px auto 50px auto;
    @media (max-width: 840px) {
      margin: 58px auto 75px auto;
      font-size: 24px;
    }
`;

const Description = styled.div`
    font-family: "Work Sans";
    text-align: center;
    color: #ffffff;
    font-size: 18px;
    max-width: 900px;
    line-height: 26px;
    margin: 0 auto;
    padding-left: 40px;
    padding-right: 40px;
    margin-bottom: 0px;
    @media (max-width: 840px) {
      max-width: 700px;
      margin-bottom: 40px;
      font-size: 18px;
      line-height: 25px;
    }
    @media (max-width: 500px) {

      padding-left: 20px;
      padding-right: 20px;
    }
    a {
      color: #ffffff;
      text-decoration: none;
    }
    p {
      line-height: 26px;
      margin-bottom: 20px;
    }
    h3 {
      font-size: 24px;
      margin-bottom: 12px;
      @media (max-width: 500px) {
        font-size: 22px;
        margin-bottom: 8px;
      }
    }
`;




const Contact = ({ data }) => {
    const document = data.prismicContact.data
    if (!document) return null

    const htmlToReactParser = new Parser()

    return (
        <Layout menuTheme="light">

              <Header>
                <SEO title="Monica Loddo | Architect and Interior Designer | Contact page" />
                <Logo><img src={document.logo_white.url} alt="" /></Logo>
                
                <Title>
                    {document.contact.text}
                </Title>
                <Description>
                {htmlToReactParser.parse(document.paragraph.html)}
                {htmlToReactParser.parse(document.email.html)}
                {htmlToReactParser.parse(document.phone.html)}
                </Description>
                <FooterWhite />
                </Header>


        </Layout>
    )
}


export const query = graphql`
query {
  prismicContact {
    data {
      contact {
        text
      }
      email {
        html
      }
      logo_white {
        url
      }
      paragraph {
        html
      }
      phone {
        html
      }
    }
  }
}
  `







export default Contact



