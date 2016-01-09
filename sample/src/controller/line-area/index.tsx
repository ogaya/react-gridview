import * as React from "react";

import SimpleButton from "../common/simple-button/index.tsx";

import {Sheet, Operation, Border} from "react-gridview";

//import LinePanel from "./line-panel";
import {LinePanel, LINE_TYPE} from "./line-panel.tsx";

import {
  setFullBorder,
  setBottomBorder,
  setLeftBorder,
  setRightBorder,
  setCrossBorder,
  setCenterBorder,
  setMiddleBorder,
  setGridBorder,
  setTopBorder
} from "./set-border.ts";

const FullIcon = require("./full.png");

import "./index.css";



export interface Props {
    viewModel: Sheet;
    operation: Operation;
    onControlView: (sheet:Sheet)=>void;
    showSubWindow: (window)=>void;
}

export class LineArea extends React.Component<Props, {}> {
  public static displayName = "LineArea";

  _onChangeBorder(border:Border, lineType){
    const rangeItem = this.props.operation.rangeItem;
    let view = this.props.viewModel;
    switch (lineType) {
      case LINE_TYPE.FULL:
        view = setFullBorder(view, rangeItem, border);
        break;
      case LINE_TYPE.TOP:
        view = setTopBorder(view, rangeItem, border);
        break;
      case LINE_TYPE.BOTTOM:
        view = setBottomBorder(view, rangeItem, border);
        break;
      case LINE_TYPE.LEFT:
        view = setLeftBorder(view, rangeItem, border);
        break;
      case LINE_TYPE.RIGHT:
        view = setRightBorder(view, rangeItem, border);
        break;
      case LINE_TYPE.NONE:
        view = setFullBorder(view, rangeItem, null);
        break;
      case LINE_TYPE.CROSS:
        view = setCrossBorder(view, rangeItem, border);
        break;
      case LINE_TYPE.MIDDLE:
        view = setMiddleBorder(view, rangeItem, border);
        break;
      case LINE_TYPE.CENTER:
        view = setCenterBorder(view, rangeItem, border);
        break;
      case LINE_TYPE.GRID:
        view = setGridBorder(view, rangeItem, border);
        break;
      default:
        return;
    }

    this.props.onControlView(view);
  }
  
  _onClick(){
    const subWindow = <LinePanel
      showSubWindow={this.props.showSubWindow}
      onSelectBorder={this._onChangeBorder.bind(this)}/>;
    this.props.showSubWindow(subWindow);
  }
  
  render() {
    return (
      <div className="line-area">
        <div>
          <SimpleButton icon={FullIcon} onClick={this._onClick.bind(this)}/>
        </div>
      </div>
    );
  }
}

export{
    LineArea as default
}