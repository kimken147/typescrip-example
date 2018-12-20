import React, { PureComponent, lazy, Suspense } from 'react';
import { IArticle } from "components/Article";
import { connect } from 'react-redux';
import { StoreState } from 'pages/lineTodayRedux';

const Headline = lazy(() => import("./components/headline"));
const SubNewsSection = lazy(() => import("./components/subNewsSection"));

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

interface StateProps {
    isHome: boolean
}

class Container extends PureComponent<StateProps> {
    render() {
        return (
            <section className="container">
                <Suspense fallback={<div>Loading...</div>}>
                    {this.props.isHome ? <Headline />: <SubNewsSection />}
                </Suspense>
            </section>
        )
    }
}

export default connect((state: StoreState): StateProps => ({isHome: state.isHome}))(Container);
