import {Range} from "immutable";

import {BORDER_POSITION, CellPoint} from "../../../dist/react-gridview.js";

function setTopBorder(view, rangeItem, border){

  const left = Math.min(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
  const right = Math.max(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
  const top = Math.min(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);
  Range(left, right + 1).forEach((columnNo)=>{
    view = view.setBorder(new CellPoint(columnNo, top), BORDER_POSITION.TOP, border);
  });
  return view;
}


function setBottomBorder(view, rangeItem, border){

  const left = Math.min(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
  const right = Math.max(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
  const bottom = Math.max(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);
  Range(left, right + 1).forEach((columnNo)=>{
    view = view.setBorder(new CellPoint(columnNo, bottom), BORDER_POSITION.BOTTOM, border);
  });
  return view;
}

function setLeftBorder(view, rangeItem, border){

  const left = Math.min(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
  const top = Math.min(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);
  const bottom = Math.max(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);
  Range(top, bottom + 1).forEach((rowNo)=>{
    view = view.setBorder(new CellPoint(left, rowNo), BORDER_POSITION.LEFT, border);
  });
  return view;
}

function setRightBorder(view, rangeItem, border){

  const right = Math.max(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
  const top = Math.min(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);
  const bottom = Math.max(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);
  Range(top, bottom + 1).forEach((rowNo)=>{
    view = view.setBorder(new CellPoint(right, rowNo), BORDER_POSITION.RIGHT, border);
  });
  return view;
}

function setCrossBorder(view, rangeItem, border){

  const left = Math.min(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
  const top = Math.min(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);

  view.getCells(rangeItem).forEach((cell) =>{

    if (cell.cellPoint().columnNo !== left){
      view = view.setBorder(cell.cellPoint(), BORDER_POSITION.LEFT, border);
    }

    if (cell.cellPoint().rowNo !== top){
      view = view.setBorder(cell.cellPoint(), BORDER_POSITION.TOP, border);
    }
  });
  return view;
}

function setCenterBorder(view, rangeItem, border){
  const left = Math.min(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
  view.getCells(rangeItem).forEach((cell) =>{

    if (cell.cellPoint().columnNo !== left){
      view = view.setBorder(cell.cellPoint(), BORDER_POSITION.LEFT, border);
    }
  });
  return view;
}


function setMiddleBorder(view, rangeItem, border){
  const top = Math.min(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);

  view.getCells(rangeItem).forEach((cell) =>{
    if (cell.cellPoint().rowNo !== top){
      view = view.setBorder(cell.cellPoint(), BORDER_POSITION.TOP, border);
    }
  });
  return view;
}


function setFullBorder(view, rangeItem, border){

  const right = Math.max(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
  const bottom = Math.max(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);

  view.getCells(rangeItem).forEach((cell) =>{
    view = view
      .setBorder(cell.cellPoint(), BORDER_POSITION.TOP, border)
      .setBorder(cell.cellPoint(), BORDER_POSITION.LEFT, border);

    if (cell.cellPoint().columnNo === right){
      view = view.setBorder(cell.cellPoint(), BORDER_POSITION.RIGHT, border);
    }

    if (cell.cellPoint().rowNo === bottom){
      view = view.setBorder(cell.cellPoint(), BORDER_POSITION.BOTTOM, border);
    }
  });
  return view;
}

function setGridBorder(view, rangeItem, border){

  view = setTopBorder(view, rangeItem, border);
  view = setRightBorder(view, rangeItem, border);
  view = setBottomBorder(view, rangeItem, border);
  view = setLeftBorder(view, rangeItem, border);

  return view;
}


export{
  setTopBorder,
  setBottomBorder,
  setLeftBorder,
  setRightBorder,
  setCrossBorder,
  setCenterBorder,
  setMiddleBorder,
  setGridBorder,
  setFullBorder
};
