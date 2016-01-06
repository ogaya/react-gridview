import {Record}from "immutable";


export class InputModel extends Record({
    isInputing: false,
    text: ""
}) {
    isInputing: boolean;
    text: string;

    setIsInputing(isInputing: boolean) {

        if (isInputing) {
            return <InputModel>this.set("isInputing", isInputing);
        }

        return (<InputModel>this.set("isInputing", isInputing)).setText("");
    }

    // setRect(rect) {
    //     return this.set("rect", rect);
    // }

    // setTarget(target) {
    //     return this.set("target", target);
    // }

    setText(text: string) {
        return <InputModel>this.set("text", text);
    }
}

export {
InputModel as default
}