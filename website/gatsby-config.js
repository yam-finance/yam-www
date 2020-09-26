/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const path = require('path')

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        assets: path.join(__dirname, 'src/assets'),
        components: path.join(__dirname, 'src/components'),
        hooks: path.join(__dirname, 'src/hooks'),
        src: path.join(__dirname, 'src'),
        views: path.join(__dirname, 'src/views')
      }
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        jsx: true
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options:{
        fonts: [
          'Nunito\:400,700'
        ],
        display: 'swap'
      }
    }
  ]
}
