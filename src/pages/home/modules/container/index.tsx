import React, { PureComponent } from 'react';
import Headline from './components/headline';
import { IArticle } from "components/Article";

interface IBase {
    id: number | string,
    name?: string
}

export interface ITemplates extends IBase {
    sections: Array<{
        type: number,
        articles: Array<IArticle>
    }>,
    type: number,
    title?: string
}

export interface ICategory extends IBase {
    order: number,
    templates: Array<ITemplates>,
}


export default class Container extends PureComponent<{}> {
    render() {
        return (
            <section className="container">
                <Headline />
            </section>
        )
    }
}