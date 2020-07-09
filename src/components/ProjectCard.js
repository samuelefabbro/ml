import React from "react"
import { Link } from 'gatsby'
import styled from "styled-components"
import PropTypes from 'prop-types'
import { Parser } from 'html-to-react'

const htmlToReactParser = new Parser()


const Card = styled.div`
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Image = styled.div`
    max-width: 100%;
    width: 100%;
`;

const Content = styled.div`
    text-align: center;
    padding: 10px 0 25px 0;
`;

const Year = styled.div`
    font-size: 12px;
    font-family: "Work Sans";
    font-weight: 600;
`;

const Title = styled.div`
    font-size: 30px;
    line-height: 1.2em;
    font-family: "Work Sans";
    font-weight: 600;
    margin: 0;
`;

const Location = styled.div`
    font-size: 12px;
    font-family: "Work Sans";
    font-weight: 400;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #262626;
`;


const ProjectCard = ({ data }) => {
    let title = data.project_title.text
    let year = data.project_year.text
    let image = data.project_image.url
    let alt = data.project_image.alt
    let location = data.project_location.text

    let link = data.project.uid

    return (

        <StyledLink
            to={`/projects/${link}`}
            className="Project"
        >

            <Card>
                <Image>
                    <img src={image} alt={alt}/>
                </Image>
                <Content>
                    <Year>
                        {htmlToReactParser.parse(year)}
                    </Year>
                    <Title>
                        {htmlToReactParser.parse(title)}
                    </Title>
                    <Location>
                        {htmlToReactParser.parse(location)}
                    </Location>
                </Content>
            </Card>

        </StyledLink>
    )
}

export default ProjectCard

ProjectCard.propTypes = {
    data: PropTypes.object,
    link: PropTypes.string,
};