import React, { Component } from 'react'

export default class PostPage extends Component {
  render() {
    const { data } = this.props
    if (!data) return null
    return (
      <div>
        <span>{data.contentfulBlogPost.date}</span>
        <h1>{data.contentfulBlogPost.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: data.contentfulBlogPost.body.childMarkdownRemark.html,
          }}
        />
      </div>
    )
  }
}

// The "slug" is coming in from the "context" created in gatsby-node.js.
// With a $ in front of slug we're defining a variable. We are requiring it to be a string type.
// If the slug is equal to ("eq:") /posts/post.md for example, then get the excerpt.
export const query = graphql`
  query BlogPostQuery($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      body {
        childMarkdownRemark {
          html
        }
      }
      slug
      id
    }
  }
`
