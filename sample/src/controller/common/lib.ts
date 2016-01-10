
export function download(json, filename) {
    const j = JSON.stringify(json);
    const blob = new Blob([j], { type: "application/json" });
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
        return;
    }
    const objectURL = (window.URL || (window as any).webkitURL).createObjectURL(blob);
    const a: any = document.createElement('a');
    const e: any = document.createEvent('MouseEvent');
    //a要素のdownload属性にファイル名を設定
    a.download = filename;
    a.href = objectURL;

    //clickイベントを着火
    e.initEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
}
