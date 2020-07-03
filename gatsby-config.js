module.exports = {
  siteMetadata: {
    title: `Monica Loddo Architect and Interior Designer`,
    description: `THis is Monica's Portfolio Projects`,
    author: `Samuele Fabbro`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'loddo',
        schemas: {
          homepage: require('./src/schemas/homepage.json'),
          about: require('./src/schemas/about.json'),
          contact: require('./src/schemas/contact.json'),
          projects: require('./src/schemas/projects.json'),
          project: require('./src/schemas/project.json'),
        }
      }

    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#262626`,
        theme_color: `#262626`,
        display: `minimal-ui`,
 // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Work Sans\:400, 700, 600i, 600`,
        ],
        display: 'swap'
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
