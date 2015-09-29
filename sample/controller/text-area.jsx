import React from "react";

import "./text-area-css";

const areaStyle = {
    background: "#FF0",
    width: "100%",
    height: "100%"
};

// const idAreaStyle = {
//     width: "50px",
//     height: "100%",
//     background: "#ccc"
// };

const TextArea = React.createClass({
  displayName: "TextArea",
  propTypes: {
  },
  render: function() {
    return (
      <div style={areaStyle}>
        <ul id="breadcrumbs-one">
            <li><a href="">Lorem ipsum</a></li>
            <li><a href="">Vivamus nisi eros</a></li>
            <li><a href="">Nulla sed lorem risus</a></li>
            <li><a href="">Nam iaculis commodo</a></li>
            <li><a href="" class="current">Current crumb</a></li>
        </ul>
      </div>
    );
  }
});

module.exports = TextArea;
