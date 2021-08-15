import React from "react"
import { graphql, Link } from "gatsby"
import slugify from "slugify"
import SEO from "../components/SEO"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { BsClock, BsClockHistory, BsPeople } from "react-icons/bs"

import Layout from "../components/Layout"

const RecipeTemplate = ({ data }) => {
  const {
    title,
    content,
    cookTime,
    prepTime,
    servings,
    description: { description },
    image,
  } = data.contentfulRecipe

  const pathToImage = getImage(image)
  const { tags, instructions, ingredients, tools } = content

  return (
    <Layout>
      <SEO title={title} description={content} />
      <main className="page">
        <div className="recipe-page">
          {/* hero */}
          <section className="recipe-hero">
            <GatsbyImage
              image={pathToImage}
              alt={title}
              className="about-img"
            />
            <article className="recipe-info">
              <h2>{title}</h2>
              <p>{description}</p>
              {/* icons */}
              <div className="recipe-icons">
                <article>
                  <BsClock />
                  <h5>prep time</h5>
                  <p>{prepTime} min.</p>
                </article>
                <article>
                  <BsClockHistory />
                  <h5>cook time</h5>
                  <p>{cookTime} min.</p>
                </article>
                <article>
                  <BsPeople />
                  <h5>servings</h5>
                  <p>{servings}</p>
                </article>
              </div>
              {/* tags */}
              <p className="recipe-tags">
                Tags:{" "}
                {tags.map((tag, i) => {
                  const slug = slugify(tag, { lower: true })
                  return (
                    <Link to={`/tags/${slug}`} key={i}>
                      {tag}
                    </Link>
                  )
                })}
              </p>
            </article>
          </section>
          {/* rest of the content */}
          <section className="recipe-content">
            <article>
              <h4>instructions</h4>
              {instructions.map((item, i) => {
                return (
                  <div key={i} className="single-instruction">
                    <header>
                      <p>step {i + 1}</p>
                      <div></div>
                    </header>
                    <p>{item}</p>
                  </div>
                )
              })}
            </article>
            <article className="second-column">
              <div>
                <h4>ingredients</h4>
                {ingredients.map((item, i) => {
                  return (
                    <p key={i} className="single-ingredient">
                      {item}
                    </p>
                  )
                })}
              </div>
              <div>
                <h4>tools</h4>
                {tools.map((item, i) => {
                  return (
                    <p key={i} className="single-tool">
                      {item}
                    </p>
                  )
                })}
              </div>
            </article>
          </section>
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query getSingleRecipe($id: String) {
    contentfulRecipe(id: { eq: $id }) {
      id
      title
      content {
        ingredients
        instructions
        tags
        tools
      }
      description {
        description
      }
      cookTime
      prepTime
      servings
      image {
        gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
      }
    }
  }
`

export default RecipeTemplate
