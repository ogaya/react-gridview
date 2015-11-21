import React from "react";
import ReactDOM from "react-dom";
import {Range} from "immutable";

import Header     from "./view/header";
import SideMenu   from "./view/side-menu";
import Container  from "./view/container";

import "./index.css";

const Main = React.createClass({
  getInitialState() {
    return {
      hash: location.hash
    };
  },
  componentDidMount(){
    window.onhashchange = () => {
      this.setState({hash: location.hash});
    };
  },
  render: function() {
    return (
      <div>
        <Header />

        <div className="content">

          <SideMenu hash={this.state.hash} />
          <Container hash={this.state.hash}/>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
    <Main />,
    document.getElementById("main")
);
