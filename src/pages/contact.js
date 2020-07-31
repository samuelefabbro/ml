import { Parser } from "html-to-react"
import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import SEO from "../components/SEO"
import Layout from "../components/Layout"
import FooterWhite from "../components/FooterWhite"

const Body = styled.section`
    background-color: #262626;
    height: 100vh;
`

const Header = styled.section`
    padding-top: 50px;
    @media (max-width: 500px), (max-height: 650px) {
        padding-top: 30px;
    }
`

const Logo = styled.div`
    width: 72px;
    margin: 0 auto;
    img {
        width: 72px;
    }
    @media (max-width: 500px), (max-height: 650px) {
        width: 40px;
        margin: 0 auto;
        img {
            width: 40px;
        }
    }
`

const Title = styled.h1`
    color: #ffffff;
    font-size: 26px;
    font-family: "Work Sans";
    font-weight: 600;
    text-align: center;
    margin: 46px auto 52px auto;
    @media (max-width: 500px), (max-height: 650px) {
        margin: 12px auto 34px auto;
        font-size: 16px;
    }
`
const Center = styled.div`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
    position: absolute;
    @media (max-height: 530px) {
        transform: translate(-50%, -30%);
    }
    @media (max-height: 400px) {
        transform: translate(-50%, -10%);
    }
`

const Description = styled.div`
    font-family: "Work Sans";
    text-align: center;
    color: #ffffff;
    font-size: 20px;
    max-width: 900px;
    line-height: 26px;
    margin: 0 auto;
    padding-left: 40px;
    padding-right: 40px;
    margin-bottom: 0px;
    @media (max-width: 840px) {
        max-width: 700px;
        margin-bottom: 40px;
        font-size: 16px;
        line-height: 22px;
    }
    @media (max-width: 500px) {
        padding-left: 15px;
        padding-right: 15px;
    }
    a {
        color: #ffffff;
        text-decoration: none;
    }
    p {
        line-height: 22px;
        margin-bottom: 28px;
        @media (max-width: 500px), (max-height: 400px) {
            margin-bottom: 16px;
        }
    }
    h3 {
        font-size: 22px;
        margin-bottom: 10px;
        @media (max-width: 500px), (max-height: 400px) {
            font-size: 16px;
            margin-bottom: 10px;
        }
    }
`

const Address = styled.p`
    margin-top: 26px;
    font-size: 14px;
    line-height: 22px;
    @media (max-width: 500px), (max-height: 400px) {
        margin-top: 12px;
        font-size: 10px;
    }
`

const Contact = ({ data }) => {
    const document = data.prismicContact.data
    if (!document) return null

    const htmlToReactParser = new Parser()

    return (
        <Layout menuTheme="light">
            <Body>
                <Header>
                    <SEO title="Monica Loddo | Architect and Interior Designer | Contact page" />
                    <Logo>
                        <Link to="/">
                            <img
                                src={document.logo_white.url}
                                alt={document.logo_white.alt}
                            />
                        </Link>
                    </Logo>

                    <Title>{document.contact.text}</Title>
                    <Center>
                        <Description>
                            {htmlToReactParser.parse(document.paragraph.html)}
                            {htmlToReactParser.parse(document.email.html)}
                            {htmlToReactParser.parse(document.phone.html)}
                            <Address>
                                {htmlToReactParser.parse(document.address.html)}
                            </Address>
                        </Description>
                    </Center>
                    <FooterWhite />
                </Header>
            </Body>
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
                address {
                    html
                }
            }
        }
    }
`

export default Contact
