import React, { Fragment } from "react"
import Layout from "../components/Layout"
import MaxWidth from "../components/MaxWidth"
import { Link, graphql } from 'gatsby'
import styled from "styled-components"
import Img from "gatsby-image"
import PropTypes from 'prop-types'
import { Parser } from 'html-to-react'
import "normalize.css"

const htmlToReactParser = new Parser()

const HeroImg = styled.img`
    width: 100%;
`

const PostContent = styled.div`
    margin-top: 5em;
    margin-bottom: 5em;
`

const projectTemplate = ({ data }) => {
    //The data prop^ is injected by the graphQL query below
    if (!data) return null

    const project = data.prismicProject.data

    const bodyContent = project.body.map((slice, index) => {
        let slice_type = slice.__typename

        if (slice_type === "PrismicProjectBodyFullWidthImage") {
            let img_src = slice.primary.big_image.url

            return (
                <MaxWidth size="xl" key={index}>
                    <HeroImg src={img_src}/>
                </MaxWidth>
            )
        }

        if (slice_type === "PrismicProjectBodyParagraph") {
            return (
                <PostContent key={index}>
                    <MaxWidth size="s">
                        {htmlToReactParser.parse(slice.primary.paragraph.html)}
                    </MaxWidth>
                </PostContent>
            )
        }

        return null
    })


    return (
        <Layout className="Project">
            {htmlToReactParser.parse(project.title.html)}

            {bodyContent}
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
                  alt
                  copyright
                  url
                }
              }
            }
          }
        }
  }
}
`