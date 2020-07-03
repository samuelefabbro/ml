import React from "react"
import "normalize.css"
import Nav from "./Nav"

const Layout = ({ children }) => {

  return (
      <div>
        <Nav />
        <main>{children}</main>
      </div>
  )
}

export default Layout
