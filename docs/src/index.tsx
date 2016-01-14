import * as React from "react";
import * as  ReactDOM from "react-dom";
import {Range} from "immutable";

import Header     from "./view/header/index.tsx";
import SideMenu   from "./view/side-menu/index.tsx";
import Container  from "./view/container/index.tsx";

import "./index.css";

interface State {
    hash: string;
}

class Main extends React.Component<{}, State>{
    state: State = {
        hash: location.hash
    };
    componentDidMount() {
        window.onhashchange = () => {
            this.setState({ hash: location.hash });
        };
    }
    render() {
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
};

ReactDOM.render(
    <Main />,
    document.getElementById("main")
);
