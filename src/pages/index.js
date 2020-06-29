import React from "react"


import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from '../components/header'
import Video from '../components/video'



const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Header />
    <Video />
  </Layout>
)

export default IndexPage
