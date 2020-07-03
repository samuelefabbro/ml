import React from "react"
import { RichText } from "prismic-reactjs";
import Layout from "../components/Layout"
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { Parser } from 'html-to-react'
import "normalize.css"

const htmlToReactParser = new Parser()

const projectTemplate = ({ data }) => {
  //The data prop^ is injected by the graphQL query below
  if (!data) return null

  const project = data.prismicProject.data

  return (
      <Layout className="Project">
        {htmlToReactParser.parse(project.title.html)}

        {project.body.map((slice, index) => (
          <>
            slice {index}
          </>
        ))}
      </Layout>
  )
}

export default projectTemplate

// project.propTypes = {
//     data: PropTypes.object,
//     link: PropTypes.string,
// };

export const query = graphql`
query PageQuery($uid: String) {
    prismicProject(uid: {eq: $uid}) {
        uid
        data {
          title {
            html
          }
          location {
            html
          }
          body {
            ... on PrismicProjectBodyImageGallery {
              id
              slice_type
            }
            ... on PrismicProjectBodyLinks {
              id
              slice_type
              items {
                text_link
              }
            }
            ... on PrismicProjectBodyParagraph {
              id
              primary {
                paragraph {
                  html
                }
              }
            }
            ... on PrismicProjectBody2Images {
              id
              primary {
                img_left {
                  alt
                  fluid {
                    src
                  }
                }
                img_right {
                  fluid {
                    src
                  }
                }
              }
            }
            ... on PrismicProjectBodyFullWidthImage {
              id
              primary {
                big_image {
                  fluid {
                    src
                  }
                }
              }
            }
          }
        }
  }
}
`