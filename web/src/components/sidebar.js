import React, { Component } from "react";
import { connect } from "react-redux";
import CategoryList from "./categoryList";
import FeedList from "./feedList";
import * as actions from "../actions/feeds";
import OptionsMenu from "./options";

// class Sidebar extends Component {
export default function Sidebar(props) {
  // render() {
  return (
    <div>
      <OptionsMenu {...props} />
      <FeedList {...props} />
    </div>
  );
  // }
}

function mapStateToProps(state) {
  return {};
}

// export default connect(mapStateToProps, actions)(Sidebar);
