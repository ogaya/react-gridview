
/**
 * メインとなるマウスの書く処理を定義する
 */
const KeyPress = {
  _keyPress: {
    ctrl: false
  },
  _addKeyPressEvent(){
    if (document.addEventListener) { // DOMレベル2イベントモデル
      //キャプチャリングイベントハンドラを登録する
      document.addEventListener('keydown', this._onKeyPressKeyDown, true);
      document.addEventListener('keyup', this._onKeyPressKeyUp, true);
      document.addEventListener('blur', this._onKeyPressBlur, true);
    }
  },
  _removeKeyPressEvent(){
    if (document.removeEventListener) { // DOMレベル2イベントモデル
      document.removeEventListener('mousemove', this._onKeyPressKeyDown, true);
      document.removeEventListener('mouseup', this._onKeyPressKeyUp, true);
      document.removeEventListener('blur', this._onKeyPressBlur, true);
    }
  },
  _onKeyPressKeyDown(e){
    if(e.keyCode === 17){
      this._keyPress.ctrl = true;
    }
  },
  _onKeyPressKeyUp(e){
    if(e.keyCode === 17){
      this._keyPress.ctrl = false;
    }
  },
  _onKeyPressBlur(){
    this._keyPress.ctrl = false;
  }
};

export{
  KeyPress
};
