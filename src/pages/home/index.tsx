import "./style.sass";
import Data from "models/data.json";

import React, { Fragment } from 'react';
import ReactDOM from "react-dom";

import Header, { ICategoryListItem } from "./modules/header";
import Container from "./modules/container";

console.log(Data);

const Home: React.SFC<{}> = () => {
    return (
        <Fragment>
            <Header list={Data.result.categoryList as Array<ICategoryListItem>} />
            <Container></Container>
        </Fragment>
    )
}


ReactDOM.render(<Home />, document.getElementById("home"));