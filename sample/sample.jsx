import React from "react";
import GridView from "../dist/react-gridview.js";
//import {StageMixin} from "../dist/react-helix";
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
