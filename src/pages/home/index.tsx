import "./styles/normal.sass"

import React from 'react';
import ReactDOM from "react-dom";

import Header from "./modules/header";

import Data from "models/data.json";

import { ICategoryListItem } from "./modules/header";

console.log(Data);

const Home: React.SFC<{}> = () => {
    return (
        <React.Fragment>
            <Header list={Data.result.categoryList as ICategoryListItem[]}></Header>
        </React.Fragment>
    )
}


ReactDOM.render(<Home />, document.getElementById("home"));