
export interface IKeyPress {
    ctrl: boolean;
    alt: boolean;
    shift: boolean;
    onKeyPressKeyDown: (e) => void;
    onKeyPressKeyUp: (e) => void;
    onKeyPressBlur: (e) => void;
}

export class KeyPressble {
    _keyPress: IKeyPress;

    _addKeyPressEvent() {
        this._keyPress = {
            ctrl: false,
            alt: false,
            shift: false,
            onKeyPressKeyDown: (e) => {
                if (e.keyCode === 16) {
                    this._keyPress.shift = true;
                }
                if (e.keyCode === 17) {
                    this._keyPress.ctrl = true;
                }
                if (e.keyCode === 18) {
                    this._keyPress.alt = true;
                }
            },
            onKeyPressKeyUp: (e) => {
                if (e.keyCode === 16) {
                    this._keyPress.shift = false;
                }
                if (e.keyCode === 17) {
                    this._keyPress.ctrl = false;
                }
                if (e.keyCode === 18) {
                    this._keyPress.alt = false;
                }
            },
            onKeyPressBlur: () => {
                this._keyPress.ctrl = false;
                this._keyPress.alt = false;
                this._keyPress.shift = false;
            }
        }
        if (document.addEventListener) { // DOMレベル2イベントモデル
            //キャプチャリングイベントハンドラを登録する
            document.addEventListener("keydown", this._keyPress.onKeyPressKeyDown, true);
            document.addEventListener("keyup", this._keyPress.onKeyPressKeyUp, true);
            document.addEventListener("blur", this._keyPress.onKeyPressBlur, true);
        }
    }

    _removeKeyPressEvent() {
        if (document.removeEventListener) { // DOMレベル2イベントモデル
            document.removeEventListener("mousemove", this._keyPress.onKeyPressKeyDown, true);
            document.removeEventListener("mouseup", this._keyPress.onKeyPressKeyUp, true);
            document.removeEventListener("blur", this._keyPress.onKeyPressBlur, true);
        }
    }

};
