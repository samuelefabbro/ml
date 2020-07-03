import React from "react"
import "normalize.css"
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { Parser } from 'html-to-react'

const htmlToReactParser = new Parser()

const ProjectCard = ({ data }) => {
  let title = data.project_title.html
  let description = "banananas"
  let link = data.project.uid

  return (
      <Link
        to={`/projects/${link}`}
        className="Project"
       >
        <img/>
        <div className="title">
            {htmlToReactParser.parse(title)}
        </div>
      </Link>
  )
}

export default ProjectCard

ProjectCard.propTypes = {
    data: PropTypes.object,
    link: PropTypes.string,
};