import * as React from "react";


import "./index.css";


export interface Props {
    className?: string;
    style?: any;
    key?:any;
    icon?: string;
    onClick?: () => void;
    pressed?: boolean;
}

export default class SimpleButton extends React.Component<Props, {}> {
    
//const SimpleButton = React.createClass({
  public static displayName = "SimpleButton";
//   propTypes: {
//     className: React.PropTypes.string,
//     style: React.PropTypes.object,
//     icon: React.PropTypes.string,
//     onClick: React.PropTypes.func,
//     pressed: React.PropTypes.bool
//   },
  public static defaultProps = {
    
      onClick: ()=>{},
      pressed: false
    
  };
  
  render() {
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
      <div unselectable={true} className={className} style={style} onClick={this.props.onClick}>
        <img  unselectable={true} className="sample-button-img" src={this.props.icon} />
      </div>
    );
  }
}

//module.exports = SimpleButton;
