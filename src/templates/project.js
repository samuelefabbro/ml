import React from "react"
import Layout from "../components/Layout"
import MaxWidth from "../components/MaxWidth"
import ProjectFooterNav from "../components/ProjectFooterNav"
import { graphql } from 'gatsby'
import styled from "styled-components"


import { Parser } from 'html-to-react'
import "normalize.css"

const htmlToReactParser = new Parser()

const HeroImg = styled.img`
    width: 100%;
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

const GalleryImg = styled.img`
    width: 100%;
    max-width: 500px;
`

const projectTemplate = ({ data }) => {
    //The data prop^ is injected by the graphQL query below
    if (!data) return null

    const project = data.prismicProject.data

    const bodyContent = project.body.map((slice, index) => {
        let slice_type = slice.__typename

        if (slice_type === "PrismicProjectBodyFullWidthImage") {
            let img_src = slice.primary.big_image.url

            return (
                <MaxWidth size="xl" key={index}>
                    <HeroImg src={img_src} />
                </MaxWidth>
            )
        }

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
                <div key={index}>
                    {slice.items.map((item, i) => (
                        <GalleryImg
                            key={i}
                            src={item.gallery_image.url}
                            alt={item.gallery_image.alt}
                        />
                    ))}
                </div>
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
        <Layout className="Project">
            {htmlToReactParser.parse(project.year.text)}
            {htmlToReactParser.parse(project.title.text)}
            {htmlToReactParser.parse(project.location.text)}

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