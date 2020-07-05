import { Parser } from 'html-to-react'
import React, { Fragment } from 'react'
import Layout from "../components/Layout"
import { Link, graphql } from 'gatsby'
import styled from "styled-components"


const htmlToReactParser = new Parser()

const AboutImg = styled.img`
    width: 100%;
    max-width: 600px;
`;

const Header = styled.section`
    height: 100vh;
    padding-top: 100px;
    @media (max-width: 840px) {
      height: 75vh;
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
    font-size: 36px;
    font-family: "Work Sans";
    font-weight: 600;
    text-align: center;
    margin: 105px auto 155px auto;
    @media (max-width: 840px) {
      margin: 68px auto 90px auto;
      font-size: 24px;
    }
`;

const Description = styled.div`
    font-family: "Work Sans";
    font-size: 24px;
    max-width: 900px;
    line-height: 36px;
    margin: 0 auto;
    padding-left: 40px;
    padding-right: 40px;
    margin-bottom: 60px;
    @media (max-width: 840px) {
      max-width: 700px;
      margin-bottom: 20px;
      font-size: 18px;
      line-height: 25px;
    }
    @media (max-width: 500px) {
      padding-left: 20px;
      padding-right: 20px;
    }
`;

const MasonryWrapper = styled.div`
    padding: 0 40px;
    max-width: 1440px;
    margin-right: auto;
    margin-left: auto;
    @media (max-width: 500px) {
      padding-left: 20px;
      padding-right: 20px;
    }
`;

const Masonry = styled.div`
    columns: 2;
    column-gap: 16px;
    @media (min-width: 840px) {
      columns: 3;
      column-gap: 38px;
    }
`;

const MasonryItem = styled.div`
    display: inline-block;
    vertical-align: top;
    margin-bottom: 38px;
    width: 100%;

    img {
        width: 100%;
    }

    @media (max-width: 840px) {
      margin-bottom: 16px;
    }

`;

const ParagraphContainer = styled.div`
    font-family: "Work Sans";
    font-size: 22px;
    max-width: 900px;
    line-height: 33px;
    margin: 0 auto;
    padding-left: 40px;
    padding-right: 40px;
    margin-bottom: 60px;
    @media (max-width: 840px) {
      margin-top: 40px;
      margin-bottom: 20px;
      font-size: 16px;
      line-height: 22px;
    }
    @media (max-width: 500px) {
      padding-left: 20px;
      padding-right: 20px;
    }
`;

const About = ({ data }) => {
    const logo = data.allPrismicAbout.edges[0].node.data.logo.url
    const logoAlt = data.allPrismicAbout.edges[0].node.data.logo.alt
    const title = data.allPrismicAbout.edges[0].node.data.page_title.text
    const description = data.allPrismicAbout.edges[0].node.data.description.html
    const prismicContent = data.allPrismicAbout.edges[0]
    if (!prismicContent) return null

    const content = prismicContent.node.data.body.map((slice, index) => {
        // Render the right markup for the given slice type
        let slice_type = slice.slice_type

        // Text Slice
        if (slice_type === 'paragraph') {
            let items = slice.items.map(item => htmlToReactParser.parse(item.text.html))

            return (
                <ParagraphContainer key={`slice-${index}`}>
                    <Fragment>
                        {items}
                    </Fragment>
                </ParagraphContainer>
            )
        }

        // Image Gallery Slice
        if (slice_type === 'gallery') {
            return (
                <MasonryWrapper>
                    <Masonry key={index}>
                        {slice.items.map((item, i) => (
                            <MasonryItem key={i}>
                                <AboutImg
                                    src={item.image.url}
                                    alt={item.image.alt}
                                />
                            </MasonryItem>
                        ))}
                    </Masonry>
                </MasonryWrapper>
            )
        }

        return null
    })

    return (
        <Layout>
            <Header>
                <Logo>
                    <Link to="/"><img src={logo} alt={logoAlt} /></Link>
                </Logo>
                <Title>
                    {title}
                </Title>
                <Description>
                    {htmlToReactParser.parse(description)}
                </Description>
            </Header>

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
              html
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