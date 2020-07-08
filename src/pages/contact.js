import { Parser } from 'html-to-react'
import React from "react"
import { graphql } from 'gatsby'
import styled from "styled-components"
import SEO from "../components/SEO"
import Layout from "../components/Layout"
import FooterWhite from "../components/FooterWhite"

const Wrapper = styled.div`
  background: #262626;
  height: 100vh;
  font-family: "Work Sans";
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    font-family: "Work Sans";
    font-size: 36px;
    color: white;
  }
  p {
    max-width: 430px;
    font-size: 24px;
    line-height: 150%;
    margin: 0 auto 50px auto;
    color: white;

  }
  h3 {
    font-size: 32px;
    font-weight: 400;
    margin: 0 0 15px 0;
    a {
    text-decoration: none;
    color: white;
    }
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




const Contact = ({ data }) => {
    const document = data.prismicContact.data
    if (!document) return null

    const htmlToReactParser = new Parser()

    return (
        <Layout menuTheme="light">
            <Wrapper>
                <SEO title="Monica Loddo | Architect and Interior Designer | Contact page" />
                <Logo><img src={document.logo_white.url} alt="" /></Logo>
                
                <h1>
                    {document.contact.text}
                </h1>
                {htmlToReactParser.parse(document.paragraph.html)}
                {htmlToReactParser.parse(document.email.html)}
                {htmlToReactParser.parse(document.phone.html)}
                <FooterWhite />
            </Wrapper>

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



