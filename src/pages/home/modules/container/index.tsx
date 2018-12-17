import React, { PureComponent } from 'react';
import Headline from './components/headline';
import { IArticle } from "components/Article";

interface IBase {
    id: number | string,
    name?: string
}

export interface ISection {
    type: number;
    articles: IArticle[];
}

export interface ITemplates extends IBase {
    sections: Array<ISection>,
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