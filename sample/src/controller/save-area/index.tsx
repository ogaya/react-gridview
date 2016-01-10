import * as React from "react";
import {Sheet, Operation} from "react-gridview";

import SimpleButton from "../common/simple-button/index.tsx";
import {download} from "../common/lib.ts";

import "./index.css";

const SaveIcon = require("./save.png");
const OpenIcon = require("./open.png");

export interface Props {
    sheet: Sheet;
    showSubWindow: (window) => void;
    onControlView: (sheet: Sheet) => void;
}

export default class SaveArea extends React.Component<Props, {}> {
    public static displayName = "SaveArea";

    private _onClickDownLoad() {
        download(this.props.sheet.toMinJS(), "gridview.json");
    }

    private _onClickOpen(e) {
        const file = e.target.files;

        //FileReaderの作成
        const reader = new FileReader();
        //テキスト形式で読み込む
        reader.readAsText(file[0]);

        //読込終了後の処理
        reader.onload = (ev) => {
            const json = JSON.parse(reader.result);
            const sheet = Sheet.fromJS(json);
            this.props.onControlView(sheet);
        }
    }

    render() {
        return (
            <div className="save-area">
                <SimpleButton icon={SaveIcon}
                    onClick={this._onClickDownLoad.bind(this) }/>
                <SimpleButton icon={OpenIcon} type="file"
                    onChange={this._onClickOpen.bind(this) }/>
                </div>
        );
    }
}
