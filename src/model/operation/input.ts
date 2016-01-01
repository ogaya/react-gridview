import {Record}from "immutable";


export default class InputModel extends Record({
    isInputing: false,
    text: ""
}) {
    isInputing: boolean;
    text: string;

    setIsInputing(isInputing) {

        if (isInputing) {
            return this.set("isInputing", isInputing);
        }

        return (<InputModel>this.set("isInputing", isInputing)).setText("");
    }

    setRect(rect) {
        return this.set("rect", rect);
    }

    setTarget(target) {
        return this.set("target", target);
    }

    setText(text) {
        return this.set("text", text);
    }
}
