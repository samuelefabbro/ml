import React from "react"
import Layout from "../components/Layout"
import { Link, graphql } from 'gatsby'
import styled from "styled-components"
import logo from "../images/logo-black.svg"
import next from "../images/arrow-next.svg"
import prev from "../images/arrow-prev.svg"
import Footer from "../components/Footer"
import Carousel from "../components/Carousel"
import { Parser } from 'html-to-react'

const htmlToReactParser = new Parser()



const Header = styled.section`
    padding-top: 50px;
`;

const Wrapper = styled.div`
    padding-top: 28px;
    padding-bottom: 40px;
    @media(max-width: 500px) {
      padding-top: 16px;
      padding-bottom: 30px;
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
      margin: 0 auto;
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
    @media(max-width: 500px) {
      font-size: 10px;
  }
`;

const Title = styled.div`
    font-size: 26px;
    font-family: "Work Sans";
    font-weight: 600;
    text-align: center;
    line-height: 1.4em;
    @media(max-width: 500px) {
      font-size: 20px;
      line-height: 1.2em;
  }
`;

const Location = styled.div`
    font-size: 12px;
    font-family: "Work Sans";
    font-weight: 400;
    text-align: center;
    @media(max-width: 500px) {
      font-size: 10px;
  }
`;


const PostContent = styled.div`

    font-size: 16px;
    max-width: 980px;
    line-height: 22px;
    text-align: center;
    margin: 0 auto;
    padding-left: 40px;
    padding-right: 40px;
    margin-bottom: 100px;
    margin-top: 100px;
    a {
      color: #262626;
    }
    @media(max-width: 768px) {
      font-size: 16px;
      line-height: 22px;
      margin-top: 60px;
      margin-bottom: 60px;
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
    margin-top: 6px;
    margin-bottom: -1px;
    @media(max-width: 768px) {
      margin-top: 10px;
      margin-bottom: 10px;
  }
    @media(max-width: 500px) {
      margin-top: 4px;
      margin-bottom: 0px;
      padding-left: 15px;
      padding-right: 15px;
    }
`;

const XlImage = styled.div`
    width: 100%;
    margin-top: 6px;
    margin-bottom: -1px;
    padding-left: 40px;
    padding-right: 40px;
    @media(max-width: 768px) {
      margin-top: 4px;
      margin-bottom: 0px;
      padding-left: 15px;
      padding-right: 15px;
  }
    p {
      margin: 0 auto;
      max-width: 960px;
      padding-top: 0px;
      font-size: 16px;
      text-align: center;
      @media(max-width: 500px) {
        font-size: 12px;
    }
    }
`;

const TwoImages = styled.div`
    padding: 6px 40px 7px 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 13px;
    @media(max-width: 768px) {
      grid-gap: 8px;
      padding: 4px 15px;
  }
    @media(max-width: 500px) {
        grid-template-columns: 1fr;
        grid-gap: 10px;
        padding: 5px 15px;
    }

    img {
        width: 100%;
    }
`;

const Gallery = styled.div`
    width: 100%;
    margin-top: 6px;
    margin-bottom: 6px;
    padding-left: 40px;
    padding-right: 40px;
    @media(max-width: 768px) {
      margin-top: 2px;
      margin-bottom: 4px;
      padding-left: 15px;
      padding-right: 15px;
  }


`;


const PrevLink = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    float: left;
    margin-left: 40px;
    margin-top: 12px;
    img {
      width: 27px;
      margin-right: 12px;
      margin-top: 3px;
      @media(max-width: 500px) {
        width: 20px;
        margin-right: 6px;
        margin-top: 3px;
    }
  }
    a {
      text-decoration: none;
      color: #262626;
      height: 26px;
    }
    @media(max-width: 500px) {
      font-size: 16px;
  }
`;

const NextLink = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    float: right;
    margin-top: 12px;
    margin-right: 40px;
    img {
      width: 27px;
      margin-left: 12px;
      margin-top: 3px;
      @media(max-width: 500px) {
        width: 20px;
        margin-left: 6px;
        margin-top: 3px;
    }
    }
    a {
      text-decoration: none;
      color: #262626;
      height: 26px;
    }
    @media(max-width: 500px) {
      font-size: 16px;
  }
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

      if (slice_type === "PrismicProjectBodyImageWithCaption") {
        let img_src = slice.primary.image.url
        let img_alt = slice.primary.image.alt
        let caption = slice.primary.caption.text
        return (
            <XlImage key={index}>

                    <img src={img_src} alt={img_alt}/>
                    <p>{caption}</p>

            </XlImage>
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
                  {slice.items.length > 0 && (
                    <Carousel images={slice.items}/>
                  )}
                </Gallery>
          )
        }

        if (slice_type === "PrismicProjectBodyNext") {
          let nextLink = slice.primary.prev_project.uid

          return (
              <NextLink key={index}>

                <Link to={`/projects/${nextLink}`}>Next Project</Link>
                <Link to={`/projects/${nextLink}`}><img src={next} alt="prev"/></Link>

              </NextLink>
          )
      }
      if (slice_type === "PrismicProjectBodyPrevious") {
        let prevLink = slice.primary.prev_project.uid

        return (
            <PrevLink key={index}>

              <Link to={`/projects/${prevLink}`}>
              <img src={prev} alt="prev"/></Link>
              <Link to={`/projects/${prevLink}`}>
                Prev Project</Link>

            </PrevLink>
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
        ... on PrismicProjectBodyParagraph {
          id
          primary {
            paragraph {
              html
            }
          }
        }
        ... on PrismicProjectBodyFullWidthImage {
          id
          primary {
            big_image {
              alt
              url
            }
          }
        }
        ... on PrismicProjectBodyImageWithCaption {
          id
          primary {
            image {
              url
              alt
            }
            caption {
              text
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
        ... on PrismicProjectBodyImageGallery {
          id
          slice_type
          items {
            gallery_image {
              alt
              url
            }
          }
        }
        ... on PrismicProjectBodyPrevious {
          id
          slice_type
          primary {
            prev_project {
              uid
            }
          }
          slice_type
        }
        ... on PrismicProjectBodyNext {
          id
          slice_type
          primary {
            prev_project {
              uid
            }
          }
        }
      }

        }
  }
}
`