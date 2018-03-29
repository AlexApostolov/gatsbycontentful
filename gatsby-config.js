module.exports = {
  siteMetadata: {
    title: 'Gatsby Pro',
    description: 'Experimenting with advanced Gatsby features',
  },
  pathPrefix: '/gatsbypro',
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: 'bugw656e8pni',
        accessToken:
          '2be6d3c353462965ae60e2d248987e371898307c10a2278156bc8f6d3a0ef0d2',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/static/assets`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-transformer-remark',
  ],
}
