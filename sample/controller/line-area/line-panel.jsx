import React from "react";
import ReactDOM from "react-dom";

import {Border} from "../../../dist/react-gridview.js";
import SimpleButton from "../common/simple-button";


import FullIcon from "./full.png";
import CrossIcon from "./cross.png";
import MiddleIcon from "./middle.png";
import CenterIcon from "./center.png";
import GridIcon from "./grid.png";
import TopIcon from "./top.png";
import LeftIcon from "./left.png";
import RightIcon from "./right.png";
import BottomIcon from "./bottom.png";
import NoneIcon from "./none.png";

import "./line-panel.css";
const LINE_TYPE = {
  FULL: "full"
};

const LinePanel = React.createClass({
  displayName: "LinePanel",
  propTypes: {
    className: React.PropTypes.string,
    onSelectBorder: React.PropTypes.func,
    showSubWindow: React.PropTypes.func
  },
  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.me).focus();
  },
  _onblur(){
    this.props.showSubWindow(null);
  },
  _onClickFull(){
    const boder = Border.createClass().setColors(["#F00"]);
    this.props.onSelectBorder(boder, LINE_TYPE.FULL);
  },
  _createLineNodes(){
    let nodes = [];
    nodes.push(<SimpleButton className="line-node" icon={FullIcon} onClick={this._onClickFull}/>);
    nodes.push(<SimpleButton className="line-node" icon={CrossIcon}/>);
    nodes.push(<SimpleButton className="line-node" icon={MiddleIcon}/>);
    nodes.push(<SimpleButton className="line-node" icon={CenterIcon}/>);
    nodes.push(<SimpleButton className="line-node" icon={GridIcon}/>);
    nodes.push(<SimpleButton className="line-node" icon={TopIcon}/>);
    nodes.push(<SimpleButton className="line-node" icon={LeftIcon}/>);
    nodes.push(<SimpleButton className="line-node" icon={RightIcon}/>);
    nodes.push(<SimpleButton className="line-node" icon={BottomIcon}/>);
    nodes.push(<SimpleButton className="line-node" icon={NoneIcon}/>);

    return nodes;
  },
  render: function() {
    let className = "line-panel";
    if (this.props.className){
      className = className + " " + this.props.className;
    }

    const lineNodes = this._createLineNodes();

    return (
      <div className={className} tabIndex="0" ref="me" onBlur={this._onblur}>
        {lineNodes}
      </div>
    );
  }
});

//<div className="line-panel-child" unselectable="on"></div>

//module.exports = ColorPanel;

export{
  LinePanel,
  LINE_TYPE
};
