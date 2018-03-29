const path = require('path')

// We can loop over all the nodes & create pages where each individual page has a path of that slug.
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  // Get data with a graphql query & use that data (array of pages) to generate the pages
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulBlogPost {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allContentfulBlogPost.edges.forEach(({ node }) => {
        createPage({
          path: node.slug,
          component: path.resolve('./src/posts/PostPage.js'),
          context: {
            slug: node.slug,
          },
        })
      })
      resolve()
    })
  })
}
