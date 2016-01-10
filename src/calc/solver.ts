import {Record, Set} from "immutable";
import {Sheet} from "../model/sheet";

export class Solver extends Record({
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
    refIds: Set<string>;
    sheet: Sheet;
    isError: boolean;

    static createEmpty() {
        return new Solver();
    }
    setText(text: string) {
        return <Solver>this.set("text", text);
    }

    setValue(value: number) {
        return <Solver>this.set("value", value);
    }

    setPointer(pointer: number): Solver {
        return <Solver>this.set("pointer", pointer);
    }

    addPointer(pointer?: number): Solver {
        pointer = pointer || 1;
        return <Solver>this.set("pointer", this.pointer + pointer);
    }

    addRefId(id: string): Solver {
        if (this.refIds.has(id)) {
            return this.setIsError(true);
        }
        return <Solver>this.set("refIds", this.refIds.add(id));
    }

    setRefIds(ids: Set<string>): Solver {
        return <Solver>this.set("refIds", ids);
    }

    setView(sheet: Sheet): Solver {
        return <Solver>this.set("sheet", sheet);
    }

    setIsError(isError) {
        return <Solver>this.set("isError", isError);
    }

    // 解析処理していない残り文字数
    get leftLenght() {
        if (!this.text) {
            return 0;
        }
        return this.text.length - this.pointer;
    }

    pointSubstr(length?) {
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

export {
Solver as default
}