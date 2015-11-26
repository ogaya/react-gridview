
/**
 * メインとなるマウスの書く処理を定義する
 */
const KeyPress = {
  _keyPress: {
    ctrl: false,
    alt: false,
    shift: false
  },
  _addKeyPressEvent(){
    if (document.addEventListener) { // DOMレベル2イベントモデル
      //キャプチャリングイベントハンドラを登録する
      document.addEventListener("keydown", this._onKeyPressKeyDown, true);
      document.addEventListener("keyup", this._onKeyPressKeyUp, true);
      document.addEventListener("blur", this._onKeyPressBlur, true);
    }
  },
  _removeKeyPressEvent(){
    if (document.removeEventListener) { // DOMレベル2イベントモデル
      document.removeEventListener("mousemove", this._onKeyPressKeyDown, true);
      document.removeEventListener("mouseup", this._onKeyPressKeyUp, true);
      document.removeEventListener("blur", this._onKeyPressBlur, true);
    }
  },
  _onKeyPressKeyDown(e){
    if(e.keyCode === 16){
      this._keyPress.shift = true;
    }
    if(e.keyCode === 17){
      this._keyPress.ctrl = true;
    }
    if(e.keyCode === 18){
      this._keyPress.alt = true;
    }
  },
  _onKeyPressKeyUp(e){
    if(e.keyCode === 16){
      this._keyPress.shift = false;
    }
    if(e.keyCode === 17){
      this._keyPress.ctrl = false;
    }
    if(e.keyCode === 18){
      this._keyPress.alt = false;
    }
  },
  _onKeyPressBlur(){
    this._keyPress.ctrl = false;
    this._keyPress.alt = false;
    this._keyPress.shift = false;
  }
};

export{
  KeyPress
};
