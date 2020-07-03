const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query all Pages with their IDs and template data.
  const pages = await graphql(`
    {
      allPrismicProject {
        nodes {
          id
          uid
        }
      }
    }
  `)

    pages.data.allPrismicProject.nodes.forEach((node) => {
        createPage({
            path: `projects/${node.uid}`,
            component: require.resolve(`./src/templates/project.js`),
            context: {
                uid: node.uid,
            },
        })
    })
  }