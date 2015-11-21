import React from "react";

import createTopItems       from "./items/top";
import createGridViewItems  from "./items/gridview";
import createSheetItems     from "./items/sheet";
import createOperationItems from "./items/operation";

import "./index.css";

const SideMenu = React.createClass({
  propTypes: {
    hash: React.PropTypes.string
  },
  render: function() {
    return (
      <div className="side-menu">
        <ul>
          {createTopItems(this.props.hash)}
          {createGridViewItems(this.props.hash)}
          {createSheetItems(this.props.hash)}
          {createOperationItems(this.props.hash)}
        </ul>

      </div>
    );
  }
});

export{
  SideMenu as default
};
