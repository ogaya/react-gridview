// [機能] ドラッグ処理を追加
// [説明] 引数 taget : ドラッグ処理のオブジェクト
//       dragStartFnc : ドラッグ開始処理
//       dragMoveFnc : ドラッグ移動処理
//       dragEndFnc : ドラッグ終了処理
// [戻値] true : 処理追加成功、false : 処理追加失敗
const drag = function(taget, dragStartFnc?, dragMoveFnc?, dragEndFnc?) {
    // 対象オブジェクトが存在しない場合はエラー
    if (!taget) {
        return false;
    }
    // document.onselectの退避用
    var selectFnc = null;
    // ドラッグ開始処理
    var dragStart = function(e) {
        //移動中の選択を無効化する
        selectFnc = document.onselect;
        document.onselect = function() { return false; };
        if (typeof dragStartFnc === "function") {
            // ドラッグ開始処理がfunctionの場合は実行する。
            dragStartFnc(e);
        }
        if (document.addEventListener) { // DOMレベル2イベントモデル
            //キャプチャリングイベントハンドラを登録する
            document.addEventListener("mousemove", dragMove, true);
            document.addEventListener("mouseup", dragEnd, true);
        } else { //IE5以降のイベントモデル
            //イベントをキャプチャする
            taget.setCapture();
            // Handler.add(taget, "mousemove", dragMove);
            // Handler.add(taget, "mouseup", dragEnd);
            // //マウスキャプチャを失った場合はmouseupイベントとして処理する
            // Handler.add(taget, "losecapture", dragEnd);
            taget.addEventListener("mousemove", dragMove);
            taget.addEventListener("mouseup", dragEnd);
            //マウスキャプチャを失った場合はmouseupイベントとして処理する
            taget.addEventListener("losecapture", dragEnd);
        }
        //このイベントが終了したので、ほかの要素が処理しないようにする
        e.stopPropagation();
        //デフォルトの処理を抑制する
        e.preventDefault();
    };
    // ドラッグ移動処理
    var dragMove = function(e) {
        if (typeof dragMoveFnc === "function") {
            // ドラッグ移動処理がfunctionの場合は実行する。
            dragMoveFnc(e);
        }
        //このイベントが終了したので、ほかの要素が処理しないようにする
        e.stopPropagation();
    };
    // ドラッグ終了処理
    var dragEnd = function(e) {
        //移動中の選択無効化を解除
        document.onselect = selectFnc;
        if (typeof dragEndFnc === "function") {
            // ドラッグ終了処理がfunctionの場合は実行する。
            dragEndFnc(e);
        }
        if (document.removeEventListener) { // DOMレベル2イベントモデル
            document.removeEventListener("mousemove", dragMove, true);
            document.removeEventListener("mouseup", dragEnd, true);
        } else { //IE5以降のイベントモデル
            // Handler.remove(taget, "losecapture", dragEnd);
            // Handler.remove(taget, "mouseup", dragEnd);
            // Handler.remove(taget, "mousemove", dragMove);
            taget.removeEventListener("losecapture", dragEnd);
            taget.removeEventListener("mouseup", dragEnd);
            taget.removeEventListener("mousemove", dragMove);
            taget.releaseCapture();
        }
        //このイベントが終了したので、ほかの要素が処理しないようにする
        e.stopPropagation();
    };
    //Handler.add(taget, "mousedown", dragStart);
    taget.addEventListener("mousedown", dragStart);
    return true;
};

export {
drag
};
