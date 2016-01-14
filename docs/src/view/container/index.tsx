import * as React from "react";

import Top            from "./top/index.tsx";
import GridViewPage   from "./gridview/index.tsx";
import SheetPage      from "./sheet/index.tsx";
import OperationPage  from "./operation/index.tsx";
import NotFound       from "./not-found/index.tsx";

import "./index.css";

export interface Props{
    hash: string;
}

export default class Container extends React.Component<Props, {}>{
    
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
  }
  render() {
    const node = this._createNode();
    return (
      <div className="container">
        {node}
      </div>
    );
  }
}
