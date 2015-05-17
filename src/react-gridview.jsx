import React from "react";

import "./react-gridview.styl";

const GridView = React.createClass({
  displayName: "gridview",
  propTypes: {
    rows: React.PropTypes.array,
    columns: React.PropTypes.array
  },
  render: function () {
    return (
      <div className="gridview-container">
        <table className="sample_02">
          <tbody>
            <tr>
              <th>SAMPLE02</th>
              <th>デザイン</th>
              <th>枠線</th>
              <th>カラー</th>
            </tr>
            <tr>
              <td>有料</td>
              <td>プロ</td>
              <td>有り</td>
              <td>２１６色</td>
            </tr>
            <tr>
              <td>無料</td>
              <td>アマチュア</td>
              <td>なし</td>
              <td>モノトーン</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = GridView;
