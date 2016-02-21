import * as React from "react";
import * as ReactDOM from "react-dom";

import {Border, LINE_STYLE} from "react-gridview";
import SimpleButton from "../common/simple-button/index.tsx";


const FullIcon = require("./full.png");
const CrossIcon = require("./cross.png");
const MiddleIcon = require("./middle.png");
const CenterIcon = require("./center.png");
const GridIcon = require("./grid.png");
const TopIcon = require("./top.png");
const LeftIcon = require("./left.png");
const RightIcon = require("./right.png");
const BottomIcon = require("./bottom.png");
const NoneIcon = require("./none.png");

import "./line-panel.css";

export const LINE_TYPE = {
    FULL: "FULL",
    CROSS: "CROSS",
    MIDDLE: "MIDDLE",
    CENTER: "CENTER",
    GRID: "GRID",
    TOP: "TOP",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    BOTTOM: "BOTTOM",
    NONE: "NONE"
};

const lines = [
    [
        { icon: FullIcon, lineType: LINE_TYPE.FULL },
        { icon: CrossIcon, lineType: LINE_TYPE.CROSS },
        { icon: MiddleIcon, lineType: LINE_TYPE.MIDDLE },
        { icon: CenterIcon, lineType: LINE_TYPE.CENTER },
        { icon: GridIcon, lineType: LINE_TYPE.GRID }
    ],
    [
        { icon: TopIcon, lineType: LINE_TYPE.TOP },
        { icon: LeftIcon, lineType: LINE_TYPE.LEFT },
        { icon: RightIcon, lineType: LINE_TYPE.RIGHT },
        { icon: BottomIcon, lineType: LINE_TYPE.BOTTOM },
        { icon: NoneIcon, lineType: LINE_TYPE.NONE }
    ]
];


export interface Props {
    className?: string
    onSelectBorder: (border: Border, lineStyle: LINE_STYLE) => void;
    showSubWindow: (window) => void;
}

export class LinePanel extends React.Component<Props, {}> {
    //const LinePanel = React.createClass({
    public static displayName = "LinePanel";
    componentDidMount() {
        const node: any = ReactDOM.findDOMNode(this.refs["me"])
        node.focus();
    }
    _onblur() {
        this.props.showSubWindow(null);
    }
    _onClickLine(lineType) {
        let border = Border.create()
            .setColors(["#000"])
            .setWeight(2);
        this.props.onSelectBorder(border, lineType);
        this.props.showSubWindow(null);
    }
    _createLineNodes() {
        let nodes = [];

        for (let lineNo in lines) {
            for (let itemNo in lines[lineNo]) {
                const line = lines[lineNo][itemNo];
                const style = {
                    top: (lineNo * 25 + 15) + "px",
                    left: (itemNo * 25 + 5) + "px"
                };
                nodes.push(<SimpleButton key={line.lineType} className="line-node" style={style}
                    icon={line.icon} onMouseDown={this._onClickLine.bind(this, line.lineType) }/>);
            }
        }

        return nodes;
    }

    render() {
        let className = "line-panel";
        if (this.props.className) {
            className = className + " " + this.props.className;
        }

        const lineNodes = this._createLineNodes();

        return (
            <div className={className} tabIndex={0} ref="me"
                onBlur={this._onblur.bind(this) }>
                {lineNodes}
            </div>
        );
    }
}
