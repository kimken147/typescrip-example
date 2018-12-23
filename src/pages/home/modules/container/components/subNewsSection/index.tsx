import React, { PureComponent, Fragment as div } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
    ;
import { StoreState } from 'pages/lineTodayRedux';
import { ICategory, ITemplates, ISection } from 'pages/home/modules/container';
import Article from "components/Article";
import Popularity from "../popularity";


interface StateProps {
    digest: ISection[],
    otherNews: ITemplates[],
    cateogoryName: string | undefined,
    isMobile: boolean
}

class SubNewsSection extends PureComponent<StateProps> {
    render() {
        const { cateogoryName, digest, isMobile } = this.props;

        const digestFigureStyle = isMobile ? { width: window.innerWidth, height: window.innerWidth / 1.78 } : { width: 712, height: 400 };
        const figureStyle = isMobile ? { width: "30vw", height: "20vw" } : { width: 252, height: 148 }

        return (
            <div className="sub-news-outter">
                <section className="news-section">
                    <h1>{cateogoryName}</h1>
                    <div className="digest">
                        <Article {...(digest.find(item => item.type === 1) as ISection).articles[0]} figure={digestFigureStyle} />
                    </div>
                    <div className="sub-digest">
                        {(digest.find(item => item.type === 3) as ISection).articles.map(item => {
                            return <Article {...item} key={item.id} className="subpage-news" figure={figureStyle} />
                        })}
                    </div>
                    <div className="other-news">
                        {this.props.otherNews.map(news => {
                            if (news.type === 59 && news.title) {
                                return (
                                    <div key={news.id} className="news-section-block">
                                        <h3 className="news-section-title">{news.title}</h3>
                                        <div className="news-wrapper">
                                            {(news.sections[0] as ISection).articles.map(article => {
                                                return <Article {...article} key={article.id} className="subpage-news" figure={figureStyle} lazyLoad />;
                                            })}
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </section>
                <Popularity />
            </div>
        )
    }
}

const digestSelector = createSelector(
    (state: StoreState) => state.categories,
    (state: StoreState) => state.category.id,
    (categories, categoryId) => {
        return ((categories.find(item => item.id === categoryId) as ICategory)
            .templates.find(item => item.type === 50) as ITemplates)
            .sections
    }
)

const otherNewsSelector = createSelector(
    (state: StoreState) => state.categories,
    (state: StoreState) => state.category.id,
    (categories, categoryId) => {
        return (categories.find(item => item.id === categoryId) as ICategory)
            .templates
    }
)

export default connect((state: StoreState): StateProps => ({
    digest: digestSelector(state),
    otherNews: otherNewsSelector(state),
    cateogoryName: state.category.name,
    isMobile: state.isMobile
}))(SubNewsSection)