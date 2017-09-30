import React from "react";
import FeedList from "./feedList";
import OptionsMenu from "./options";

// class Sidebar extends Component {
export default function OldSidebar(props) {
  // render() {
  return (
    <div>
      <OptionsMenu {...props} />
      <FeedList {...props} />
    </div>
  );
  // }
}
