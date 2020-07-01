import { Parser } from 'html-to-react'	
import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
const htmlToReactParser = new Parser()

const About = ({ data }) => {
    const prismicContent = data.allPrismicAbout.edges[0]
    if (!prismicContent) return null
   
    const content = prismicContent.node.body.map((slice, index) => {
      // Render the right markup for the given slice type
   
      // Text Slice
      if (slice.slice_type === 'paragraph') {
        return (
          <Fragment key={`slice-${index}`}>
           {htmlToReactParser.parse(slice.items.text.html)}
          </Fragment>
        )
   
      // Image Gallery Slice

   
      // Return null by default
      }
      return null
    })
   
    return (
      <div>
        {content}
      </div>
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
