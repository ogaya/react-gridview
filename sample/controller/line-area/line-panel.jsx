import React from "react";
import ReactDOM from "react-dom";

import "./line-panel.css";

const ColorPanel = React.createClass({
  displayName: "LinePanel",
  propTypes: {
    className: React.PropTypes.string,
    onSelectColor: React.PropTypes.func,
    showSubWindow: React.PropTypes.func
  },
  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.me).focus();
  },
  _onblur(){
    this.props.showSubWindow(null);
  },

  render: function() {
    let className = "line-panel";
    if (this.props.className){
      className = className + " " + this.props.className;
    }

    return (
      <div className={className} tabIndex="0" ref="me" onBlur={this._onblur}>
      </div>
    );
  }
});

module.exports = ColorPanel;
