import { Parser } from 'html-to-react'
import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
const htmlToReactParser = new Parser()

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

        console.log(slice)

        return (
          <Fragment key={`slice-${index}`}>
            {items}
          </Fragment>
        )
      }

      // Image Gallery Slice
      if (slice_type === 'gallery') {
        console.log(slice)

        return (
          <div>
            {slice.items.map((item, index) => (
              <img
                key={index}
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
        {content}
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