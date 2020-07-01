import { Parser } from 'html-to-react'
import React from "react"
import { graphql } from 'gatsby'

import SEO from "../components/seo"
import Layout from "../components/layout"

const htmlToReactParser = new Parser()

const About = ({ data }) => {
  const document = data.prismicAbout.data
  if (!document) return null

  const image = document.body[0].items[0].image.url





  return (
    <Layout>

    <SEO title="Monica Loddo | Architect and Interior Designer | Contact page" />
    <img src={document.logo.url} alt={document.logo.alt} />
    <h4>{document.description.text}</h4>
      <img src={image} alt=""/>
    {htmlToReactParser.parse(document.body[1].items[0].text.html)}

    </Layout>
  )
}



export const query = graphql`
query {
  prismicAbout {
    data {
      body {
        ... on PrismicAboutBodyGallery {
          items {
            image {
              url
            }
          }
        }
        ... on PrismicAboutBodyParagraph {
          items {
            text {
              html
            }
          }
        }
      }
      description {
        text
      }
      logo {
        url
        alt
      }
      page_title {
        text
      }
    }
  }
}
`


export default About
