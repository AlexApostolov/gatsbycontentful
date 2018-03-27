const path = require('path')
// To generate a slug using gatsby-source-filesystem plugin
const { createFilePath } = require('gatsby-source-filesystem')

// When a new node is created, call onCreateNode every single time the build process looks at each individual file.
exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  // To attach a field (just like "excerpt", frontmatter, html) use the action creator createNodeField.
  const { createNodeField } = boundActionCreators
  // Check if individual node is of type Markdown.
  if (node.internal.type === 'MarkdownRemark') {
    // Generate a slug
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'posts',
    })
    // Set that slug onto the actual node itself
    createNodeField({
      node,
      name: 'slug',
      value: `/posts${slug}`,
    })
  }
}

// We can loop over all the nodes & create pages where each individual page has a path of that slug.
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  // Get data with a graphql query & use that data (array of pages) to generate the pages
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/posts/PostPage.js'),
          context: {
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}
