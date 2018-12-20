import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { StoreState } from "pages/lineTodayRedux";
import Article, { IArticle } from "components/Article";
import { ICategory, ITemplates } from "pages/home/modules/container";

interface IState { currentNews: ITemplates[], length: number };

interface StateProps {
    newsList: ITemplates[]
}

class NewsSection extends PureComponent<StateProps, IState> {

    state = {
        currentNews: this.props.newsList,
        length: 1
    };

    render() {
        return (
            <div className="headline-news-section">
                {this.state.currentNews.map((news: ITemplates) => {
                    if (news.type === 59) {
                        const articles = news.sections.reduce((prev, cur) => {
                            prev.push(...cur.articles);
                            return prev;
                        }, new Array<IArticle>());

                        const main = articles.slice(0, 4);
                        const rest = articles.slice(4);

                        return <div className="section-block" key={news.id}>
                            <h3>{news.title}</h3>
                            <article className="news-block">
                                {main.map((article) => <Article {...article} key={article.id} className="main" figure={{ width: "100%", height: 185 }} lazyLoad />)}
                                {rest.map((article) => <Article {...article} key={article.id} className="sub" figure={{ width: 140, height: 96 }} lazyLoad />)}
                            </article>
                        </div>
                    }
                })}
            </div>
        )
    }
}

const selector = createSelector(
    (state: StoreState) => state.categories,
    (categories) => {
        return (categories.find(item => item.id === 100259) as ICategory).templates;
    }
)

const mapStateToProps = (state: StoreState) => {
    return {
        newsList: selector(state)
    }
}

export default connect<StateProps, {}, {}, StoreState>(mapStateToProps)(NewsSection);