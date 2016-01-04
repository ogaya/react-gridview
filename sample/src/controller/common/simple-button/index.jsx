import React from "react";


import "./index.css";


const SimpleButton = React.createClass({
  displayName: "SimpleButton",
  propTypes: {
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    icon: React.PropTypes.string,
    onClick: React.PropTypes.func,
    pressed: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      onClick: ()=>{},
      pressed: false
    };
  },
  render: function() {
    let className = "sample-button";
    if (this.props.pressed){
      className = className + " pressed";
    }
    if (this.props.className){
      className = className + " " + this.props.className;
    }
    let style = {};
    if (this.props.style){
      style = this.props.style;
    }
    return (
      <div unselectable="on" className={className} style={style} onClick={this.props.onClick}>
        <img  unselectable="on" className="sample-button-img" src={this.props.icon} />

      </div>
    );
  }
});

module.exports = SimpleButton;
