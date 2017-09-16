import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import Header from '../components/header';
export default class AboutView extends Component {
  render() {
    return (
      <div>
        <Header />
        <Link to="/signin">Sign In</Link>
      </div>
    )
  }
}
