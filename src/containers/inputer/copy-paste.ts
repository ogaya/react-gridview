
import {CellPoint} from "../../model/common";
import {InputerProps} from "./index.tsx";

function createText(props: InputerProps) {

    const sheet = props.sheet;
    const rangeItem = props.opeModel.rangeItem;

    let text = "";
    for (let rowNo = rangeItem.minRowNo; rowNo <= rangeItem.maxRowNo; rowNo++) {
        for (let columnNo = rangeItem.minColumnNo; columnNo <= rangeItem.maxColumnNo; columnNo++) {
            var cell = sheet.getCell(new CellPoint(columnNo, rowNo));
            text = text + cell.value;

            if (columnNo !== rangeItem.maxColumnNo) {
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
export function copy(e, props: InputerProps) {

    let opeModel = props.opeModel;
    
    // 入力中の場合は標準処理に任せる
    if (opeModel.input.isInputing) {
        return;
    }

    // 選択ターゲットを取得
    opeModel = opeModel.setCopyingRange(opeModel.rangeItem);

    const sheet = props.sheet;

    const text = createText(props);

    props.onStateChange(sheet, opeModel);

    e.clipboardData.setData('text/plain', text);
    //e.clipboardData.setData('application/jrgv', JSON.stringify(sheet.toMinJS()));

    //window.clipboardData.setData('text', "this.value");

}

/**
 * テキストの貼り付け処理
 * @param  {[type]} e     [description]
 * @param  {[type]} props [description]
 * @return {bool}       true:貼り付けた
 */
function pasteText(e, props: InputerProps) {


    // 入力中の場合は標準処理に任せる
    if (props.opeModel.input.isInputing) {
        return;
    }

    const text = e.clipboardData.getData('text');
    const rangeItem = props.opeModel.rangeItem;


    if (!text) {
        return false;
    }

    let sheet = props.sheet;


    const rows = text.split('\n');

    for (let rowNo in rows) {
        const cells = rows[rowNo].split('\t');

        for (let columnNo in cells) {
            const cellValue = cells[columnNo];
            const target = new CellPoint(
                Number(columnNo) + rangeItem.minColumnNo,
                Number(rowNo) + rangeItem.minRowNo
            );
            sheet = sheet.setValue(target, cellValue);
        }
    }
    const opeModel = props.opeModel.setCopyingRange(null);
    props.onStateChange(sheet, opeModel);
    return true;
}

export function paste(e, props) {
    //console.log(e.clipboardData);

    //var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    // console.log(JSON.stringify(items)); // will give you the mime types
    //
    // console.log(e.clipboardData.getData('text'));
    // console.log(e.clipboardData.getData('text/plain'));
    // console.log(e.clipboardData.getData('application/jrgv'));

    if (pasteText(e, props)) {
        return;
    }
}
