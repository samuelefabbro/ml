import React from "react"
import Layout from "../components/Layout"
import { Link, graphql } from 'gatsby'
import styled from "styled-components"
import logo from "../images/logo-black.svg"
import Footer from "../components/Footer"

import { Parser } from 'html-to-react'

const htmlToReactParser = new Parser()



const Header = styled.section`
    width: 100%;
    padding-top: 100px;
    @media (max-width: 840px) {
      height: 75vh;
      padding-top: 50px;
    }
    @media(max-width: 500px) {
      height: 100%;
  }
`;

const Wrapper = styled.div`
    padding-top: 90px;
    padding-bottom: 110px;
    @media(max-width: 500px) {
      padding-top: 50px;
      padding-bottom: 80px;
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
    text-align: center;
    line-height: 1.4em;
    @media(max-width: 500px) {
      font-size: 28px;
      line-height: 1.2em;
  }
`;

const Location = styled.div`
    font-size: 12px;
    font-family: "Work Sans";
    font-weight: 400;
    text-align: center;
`;


const PostContent = styled.div`
    max-width: 980px;
    margin: 60px auto 60px auto;
    padding-left: 60px;
    padding-right: 60px;
    font-size: 22px;
    line-height: 34px;
    a {
      color: #262626;
    }
    @media(max-width: 768px) {
      font-size: 16px;
      line-height: 24px;
      margin-top: 25px;
      margin-bottom: 25px;
      padding-left: 60px;
      padding-right: 60px;
    }
    @media(max-width: 500px) {
      font-size: 16px;
      padding-left: 15px;
      padding-right: 15px;
    }
`
const BigImage = styled.div`
    width: 100%;
    margin-top: 20px;
    margin-bottom: 60px;
    @media(max-width: 768px) {
      margin-top: 10px;
      margin-bottom: 10px;
  }
    @media(max-width: 500px) {
      margin-top: 10px;
      margin-bottom: 10px;
      padding-left: 15px;
      padding-right: 15px;
    }
`;

const TwoImages = styled.div`
    padding: 40px 40px 60px 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 43px;
    @media(max-width: 768px) {
      grid-gap: 15px;
      padding: 20px 15px 20px 15px;
  }
    @media(max-width: 500px) {
        grid-template-columns: 1fr;
        padding: 10px 15px 10px 15px;
    }

    img {
        width: 100%;
    }
`;

const Gallery = styled.div`
    max-width: 980px;
    margin: 40px auto 40px auto;
    padding-left: 60px;
    padding-right: 60px;
    @media(max-width: 768px) {
      padding-left: 60px;
      padding-right: 60px;
  }
    @media(max-width: 500px) {
        padding: 10px 15px 10px 15px;
    }

`;

const GalleryImg = styled.img`
    width: 100%;
    //max-width: 500px;
`;

const projectTemplate = ({ data }) => {
    //The data prop^ is injected by the graphQL query below
    if (!data) return null

    const project = data.prismicProject.data

    const bodyContent = project.body.map((slice, index) => {
        let slice_type = slice.__typename

        if (slice_type === "PrismicProjectBodyParagraph") {
            return (
                <PostContent key={index}>

                        {htmlToReactParser.parse(slice.primary.paragraph.html)}

                </PostContent>
            )
        }

        if (slice_type === "PrismicProjectBodyFullWidthImage") {
          let img_src = slice.primary.big_image.url
          let img_alt = slice.primary.big_image.alt
          return (
              <BigImage key={index}>

                      <img src={img_src} alt={img_alt}/>

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
              <div key={index}>
              {slice.items.map((item, i) => (
                  <Link to={`/projects/${item.all_projects_prev_next.uid}`}>{item.text_link}</Link>
              ))}
          </div>
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
                  <Wrapper>
       
                <Year>
                        {htmlToReactParser.parse(project.year.text)}
                    </Year>
                    <Title>
                        {htmlToReactParser.parse(project.title.text)}
                    </Title>
                    <Location>
                        {htmlToReactParser.parse(project.location.text)}
                    </Location>
                  </Wrapper>


            </Header>


            {bodyContent}

            <Footer />
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