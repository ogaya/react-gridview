import React from "react";


import "./index.css";


const SimpleButton = React.createClass({
  displayName: "SimpleButton",
  propTypes: {
    className: React.PropTypes.string,
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
    return (
      <div className={className} onClick={this.props.onClick}>
        <img className="sample-button-img" src={this.props.icon} />

      </div>
    );
  }
});

module.exports = SimpleButton;
