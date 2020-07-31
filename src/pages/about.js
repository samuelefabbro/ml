import { Parser } from "html-to-react"
import React, { Fragment } from "react"
import Layout from "../components/Layout"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Footer from "../components/Footer"

const htmlToReactParser = new Parser()

const AboutImg = styled.img`
    width: 100%;
    max-width: 600px;
`

const Header = styled.section`
    padding-top: 50px;
    @media (max-width: 500px) {
        padding-top: 30px;
    }
`

const Logo = styled.div`
    width: 72px;
    margin: 0 auto;
    img {
        width: 72px;
    }
    @media (max-width: 500px) {
        width: 40px;
        margin: 0 auto;
        img {
            width: 40px;
        }
    }
`

const Title = styled.h1`
    font-size: 26px;
    font-family: "Work Sans";
    font-weight: 600;
    text-align: center;
    margin: 46px auto 52px auto;
    @media (max-width: 500px) {
        margin: 12px auto 14px auto;
        font-size: 16px;
    }
`

const MasonryWrapper = styled.div`
    padding: 0 40px;
    max-width: 1920px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 60px;
    @media (max-width: 840px) {
        margin-bottom: 30px;
    }
    @media (max-width: 500px) {
        padding: 0 18px;
        margin-bottom: 20px;
    }
`

const Masonry = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 12px 20px;

    @media (max-width: 840px) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 2px 10px;
    }
    @media (max-width: 500px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: 0px 6px;
    }
`

const MasonryItem = styled.div`
    width: 100%;

    img {
        width: 100%;
    }
`

const ParagraphContainer = styled.div`
    font-family: "Work Sans";
    font-size: 16px;
    max-width: 900px;
    line-height: 22px;
    text-align: center;
    margin: 0 auto;
    padding-left: 40px;
    padding-right: 40px;
    margin-bottom: 60px;
    @media (max-width: 840px) {
        max-width: 700px;
        margin-bottom: 60px;
    }
    @media (max-width: 500px) {
        padding-left: 18px;
        padding-right: 18px;
        font-size: 12px;
        line-height: 16px;
        margin-bottom: 25px;
    }
`

const About = ({ data }) => {
    const logo = data.allPrismicAbout.edges[0].node.data.logo.url
    const logoAlt = data.allPrismicAbout.edges[0].node.data.logo.alt
    const title = data.allPrismicAbout.edges[0].node.data.page_title.text
    const prismicContent = data.allPrismicAbout.edges[0]
    if (!prismicContent) return null

    const content = prismicContent.node.data.body.map((slice, index) => {
        // Render the right markup for the given slice type
        let slice_type = slice.slice_type

        // Text Slice
        if (slice_type === "paragraph") {
            let items = slice.items.map(item =>
                htmlToReactParser.parse(item.text.html)
            )

            return (
                <ParagraphContainer key={`slice-${index}`}>
                    <Fragment>{items}</Fragment>
                </ParagraphContainer>
            )
        }

        // Image Gallery Slice
        if (slice_type === "gallery") {
            return (
                <MasonryWrapper key={index}>
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
                    <Link to="/">
                        <img src={logo} alt={logoAlt} />
                    </Link>
                </Logo>
                <Title>{title}</Title>
            </Header>

            {content}
            <Footer />
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
