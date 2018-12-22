import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { StoreState } from "pages/lineTodayRedux";
import Article, { IArticle } from "components/Article";
import { ICategory, ITemplates } from "pages/home/modules/container";

interface IState { currentNews: ITemplates[], length: number };

interface StateProps {
    newsList: ITemplates[],
    isMobile: boolean
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


                        const count = this.props.isMobile ? 2 : 4;
                        const main = articles.slice(0, count);
                        const rest = articles.slice(count);

                        return <div className="section-block" key={news.id}>
                            <h3>{news.title}</h3>
                            <article className="news-block">
                                {main.map((article) => <Article {...article} key={article.id} className="main" figure={{ width: "100%", height: window.innerWidth / 4 }} lazyLoad />)}
                                {rest.map((article) => {
                                    const width = this.props.isMobile ? "30vw": 140;
                                    const height = this.props.isMobile ? "20vw": 96;
                                    return <Article {...article} key={article.id} className="sub" figure={{ width, height }} lazyLoad />
                                })}
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

const mapStateToProps = (state: StoreState): StateProps => {
    return {
        newsList: selector(state),
        isMobile: state.isMobile
    }
}

export default connect<StateProps, {}, {}, StoreState>(mapStateToProps)(NewsSection);