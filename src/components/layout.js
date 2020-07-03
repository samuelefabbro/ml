import React from "react"
import styled from "styled-components"
import Nav from "./Nav"

import "normalize.css"
import '../styles/globals.scss';

const LayoutDiv = styled.div`
    height: 100%;
    position: relative;
`
const Main = styled.main`
    height: 100%;
`

const Layout = ({ children }) => {
    return (
        <LayoutDiv>
            <Nav />
            <Main>
                {children}
            </Main>
        </LayoutDiv>
    )
}

export default Layout