import React from 'react';
import _ from 'lodash';

const categoryList = ( {categories} ) => {
  const renderCategories = (categories) => {
    return _.map(categories, category => {
      return (
        <li key={category.id}>
          {category.label}
        </li>
      )
    })
  }

  return (
    <div>
      <h3>Categories</h3>
      <ul>
        { renderCategories(categories) }
      </ul>
    </div>
  )
}
export default categoryList;