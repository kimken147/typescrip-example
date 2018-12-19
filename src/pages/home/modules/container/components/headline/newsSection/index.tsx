import React, { PureComponent } from 'react';
import Data from "models/data.json";

import Article, { IArticle } from "components/Article";
import { ICategory, ITemplates } from "pages/home/modules/container";

interface IState { currentNews: ITemplates[], length: number };

export default class NewsSection extends PureComponent<{}> {
    fixNews: ITemplates[] = this.fixNews = (Data.result.categories.find(item => item.id === 100259) as ICategory).templates;

    state: Readonly<IState> = {
        currentNews: this.fixNews,
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