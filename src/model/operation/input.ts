import {Record}from "immutable";


export class InputModel extends Record({
    isInputing: false,
    text: ""
}) {
    isInputing: boolean;
    text: string;
    
    static create(){
        return new InputModel();
    }

    setIsInputing(isInputing: boolean) {

        if (isInputing) {
            return <InputModel>this.set("isInputing", isInputing);
        }

        return (<InputModel>this.set("isInputing", isInputing)).setText("");
    }

    setText(text: string) {
        return <InputModel>this.set("text", text);
    }
}

export {
InputModel as default
}