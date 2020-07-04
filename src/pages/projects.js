
import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from "../components/Layout"
import MaxWidth from "../components/MaxWidth"
import ProjectCard from "../components/ProjectCard"

const Projects = ({ data }) => {
    const document = data.prismicProjects.data
    if (!document) return null

    let projects = data.prismicProjects.data.projects || null

    //console.log(projects)

    return (
        <Layout>
            <MaxWidth>
                <Link to="/"><img src={document.logo.url} alt="" /></Link>
                <h1>
                    {document.projects1.text}
                </h1>
                <div>
                    {projects.map((project, i) => (
                        <ProjectCard
                            data={project}
                            key={i}
                        />
                    ))}
                </div>
            </MaxWidth>
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