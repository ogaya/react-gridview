import React from "react";
import GridView from "../src/react-gridview";

const Main = React.createClass({
    render: function() {
        return (
            <GridView />
        );
    }
});


React.render(
    <Main />,
    document.getElementById('main')
);
