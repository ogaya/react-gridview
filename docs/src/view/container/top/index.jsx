import React from "react";

const Top = React.createClass({
  render: function() {
    return (
      <div>
        <div>
          I'm afraid my expressions may be rude or hard to read, because I'm not so good at English. But please be patient.
        </div>

        <div className="subhead">
          What is this?
        </div>
        <div className="report">
          This component provides a spreadsheet interface to your web application.
        </div>

      </div>
    );
  }
});

export{
  Top as default
};
