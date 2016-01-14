import * as React from "react";
import * as ReactDOM from "react-dom";

const hljs = require("highlight.js");
import "./index.css";

export interface Props {
    innerHTML?: boolean;
    className?: string;
    children?: any;
}

export default class Coder extends React.Component<Props, {}> {

    public static defaultProps = {
        innerHTML: false,
        className: null
    };

    componentDidMount() {
        this.highlightCode();
    }
    componentDidUpdate() {
        this.highlightCode();
    }

    highlightCode() {
        var domNode = ReactDOM.findDOMNode(this);
        var nodes = domNode.querySelectorAll("pre code");
        if (nodes.length > 0) {
            for (var i = 0; i < nodes.length; i = i + 1) {
                hljs.highlightBlock(nodes[i]);
            }
        }
    }
    render() {
        if (this.props.innerHTML) {
            return <div dangerouslySetInnerHTML={{ __html: this.props.children }} className={this.props.className || null}></div>;
        } else {
            return <pre className="coder"><code ref="code" className={this.props.className}>{this.props.children}</code></pre>;
        }
    }
}

//module.exports = Coder;
