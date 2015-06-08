import React from "react";
import OperationModel from "../../model/operation";

const  Horizontalbar  = React.createClass({
  displayName: "Gridview-Horizontalbar",
  propTypes: {
    opeModel: React.PropTypes.instanceOf(OperationModel),
    onOperationChange: React.PropTypes.func
  },
  // スタイルの生成
  _createStyle(){
    let style = {
      position: "absolute"
    };

    style.bottom = "0px";
    style.left = "0px";
    style.width = "100%";
    //style.height = "25px";
    //style.background = "#0FF";
    style.overflowX = "scroll";
    style.overflowY = "hidden";
    return style;
  },
  _onscroll(e){
    const point = Math.floor(e.target.scrollLeft / 100);
    const opeModel = this.props.opeModel;
    const scroll = opeModel.scroll
      .setColumnNo(point + 1);
    this.props.onOperationChange(opeModel.setScroll(scroll));
  },
  render() {
    const style = this._createStyle();
    let contents = {};
    contents.width = "2000px";
    contents.height = "1px";
    //contents.background = "#F0F";

    return (
      <div style={style} onScroll={this._onscroll}>
        <div style={contents} />
      </div>
    );
  }
});

export {
  Horizontalbar
};
