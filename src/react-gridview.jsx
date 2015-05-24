import React from "react";

import Cells from "./containers/cells";

import "./react-gridview.styl";

import GridViewModel from "./model";

const GridView = React.createClass({
  displayName: "gridview",
  propTypes: {
    id: React.PropTypes.string,
    model: React.PropTypes.instanceOf(GridViewModel)
  },
  getDefaultProps() {
    return {
      id: "gridview-canvas01",
      model: new GridViewModel()
    };
  },
  render: function () {

    return (
      <div className="gridview-container">
        <Cells id={this.props.id} model={this.props.model} />
      </div>
    );
  }
});

module.exports = GridView;
