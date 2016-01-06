import * as React from "react";

import SimpleButton from "../common/simple-button/index.tsx";

import {Sheet, Operation, TEXT_ALIGN} from "react-gridview";

import "./index.css";

const AlignLeftIcon = require("./align-left.png");
const AlignCenterIcon = require("./align-center.png");
const AlignRightIcon = require("./align-right.png");


export interface Props {
    sheet: Sheet;
    operation: Operation;
    onControlView: (sheet:Sheet)=>void;
}


export default class AlignArea extends React.Component<Props, {}> {
    
//const AlignArea = React.createClass({
  public static displayName = "AlignArea";
  
  _onChangeTextAlign = (textAlign) =>{
    const rangeItem = this.props.operation.rangeItem;

    const view = this.props.sheet.editCells(
      rangeItem, (cell)=>{
        return cell.setTextAlign(textAlign);
      });

    this.props.onControlView(view);

  }
  
  _onClickLeft = () =>{
    this._onChangeTextAlign(TEXT_ALIGN.LEFT);
  }
  
  _onClickCenter = () =>{
    this._onChangeTextAlign(TEXT_ALIGN.CENTER);
  }
  
  _onClickRight = () =>{
    this._onChangeTextAlign(TEXT_ALIGN.RIGHT);
  }
  render() {
    return (
      <div className="align-area">
        <div>
          <SimpleButton icon={AlignLeftIcon} onClick={this._onClickLeft}/>
        </div>
        <div>
          <SimpleButton icon={AlignCenterIcon} onClick={this._onClickCenter}/>
        </div>
        <div>
          <SimpleButton icon={AlignRightIcon} onClick={this._onClickRight}/>
        </div>
      </div>
    );
  }
}

//module.exports = AlignArea;
