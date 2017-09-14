import React from 'react';
import _ from 'lodash';
import { ListGroup, ListGroupItem } from 'reactstrap';

const categoryList = ( {categories} ) => {
  const renderCategories = (categories) => {
    return _.map(categories, category => {
      return (
        <ListGroupItem key={category.id}>
          {category.label}
        </ListGroupItem>
      )
    })
  }

  return (
    <div>
      <h3>Categories</h3>
      <ListGroup>
        { renderCategories(categories) }
      </ListGroup>
    </div>
  )
}
export default categoryList;