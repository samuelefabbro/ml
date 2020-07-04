import React from "react"
import "normalize.css"
import { Link } from 'gatsby'
import styled from "styled-components"
import PropTypes from 'prop-types'
import { Parser } from 'html-to-react'

const htmlToReactParser = new Parser()

const ProjectCard = ({ data }) => {
    let title = data.project_title.html
    let year = data.project_year.html
    let image = data.project_image.url
    let alt = data.project_image.alt
    let location = data.project_location.html

    let link = data.project.uid

    console.log(alt)

    return (
        <Link
            to={`/projects/${link}`}
            className="Project"
        >
            <img src={image} alt={alt}/>
            <div className="year">
                {htmlToReactParser.parse(year)}
            </div>
            <div className="title">
                {htmlToReactParser.parse(title)}
            </div>
            <div className="location">
                {htmlToReactParser.parse(location)}
            </div>
           

        </Link>
    )
}

export default ProjectCard

ProjectCard.propTypes = {
    data: PropTypes.object,
    link: PropTypes.string,
};