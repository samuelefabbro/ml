import React from "react"
import Layout from "../components/Layout"
import MaxWidth from "../components/MaxWidth"
import ProjectFooterNav from "../components/ProjectFooterNav"
import { Link, graphql } from 'gatsby'
import styled from "styled-components"
import logo from "../images/logo-black.svg"

import { Parser } from 'html-to-react'

const htmlToReactParser = new Parser()

// const Hero = styled(MaxWidth)`
//     position: relative;
//     height: 80vh;
//     max-height: 700px;
//     overflow: hidden;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
// `

// const Metas = styled(MaxWidth)`
//     z-index: 1;
//     padding: 4em 0;
//     position: absolute;
//     bottom: 0;
//     max-width: 100%;
//     color: ${({isHeroImage}) => (isHeroImage) ? 'white' : 'black'};
//     background: ${({isHeroImage}) => console.log(isHeroImage)};
// `



const Header = styled.section`
    width: 100%;
    padding-top: 100px;
    @media (max-width: 840px) {
      height: 75vh;
      padding-top: 50px;
    }
`;

const Logo = styled.div`
    width: 72px;
    margin: 0 auto;
    img {
      width: 72px;
    }
    @media (max-width: 840px) {
      width: 60px;
      margin: 0 auto 36px auto;
      img {
        width: 60px;
      }
    }
`;


const Year = styled.div`
    font-size: 12px;
    font-family: "Work Sans";
    font-weight: 600;
    text-align: center;
`;

const Title = styled.div`
    font-size: 32px;
    font-family: "Work Sans";
    font-weight: 600;
    margin-bottom: 6px;
    margin-top: 3px;
    text-align: center;
`;

const Location = styled.div`
    font-size: 12px;
    font-family: "Work Sans";
    font-weight: 400;
    text-align: center;
`;


const PostContent = styled.div`
    margin-top: 5em;
    margin-bottom: 5em;
`
const BigImage = styled.div`
    width: 100%;
    margin-top: 40px;
    margin-bottom: 20px;
`;

const TwoImages = styled.div`
    padding-left: 40px;
    padding-right: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 43px;
    @media(max-width: 600px) {
        grid-template-columns: 1fr;
    }

    img {
        width: 100%;
    }
`

const Gallery = styled(MaxWidth)`
`

const GalleryImg = styled.img`
    width: 100%;
    //max-width: 500px;
`

const projectTemplate = ({ data }) => {
    //The data prop^ is injected by the graphQL query below
    if (!data) return null

    const project = data.prismicProject.data

    const bodyContent = project.body.map((slice, index) => {
        let slice_type = slice.__typename

        if (slice_type === "PrismicProjectBodyParagraph") {
            return (
                <PostContent key={index}>
                    <MaxWidth size="s">
                        {htmlToReactParser.parse(slice.primary.paragraph.html)}
                    </MaxWidth>
                </PostContent>
            )
        }

        if (slice_type === "PrismicProjectBodyFullWidthImage") {
          let img_src = slice.primary.big_image.url
          return (
              <BigImage key={index}>
                  <MaxWidth size="xl">
                      <img src={img_src} alt=""/>
                  </MaxWidth>
              </BigImage>
          )
      }

        if (slice_type === "PrismicProjectBody2Images") {
            let img_1 = slice.primary.img_left.url
            let alt_1 = slice.primary.img_left.alt
            let img_2 = slice.primary.img_right.url
            let alt_2 = slice.primary.img_right.alt
            return (
                <TwoImages key={index}>
                    <img src={img_1} alt={alt_1} />
                    <img src={img_2} alt={alt_2} />
                </TwoImages>
            )
        }

        if (slice_type === 'PrismicProjectBodyImageGallery') {
            return (
                <Gallery key={index}>
                    {slice.items.map((item, i) => (
                        <GalleryImg
                            key={i}
                            src={item.gallery_image.url}
                            alt={item.gallery_image.alt}
                        />
                    ))}
                </Gallery>
            )
        }

        if (slice_type === 'PrismicProjectBodyLinks') {
            return (
                <MaxWidth key={index}>
                    <ProjectFooterNav data={slice.items}/>
                </MaxWidth>
            )
        }


        return null
    })


    return (
        <Layout className="Project" noTopPadding>

                <Header>
                <Logo>
                <Link to="/"><img src={logo} alt="Monica Loddo Logo"/></Link>
                </Logo>
                <Year>
                        {htmlToReactParser.parse(project.year.text)}
                    </Year>
                    <Title>
                        {htmlToReactParser.parse(project.title.text)}
                    </Title>
                    <Location>
                        {htmlToReactParser.parse(project.location.text)}
                    </Location>

            </Header>


            {bodyContent}
        </Layout>
    )
}

export default projectTemplate

// project.propTypes = {
//     data: PropTypes.object,
//     link: PropTypes.string,
// };



// @Sam Similar to the ProjectCard component, ProjectFooterNav can and should be pulled out into its own file!
// Below is an example of how to keep this component inside another file. See ProjectFooterNav.js to see
// the same snipped pulled out into its own file with its own scss stylesheet.
// Including a component within another file, like below, should be
// only used if the component is _really_ small and uncomplicated.
// const ProjectFooterNav = ({ data }) => {
//     console.log(data)
//     return (
//         <div>
//             <div>
//                 <Link to="/projects">
//                     All Projects
//                 </Link>
//             </div>
//             <div>
//                 <div>
//                     <Link to={`/projects/museum`}>
//                         Previous Project / Museum
//                     </Link>
//                 </div>
//                 <div>
//                     <Link to={`/projects/museum`}>
//                         Next Project / Museum
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     )
// }


export const query = graphql`
query PageQuery($uid: String) {
    prismicProject(uid: {eq: $uid}) {
        uid
        data {
          title {
            text
          }
          location {
            text
          }
          year {
            text
          }
          body {
            ... on PrismicProjectBodyImageGallery {
              id
              slice_type
              items {
                gallery_image {
                  url
                  alt
                }
              }
            }
            ... on PrismicProjectBodyLinks {
              id
              slice_type
              items {
                text_link
                all_projects_prev_next {
                  uid
                }
              }
            }
            ... on PrismicProjectBodyParagraph {
              id
              primary {
                paragraph {
                  html
                }
              }
            }
            ... on PrismicProjectBody2Images {
              id
              primary {
                img_left {
                  alt
                  url
                }
                img_right {
                  alt
                  url
                }
              }
            }
            ... on PrismicProjectBodyFullWidthImage {
              id
              primary {
                big_image {
                  alt
                  copyright
                  url
                }
              }
            }
          }
        }
  }
}
`