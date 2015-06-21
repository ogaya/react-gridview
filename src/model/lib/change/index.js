
import {OBJECT_TYPE} from "../../gridview/object-type";

// 列幅のリサイズ処理
function columnResize(viewModel, opeModel){
  const objectType = opeModel.opeItem && opeModel.opeItem.objectType;
    if (objectType !== OBJECT_TYPE.COLUMN_RESIZER){
      return viewModel;
    }

    const selectItem = opeModel.selectItem;
    if (!selectItem){
      return viewModel;
    }

    // 新しい幅を計算酢る
    const left = selectItem.rect.left;
    const right = opeModel.hoverItem.point.x;
    const width = (right <= left) ? 1 : right - left;

    // 列アイテムの更新
    const columnNo = selectItem.target.columnNo;
    const columnHeaderItem = viewModel.columnHeader.items.get(columnNo);
    const newItem = columnHeaderItem.setWidth(width);
    const newColumnHeader = viewModel.columnHeader.setItem(columnNo, newItem);

    return viewModel.setColumnHeader(newColumnHeader);

}

function operationResult(viewModel, opeModel){
  const cResizeModel = columnResize(viewModel, opeModel);

  if (cResizeModel !== viewModel){
    return cResizeModel;
  }

  return viewModel;
}

export{
  operationResult
};
