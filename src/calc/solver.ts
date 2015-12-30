import {Record, Set} from "immutable";

export default class SolverModel extends Record({
    text: null,
    value: 0,
    pointer: 0,
    sheet: null,
    refIds: Set(),
    isError: false
}) {
    text: string;
    value: number;
    pointer: number;
    refIds: Set<any>;
    isError: boolean;
    
    static createEmpty() {
        return new SolverModel();
    }
    setText(text): any {
        return this.set("text", text);
    }

    setValue(value): any {
        return this.set("value", value);
    }

    setPointer(pointer): SolverModel {
        return <SolverModel>this.set("pointer", pointer);
    }

    addPointer(pointer): SolverModel {
        pointer = pointer || 1;
        return <SolverModel>this.set("pointer", this.pointer + pointer);
    }

    addRefId(id): SolverModel {
        if (this.refIds.has(id)) {
            return this.setIsError(true);
        }
        return <SolverModel>this.set("refIds", this.refIds.add(id));
    }

    setRefIds(ids): SolverModel {
        return <SolverModel>this.set("refIds", ids);
    }

    setView(sheet): SolverModel {
        return <SolverModel>this.set("sheet", sheet);
    }

    setIsError(isError): SolverModel {
        return <SolverModel>this.set("isError", isError);
    }

    // 解析処理していない残り文字数
    get leftLenght() {
        if (!this.text) {
            return 0;
        }
        return this.text.length - this.pointer;
    }

    pointSubstr(length) {
        // テキストなし
        if (!this.text) {
            return "";
        }

        // 範囲外
        if (this.text.length <= this.pointer) {
            return "";
        }
        length = length || (this.text.length - this.pointer);

        return this.text.substr(this.pointer, length);
    }

}
