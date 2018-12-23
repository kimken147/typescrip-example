import "./style.sass";
import Data from "models/data.json";

import React, { PureComponent, Fragment, lazy, Suspense } from 'react';
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import Reducers from "pages/lineTodayRedux/reducers";
import { StoreState } from "pages/lineTodayRedux";

import Container from "./modules/container";
import MobileDetector from "./mobileDetector";

const PCHeader = lazy(() => import("./modules/header/PCHeader"));
const MobileHeader = lazy(() => import("./modules/header/mobileHeader"));

type StateProps = {
    isMobile: boolean
}

const store = createStore(Reducers, (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f);

console.log(Data);
class Home extends PureComponent<StateProps> {
    render() {
        return (
            <Fragment>
                <Suspense fallback={<div>Loading...</div>}>
                    {this.props.isMobile ? <MobileHeader /> : <PCHeader />}
                </Suspense>
                <Container />
            </Fragment>
        )
    }
}

const Wrapped = connect((state: StoreState) => {
    return {
        isMobile: state.isMobile
    }
})(Home);

const HomeOuter = () => {
    return (
        <Provider store={store}>
            <Wrapped />
            <MobileDetector />
        </Provider>
    )
}

ReactDOM.render(<HomeOuter />, document.getElementById("home"));
