import {Record, Map, OrderedMap}from "immutable";
import RowHeaderItem from "./row-header-item";

import {HEADER_SIZE} from "../common";

const defCell = new RowHeaderItem();
const emptyCell = defCell.setBackground("#DDD");

const DEFAULT_ROW_COUNT = 1000;

// JSONからテーブル情報を生成
function JsonToCell(json) {
    let table = <Map<number, RowHeaderItem>>Map();

    if (!json) {
        return table;
    }

    for (var key in json) {
        const item = RowHeaderItem.fromJS(json[key]);
        table = table.set(Number(key), item);
    }

    return table;
}


const HEADER_WIDTH = 50;
export class RowHeader extends Record({
    _width: HEADER_WIDTH,
    rowCount: DEFAULT_ROW_COUNT,
    background: "#eaeaff",
    color: "#333",
    isVisible: true,
    editItems: Map()
}) {

    _width: number;
    rowCount: number;
    background: any;
    color: any;
    isVisible: boolean;
    editItems: Map<number, RowHeaderItem>;
    _items: OrderedMap<number, RowHeaderItem>;

    static create() {
        return new RowHeader();
    }

    // JSONから本クラスを生成
    static fromJS(json) {
        const rowHeader = RowHeader.create();
        if (!json) {
            return rowHeader;
        }
        return rowHeader
            .setRowCount(json.maxCount || rowHeader.rowCount)
            .setBackground(json.background || rowHeader.background)
            .setVisible(json.isVisible || rowHeader.isVisible)
            .setEditItems(JsonToCell(json.items) || rowHeader.editItems);
    }


    toJS() {
        return {
            width: this._width,
            rowCount: this.rowCount,
            background: this.background,
            isVisible: this.isVisible,
            items: this.items.toJS()
        };
    }

    toMinJS() {
        const empty = RowHeader.create();
        const mapJS = (items) => {
            let mapJson = {};
            items.forEach((item, key) => {
                const minJS = item.toMinJS(defCell);
                if (Object.keys(minJS).length) {
                    mapJson[key] = minJS;
                }
            });
            return mapJson;
        };

        let json: any = {};
        this.forEach((value, key) => {
            const dValue = empty.get(key);
            if ((value) && (value.toMinJS)) {
                const minJS = value.toMinJS(dValue);
                if (Object.keys(minJS).length) {
                    json[key] = minJS;
                }
                return;
            }
            if (key === "editItems") {
                const mapValue = mapJS(value);
                if (Object.keys(mapValue).length) {
                    json.items = mapValue;
                }
                return;
            }
            if (dValue !== value) {
                json[key] = value;
            }
        });
        return json;
    }

    setEditItems(editItems: Map<number, RowHeaderItem>) {
        return <RowHeader>this.set("editItems", editItems);
    }

    setBackground(background) {
        return <RowHeader>this.set("background", background);
    }

    setWidth(width: number) {
        return <RowHeader>this.set("_width", width);
    }

    get width() {
        if (!this.isVisible) {
            return 0;
        }

        return this._width;
    }

    get height() {
        let sumHeight = 0;
        this.items.map((item) => {
            sumHeight = sumHeight + item.height;
        });
        return sumHeight;
    }

    setItem(index: number, item: RowHeaderItem) {
        const editItems = this.editItems.set(index, item);
        return this.setEditItems(editItems);
    }

    setVisible(visible: boolean) {
        return <RowHeader>this.set("isVisible", visible);
    }

    setRowCount(count: number) {
        return <RowHeader>this.set("rowCount", count);
    }

    _rowNoToItem(rowNo: number) {
        if (this.editItems.has(rowNo)) {
            return this.editItems.get(rowNo).setValue(rowNo);
        }
        return emptyCell.setValue(rowNo);
    }

    get items() {
        if (this._items) {
            return this._items;
        }
        let sumHeight = HEADER_SIZE.HEIGHT;
        this._items = <OrderedMap<number, RowHeaderItem>>OrderedMap().withMutations(map => {
            for (let i = 0; i < this.rowCount; i=(i+1)|0) {
                const rowNo = (i + 1)|0;
                const item = this._rowNoToItem(rowNo);
                map.set(rowNo, item.setTop(sumHeight));
                sumHeight = sumHeight + item.height;
            }
        });
        return this._items;
    }
}

export {
HEADER_WIDTH,
DEFAULT_ROW_COUNT,
RowHeader as default
};
