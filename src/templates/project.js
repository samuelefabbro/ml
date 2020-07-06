import React from "react"
import Layout from "../components/Layout"
import MaxWidth from "../components/MaxWidth"
import ProjectFooterNav from "../components/ProjectFooterNav"
import { graphql } from 'gatsby'
import styled from "styled-components"

import { Parser } from 'html-to-react'
import "normalize.css"

const htmlToReactParser = new Parser()

const Hero = styled(MaxWidth)`
    position: relative;
    height: 80vh;
    max-height: 700px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Metas = styled(MaxWidth)`
    z-index: 1;
    padding: 4em 0;
    position: absolute;
    bottom: 0;
    max-width: 100%;
    color: ${({isHeroImage}) => (isHeroImage) ? 'white' : 'black'};
    background: ${({isHeroImage}) => console.log(isHeroImage)};
`

const HeroImg = styled.img`
    width: 100%;
`

const Year = styled.h5`
    text-align: center;
    font-size: 1em;
    font-weight: 600;
`

const Title = styled.h1`
    text-align: center;
    font-size: 2.75em;
    line-height: 140%;
    text-transform: uppercase;
    letter-spacing: -0.03em;
    margin: 0;
`

const Location = styled.h5`
    text-align: center;
    font-size: 1em;
`

const PostContent = styled.div`
    margin-top: 5em;
    margin-bottom: 5em;
`

const TwoImages = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

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

    let heroImage = project.body.filter(slice => {
        return slice.__typename === "PrismicProjectBodyFullWidthImage"
    }).map((slice, index) => {
        let img_src = slice.primary.big_image.url

        return (
            <HeroImg src={img_src} key={index}/>
        )
    })

    return (
        <Layout className="Project" noTopPadding>
            <Hero size="xl">
                <Metas isHeroImage={heroImage}>
                    <Year>
                        {htmlToReactParser.parse(project.year.text)}
                    </Year>
                    <Title>
                        {htmlToReactParser.parse(project.title.text)}
                    </Title>
                    <Location>
                        {htmlToReactParser.parse(project.location.text)}
                    </Location>
                </Metas>

                {/* If there is a heroImage, show a hero image. */}
                {heroImage && (
                    <>
                        {heroImage}
                    </>
                )}
            </Hero>
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