import React from "react"
import styled from "styled-components"
import Nav from "./Nav"
import "../styles/globals.scss"
import CookieConsent from "react-cookie-consent"

const LayoutDiv = styled.div`
    height: 100%;
    position: relative;
    padding-top: ${({ noTopPadding }) => (noTopPadding ? "0" : "4eme")};
`
const Main = styled.main`
    height: 100%;
`

const Layout = ({ menuTheme, children }) => {
    return (
        <LayoutDiv>
            <CookieConsent
                acceptOnScroll={true}
                acceptOnScrollPercentage={10}
                style={{
                    background: "#262626",
                    opacity: "0.9",
                }}
                contentStyle={{
                    fontSize: "14px",
                    maxWidth: "700px",
                }}
                buttonStyle={{
                    background: "#ffffff",
                    color: "#262626",
                }}
                location="bottom"
                cookieName="myAwesomeCookieName3"
                expires={999}
            >
                This website uses cookies to enhance the user experience.
            </CookieConsent>
            <Nav menuTheme={menuTheme} />
            <Main>{children}</Main>
        </LayoutDiv>
    )
}

export default Layout
