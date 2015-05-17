import React from "react";

import "./react-gridview.styl";


const ColumnHeader = React.createClass({
displayName: "gridview-column-header",
propTypes: {
  rows: React.PropTypes.array,
  columns: React.PropTypes.array
},
render: function () {
  return (
    <tr>
      <th>SAMPLE02</th>
      <th>デザイン</th>
      <th>枠線</th>
      <th>カラー</th>
    </tr>
  );
}
});

module.exports = ColumnHeader;
