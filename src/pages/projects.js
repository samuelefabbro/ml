
import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from "../components/layout"

const Projects = ({ data }) => {
    const document = data.prismicProjects.data
    if (!document) return null
  
    return (
      <Layout>
        <img src={document.logo.url} alt="" />   
      <h1>{document.projects1.text}</h1>
      <Link to={document.projects[0].project.uid}>Project 1</Link>
      <Link to={document.projects[1].project.uid}>Project 2</Link>
      </Layout>
    )
  }
  



export const query = graphql`
query {
    prismicProjects {
      data {
        logo {
          alt
          url
        }
        projects {
          project {
            uid
          }
          project_image {
            alt
            url
          }
          project_location {
            html
          }
          project_title {
            html
          }
          project_year {
            html
          }
        }
        projects1 {
          text
        }
      }
    }
  }`

  export default Projects