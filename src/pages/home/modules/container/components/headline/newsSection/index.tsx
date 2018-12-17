import React, { PureComponent, Fragment } from 'react';
import Article from "components/Article";
import Data from "models/data.json";

import { IArticle } from "components/Article";
import { ICategory, ITemplates } from "pages/home/modules/container";


export default class NewsSection extends PureComponent<{}> {
    fixNews: ITemplates[];

    constructor(props: {}) {
        super(props);
        this.fixNews = (Data.result.categories.find(item => item.id === 100259) as ICategory).templates;
    }

    render() {
        return (
            <div className="headline-news-section">
                {this.fixNews.map((news: ITemplates) => {
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
                                {main.map((article) => <Article {...article} key={article.id} className="main" />)}
                                {rest.map((article) => <Article {...article} key={article.id} className="sub" />)}
                            </article>
                        </div>
                    }
                })}
            </div>
        )
    }
}