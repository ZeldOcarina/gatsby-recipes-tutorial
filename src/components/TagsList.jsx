import React from "react"
import setupTags from "../utils/setupTags"
import slugify from "slugify"

import { Link } from "gatsby"

const TagsList = ({ recipes }) => {
  const newTags = setupTags(recipes)

  console.log(newTags)

  return (
    <div className="tag-container">
      <h4>recipes</h4>
      <div className="tags-list">
        {newTags.map(([text, value], i) => {
          const slug = slugify(text, { lower: true })
          return (
            <Link to={`/tags/${slug}`} key={i}>
              {text} ({value})
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TagsList
