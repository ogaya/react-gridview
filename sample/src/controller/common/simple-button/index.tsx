import * as React from "react";


import "./index.css";


export interface Props {
    className?: string;
    style?: any;
    key?: any;
    type?: string;
    icon?: string;
    onClick?: () => void;
    onChange?: (e) => void;
    onMouseDown?: ()=>void;
    pressed?: boolean;
}

export default class SimpleButton extends React.Component<Props, {}> {

    public static displayName = "SimpleButton";
    public static defaultProps = {
        onClick: () => { },
        onChange: (e) => {},
        pressed: false
    };
    
    private _createNormalButton(){
        let className = "sample-button";
        if (this.props.pressed) {
            className = className + " pressed";
        }
        if (this.props.className) {
            className = className + " " + this.props.className;
        }
        let style = {};
        if (this.props.style) {
            style = this.props.style;
        }
        return (
            <div unselectable={true} className={className} style={style}
                onMouseDown={this.props.onMouseDown} onClick={this.props.onClick}>
                <img  unselectable={true} className="sample-button-img" src={this.props.icon} />
            </div>
        );
        
    }
    
    private _createFileOpenButton(){
        let className = "sample-button file-reader";
        if (this.props.pressed) {
            className = className + " pressed";
        }
        if (this.props.className) {
            className = className + " " + this.props.className;
        }
        let style = {};
        if (this.props.style) {
            style = this.props.style;
        }
        return (
            <div unselectable={true} className={className} style={style}
                onMouseDown={this.props.onMouseDown} onClick={this.props.onClick}>
                <img  unselectable={true} className="sample-button-img" src={this.props.icon} />
                <input type="file" onChange={this.props.onChange}/>
            </div>
        );
        
    }

    render() {
        if (this.props.type === "file"){
            return this._createFileOpenButton();
        }
        return this._createNormalButton();
    }
}
