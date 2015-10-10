
import {CellPoint} from "../../model/common";

function createText(props){

  const viewModel = props.viewModel;
  const rangeItem = props.opeModel.rangeItem;

  let text = "";
  for(let rowNo = rangeItem.minRowNo; rowNo <= rangeItem.maxRowNo; rowNo++){
    for(let columnNo = rangeItem.minColumnNo; columnNo <= rangeItem.maxColumnNo; columnNo++){
      var cell = viewModel.getCell(new CellPoint(columnNo, rowNo));
      text = text + cell.value;

      if(columnNo !== rangeItem.maxColumnNo){
        text = text + "\t";
      }
    }

    text = text + "\n";
  }
  return text;
}

/**
 * コピー処理
 * @param  {Object} e     MouseDownイベント引数
 * @param  {Object} props Inputコンポーネントのprops
 * @return {bool}       false:入力キャンセル
 */
function copy(e, props){

  let opeModel = props.opeModel;

  // 選択ターゲットを取得
  opeModel = opeModel.setCopyingRange(opeModel.rangeItem);

  const viewModel = props.viewModel;

  const text = createText(props);

  props.onStateChange(viewModel, opeModel);

  e.clipboardData.setData('text/plain', text);
  e.clipboardData.setData('application/jrgv', JSON.stringify(viewModel.toJson()));

  //window.clipboardData.setData('text', "this.value");

}

/**
 * テキストの貼り付け処理
 * @param  {[type]} e     [description]
 * @param  {[type]} props [description]
 * @return {bool}       true:貼り付けた
 */
function pasteText(e, props){

  const text = e.clipboardData.getData('text');
  const rangeItem = props.opeModel.rangeItem;

  if(!text){
    return false;
  }

  let viewModel = props.viewModel;


  const rows = text.split('\n');

  for(let rowNo in rows){
    const cells = rows[rowNo].split('\t');

    for(let columnNo in cells){
      const cellValue = cells[columnNo];
      const target = new CellPoint(
        Number(columnNo) + rangeItem.minColumnNo,
        Number(rowNo) + rangeItem.minRowNo
      );
      viewModel = viewModel.setValue(target, cellValue);
    }
  }
  const opeModel = props.opeModel.setCopyingRange(null);
  props.onStateChange(viewModel, opeModel);
  return true;
}

function paste(e, props){
  //console.log(e.clipboardData);

  //var items = (event.clipboardData || event.originalEvent.clipboardData).items;
  // console.log(JSON.stringify(items)); // will give you the mime types
  //
  // console.log(e.clipboardData.getData('text'));
  // console.log(e.clipboardData.getData('text/plain'));
  // console.log(e.clipboardData.getData('application/jrgv'));


  if (pasteText(e, props)){
    return;
  }

}

export{
  copy,
  paste
};
