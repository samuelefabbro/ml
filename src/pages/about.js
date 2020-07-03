import { Parser } from 'html-to-react'
import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import styled from "styled-components"
import Layout from "../components/Layout"
import MaxWidth from "../components/MaxWidth"
const htmlToReactParser = new Parser()

const AboutImg = styled.img`
    width: 100%;
    max-width: 500px;
`

const About = ({ data }) => {
    const prismicContent = data.allPrismicAbout.edges[0]
    if (!prismicContent) return null

    console.log(prismicContent)

    const content = prismicContent.node.data.body.map((slice, index) => {
        // Render the right markup for the given slice type
        let slice_type = slice.slice_type

        // Text Slice
        if (slice_type === 'paragraph') {
            let items = slice.items.map(item => htmlToReactParser.parse(item.text.html))

            return (
                <Fragment key={`slice-${index}`}>
                    {items}
                </Fragment>
            )
        }

        // Image Gallery Slice
        if (slice_type === 'gallery') {

            return (
                <div key={index}>
                    {slice.items.map((item, i) => (
                        <AboutImg
                            key={i}
                            src={item.image.url}
                            alt={item.image.alt}
                        />
                    ))}
                </div>
            )
        }

        return null
    })

    return (
        <Layout>
            <MaxWidth>
                {content}
            </MaxWidth>
        </Layout>
    )
}

export const query = graphql`
  query {
    allPrismicAbout {
      edges {
        node {
          data {
            body {
              ... on PrismicAboutBodyParagraph {
                id
                items {
                  text {
                    html
                  }
                }
                slice_type
              }
              ... on PrismicAboutBodyGallery {
                id
                slice_type
                items {
                  image {
                    alt
                    url
                  }
                }
              }
            }
            description {
              text
            }
            logo {
              alt
              url
            }
            page_title {
              text
            }
          }
        }
      }
    }
  }
`


export default About