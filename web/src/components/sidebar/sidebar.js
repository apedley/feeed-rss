import React, { Component } from 'react'
import { connect } from 'react-redux'

import CategoryListContainer from './categoryListContainer'


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }
  
  render() {
    return (
      <div>
        sidebar

        <CategoryListContainer />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    subscriptions: state.subscriptions
  }
}

export default connect(mapStateToProps)(Sidebar)