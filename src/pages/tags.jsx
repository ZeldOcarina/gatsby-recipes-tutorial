import React from "react"
import slugify from "slugify"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

import { graphql, Link } from "gatsby"
import setupTags from "../utils/setupTags"

const Tags = ({ data }) => {
  const newTags = setupTags(data.allContentfulRecipe.nodes)
  return (
    <Layout>
      <SEO title="Tags" />
      <main className="page">
        <section className="tags-page">
          {newTags.map(([text, value], i) => {
            const slug = slugify(text, { lower: true })
            return (
              <Link to={`/tags/${slug}`} key={i} className="tag">
                <h5>{text}</h5>
                <p>{value} recipe</p>
              </Link>
            )
          })}
        </section>
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulRecipe {
      nodes {
        content {
          tags
        }
      }
    }
  }
`

export default Tags
