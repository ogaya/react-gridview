import React from "react";

import Top        from "./top";
import NotFound   from "./not-found";

import "./index.css";

const Container = React.createClass({
  propTypes: {
    hash: React.PropTypes.string
  },
  _createNode(){
    const hashList = this.props.hash.split("/");
    if (hashList.length < 2){
      return <Top hash={this.props.hash} />;
    }

    switch (hashList[1]) {
      case "":
        return <Top hash={this.props.hash} />;
      default:
        return <NotFound hash={this.props.hash} />;
    }
  },
  render: function() {
    const node = this._createNode();
    return (
      <div className="container">
        {node}
      </div>
    );
  }
});

export{
  Container as default
};
