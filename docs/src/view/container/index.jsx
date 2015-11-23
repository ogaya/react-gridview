import React from "react";

import Top            from "./top";
import GridViewPage   from "./gridview";
import SheetPage      from "./sheet";
import OperationPage  from "./operation";
import NotFound       from "./not-found";

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
      case "gridview":
        return <GridViewPage hash={this.props.hash} />;
      case "sheet":
        return <SheetPage hash={this.props.hash} />;
      case "operation":
        return <OperationPage hash={this.props.hash} />;
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
