import "./style.sass";
import Data from "models/data.json";

import React, { PureComponent } from 'react';
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducers } from "pages/lineTodayRedux";

import Header from "./modules/header";
import Container from "./modules/container";

export type CategoryIdType = number | string;

const store = createStore(reducers, (window as any).devToolsExtension ? (window as any).devToolsExtension(): () => {});

console.log(Data);
class Home extends PureComponent {
    render() {
        return (
            <Provider store={store}>
                <Header />
                <Container />
            </Provider>
        )
    }
}

ReactDOM.render(<Home />, document.getElementById("home"));