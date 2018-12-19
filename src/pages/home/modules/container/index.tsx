import React, { PureComponent, lazy, Suspense } from 'react';
import { IArticle } from "components/Article";

const Headline = lazy(() => import("./components/headline"));

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

export default class Container extends PureComponent {
    render() {
        return (
            <section className="container">
                <Suspense fallback={<div>Loading...</div>}>
                    <Headline />
                </Suspense>
            </section>
        )
    }
}