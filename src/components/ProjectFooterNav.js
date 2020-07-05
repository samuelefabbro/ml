import React from "react"
import "normalize.css"
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import "./ProjectFooterNav.scss";



const ProjectFooterNav = ({ data }) => {
    let allProjects = data[0]

    // let prevProject = data[1]
    // @Sam, there is no prevProject in the data currently, so I'm hardcoding null for now.
    let prevProject = null

    let nextProject = data[1]

    return (
        <div className="ProjectFooterNav__container">
            <div>
                {/* <Link to="/projects">
                    All Projects
                </Link> */}

                {/* @Sam 👆👇 These do the same thing at the moment! */}

                <Link to={`/${allProjects.all_projects_prev_next.uid}`}>
                    {allProjects.text_link}
                </Link>
            </div>
            <div className="ProjectFooterNav__prevnext">

                {/* @Sam, "{prevProject && (..." says IF there is a previous project, return the Link */}
                <div className="ProjectFooterNav__prevnext__link">
                    {prevProject && (
                        <Link to={`/projects/LINK`}>
                            PREV PROJECT NAME
                        </Link>
                    )}
                </div>

                <div className="ProjectFooterNav__prevnext__link">
                    <Link to={`/projects/${nextProject.all_projects_prev_next.uid}`}>
                        {nextProject.text_link}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProjectFooterNav

ProjectFooterNav.propTypes = {
    data: PropTypes.object,
};