import {Record, List} from "immutable";
import {OBJECT_TYPE} from "../gridview/object-type";
import {CellPoint} from "./cellPoint";

// セル選択モデル
class CellRange extends Record({
  cellPoint1: null,
  cellPoint2: null
}) {

  constructor(cellPoint1, cellPoint2) {
    super({
      cellPoint1: cellPoint1,
      cellPoint2: cellPoint2
    });
  }

  get minColumnNo(){
    return Math.min(this.cellPoint1.columnNo, this.cellPoint2.columnNo);
  }

  get minRowNo(){
    return Math.min(this.cellPoint1.rowNo, this.cellPoint2.rowNo);
  }

  get maxColumnNo(){
    return Math.max(this.cellPoint1.columnNo, this.cellPoint2.columnNo);
  }

  get maxRowNo(){
    return Math.max(this.cellPoint1.rowNo, this.cellPoint2.rowNo);
  }

  get leftTopPoint(){
    return new CellPoint(this.minColumnNo, this.minRowNo);
  }

  get rightBottomPoint(){
    return new CellPoint(this.maxColumnNo, this.maxRowNo);
  }

  merge(rangeItem){
    const left = Math.min(this.minColumnNo, rangeItem.minColumnNo);
    const top = Math.min(this.minRowNo, rangeItem.minRowNo);
    const right = Math.max(this.maxColumnNo, rangeItem.maxColumnNo);
    const bottom = Math.max(this.maxRowNo, rangeItem.maxRowNo);

    const cellPoint1 = new CellPoint(left, top);
    const cellPoint2 = new CellPoint(right, bottom);

    return new CellRange(cellPoint1, cellPoint2);
  }

  cellPoints(){
    const left = this.minColumnNo;
    const top = this.minRowNo;
    const right = this.maxColumnNo;
    //const bottom = this.maxRowNo;

    let points = List();
    for(var column = left; column <= right; column++){
      for(var row = top; row <= top; row++){
        points = points.push(new CellPoint(column, row));
      }
    }

    return points;

  }

  equals(cellRange){
    if (!cellRange){
      return false;
    }
    if (cellRange.minColumnNo !== this.minColumnNo){
      return false;
    }

    if (cellRange.minRowNo !== this.minRowNo){
      return false;
    }

    if (cellRange.maxColumnNo !== this.maxColumnNo){
      return false;
    }

    if (cellRange.maxRowNo !== this.maxRowNo){
      return false;
    }

    return true;
  }
}

function opeModelToRangeItem(opeModel){

  const opeItem = opeModel.opeItem;
  const hoverItem = opeModel.hoverItem;

  // 操作中オブジェクトがセルで無い場合、範囲選択しない
  if ((!opeItem) || (opeItem.objectType !== OBJECT_TYPE.CELL)){
    return opeModel.rangeItem;
  }

  // ホバーアイテムがセルで無い場合、前回の範囲選択情報のままとする。
  if ((!hoverItem) || (hoverItem.objectType !== OBJECT_TYPE.CELL)){
    return new CellRange(opeItem.cellPoint, opeItem.cellPoint);
  }

  return new CellRange(opeItem.cellPoint, hoverItem.cellPoint);
}

// 範囲内に結合セルがある場合、選択範囲を広げる
function fitRange(viewModel, rangeItem){
  const left = rangeItem.minColumnNo;
  const top = rangeItem.minRowNo;
  const right = rangeItem.maxColumnNo;
  const bottom = rangeItem.maxRowNo;

  // 上下の結合を確認
  for(let columnNo = left; columnNo <= right; columnNo++){
    const cellPoint = new CellPoint(columnNo, top);
    const cell = viewModel.getCell(cellPoint);

    if (!cell.mergeRange){
      continue;
    }

    const needExpansion = (cell.mergeRange.minRowNo !== top);

    if(needExpansion){
      const expansionRange = rangeItem.merge(cell.mergeRange);
      return fitRange(viewModel, expansionRange);
    }
  }

  for(let columnNo = left; columnNo <= right; columnNo++){
    const cellPoint = new CellPoint(columnNo, bottom);
    const cell = viewModel.getCell(cellPoint);

    if (!cell.mergeRange){
      continue;
    }

    const needExpansion = (cell.mergeRange.maxRowNo !== bottom);

    if(needExpansion){
      const expansionRange = rangeItem.merge(cell.mergeRange);
      return fitRange(viewModel, expansionRange);
    }
  }

  for(let rowNo = top; rowNo <= bottom; rowNo++){
    const cellPoint = new CellPoint(left, rowNo);
    const cell = viewModel.getCell(cellPoint);

    if (!cell.mergeRange){
      continue;
    }

    const needExpansion = (cell.mergeRange.minColumnNo !== left);

    if(needExpansion){
      const expansionRange = rangeItem.merge(cell.mergeRange);
      return fitRange(viewModel, expansionRange);
    }
  }


  for(let rowNo = top; rowNo <= bottom; rowNo++){
    const cellPoint = new CellPoint(right, rowNo);
    const cell = viewModel.getCell(cellPoint);

    if (!cell.mergeRange){
      continue;
    }

    const needExpansion = (cell.mergeRange.maxColumnNo !== right);

    if(needExpansion){
      const expansionRange = rangeItem.merge(cell.mergeRange);
      return fitRange(viewModel, expansionRange);
    }
  }


  return rangeItem;
}

function modelToRangeItem(viewModel, opeModel){
  // マウスドラッグ操作した範囲を求める
  const opeRange = opeModelToRangeItem(opeModel);

  if(!opeRange){
    return opeRange;
  }

  return fitRange(viewModel, opeRange);


}

export default {
  CellRange,
  modelToRangeItem,
  opeModelToRangeItem
};
