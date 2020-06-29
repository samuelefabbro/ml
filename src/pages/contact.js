import React from "react"
import { RichText } from "prismic-reactjs"
import { graphql } from 'gatsby'
import styled from "styled-components"
import SEO from "../components/seo"

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


const Contact = ({ data }) => {
  const document = data.prismicContact.data
  if (!document) return null

  const phone = data.prismicContact.data.phone.html
  return (

    <Wrapper>
    <SEO title="Monica Loddo | Architect and Interior Designer | Contact page" />
    <img src={document.logo_white.url} alt="" />
    <h1>{document.contact.text}</h1>
    <p>{document.paragraph.text}</p>
      <RichText render={document.paragraph} />

      <RichText render={phone} />

        <h3><a href="tel:+855081642389">+855 (0) 81 642389</a></h3>
    </Wrapper>
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
        text
      }
      phone {
        html
      }
    }
  }
}
  `







export default Contact



