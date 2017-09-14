import React, { Component } from 'react'

import { connect } from 'react-redux';
import * as actions from '../actions/categories';

import Header from '../components/header';
import CategoryList from '../components/categoryList';
class CategoryView extends Component {
  componentWillMount() {
    
    this.props.listCategories();
  }
  render() {
    return (
      <div>
        <Header />
        <CategoryList categories={this.props.categories} />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
    error: state.categories.error
  };
};


export default connect(mapStateToProps, actions)(CategoryView);