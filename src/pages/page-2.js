	
import React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
 
const About = ({ data }) => {
    const document = data.prismicHomepage.data
    if (!document) return null

    const vimeo = document.video.text
	
  return (
    <Layout>
        <div>
            <img src={document.logo_home.url} alt="" />
            <h1>{document.name.text}</h1>
            <p>{document.tagline.text}</p>
            <iframe title="intro" src={`https://player.vimeo.com/video/${vimeo}?background=1&autoplay=1&loop=1&byline=0&title=0`}
                frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        </div>
    </Layout>
  )
}
 
export const query = graphql`
query {
  prismicHomepage {
    data {
      name {
        text
      }
      logo_home {
        url
      }
      tagline {
        text
      }
      video {
        text
      }
    }
  }
}

`
export default About
