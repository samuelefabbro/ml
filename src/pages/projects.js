
import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from "styled-components"
import Layout from "../components/Layout"
import ProjectCard from "../components/ProjectCard"
import MaxWidth from "../components/MaxWidth"
import Footer from "../components/Footer"


const Header = styled.section`
    padding-top: 50px;
`;

const Logo = styled.div`
    width: 72px;
    margin: 0 auto;
    img {
      width: 72px;
    }
    @media (max-width: 840px) {
      width: 60px;
      margin: 0 auto;
      img {
        width: 60px;
      }
    }
`;

const Title = styled.h1`
    font-size: 26px;
    font-family: "Work Sans";
    font-weight: 600;
    text-align: center;
    margin: 46px auto 52px auto;
    @media (max-width: 840px) {
      margin: 30px auto 40px auto;
      font-size: 24px;
    }
`;


const Project = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    //grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 10px 20px;

    @media (max-width: 840px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 540px) {
      grid-template-columns: 1fr;
    }
`;



const Projects = ({ data }) => {
    const document = data.prismicProjects.data
    if (!document) return null

    let projects = data.prismicProjects.data.projects || null

    //console.log(projects)

    return (
        <Layout>
            <MaxWidth size="l">
                <Header>
                    <Logo>
                        <Link to="/"><img src={document.logo.url} alt="Monica Loddo Logo" /></Link>
                    </Logo>
                    <Title>
                        {document.projects1.text}
                    </Title>
                </Header>

                <Project>
                    {projects.map((project, i) => (
                        <ProjectCard
                            data={project}
                            key={i}
                        />
                    ))}
                </Project>

                <Footer />
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
            text
          }
          project_title {
            text
          }
          project_year {
            text
          }
        }
        projects1 {
          text
        }
      }
    }
  }`

export default Projects