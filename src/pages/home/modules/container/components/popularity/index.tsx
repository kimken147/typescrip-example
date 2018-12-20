import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from "classnames";

import { StoreState, CategoryList, Categories } from 'pages/lineTodayRedux';
import { createSelector } from 'reselect';
import { ITemplates, ICategory } from 'pages/home/modules/container';
import { IArticle } from 'components/Article';

interface StateProps {
    articles: IArticle[];
    categoryList: CategoryList;
    categoryId: number | string;
    categories: Categories;
}

interface IState {
    prevId: number | string,
    prevStateId: number | string,
    categoryId: number | string;
    articles: IArticle[],
    transitionStyle?: {
        transition?: string;
        transform?: string;
    }
}

const getArticles = (categories: Categories, categoryId: number | string) => {
    const templates = ((categories.find(item => item.id === categoryId) as ICategory)
        .templates.find(item => item.type === 6) as ITemplates)
    return templates ? templates.sections[0].articles.slice(0, 10) : new Array<IArticle>()
};


class Popularity extends PureComponent<StateProps, IState> {

    state: Readonly<IState> = {
        categoryId: this.props.categoryId,
        prevId: this.props.categoryId,
        prevStateId: this.props.categoryId,
        articles: this.props.articles,
        transitionStyle: {
            transition: "",
            transform: ""
        }
    }

    private lliDOM: HTMLElement | null = null;

    static getDerivedStateFromProps(props: StateProps, state: IState) {
        if (props.categoryId !== state.prevId) {
            return {
                categoryId: props.categoryId,
                prevId: props.categoryId,
                prevStateId: props.categoryId,
                articles: props.articles
            };
        }
        if (state.categoryId !== state.prevStateId) {
            return {
                prevStateId: state.categoryId,
                articles: getArticles(props.categories, state.categoryId)
            }
        }
        return null;
    }

    componentDidUpdate(prevProps: StateProps, prevState: IState) {
        if (prevState.categoryId !== this.state.categoryId) {
            const prev = this.props.categoryList.findIndex(item => item.id === prevState.categoryId);
            const current = this.props.categoryList.findIndex(item => item.id === this.state.categoryId);
            if (prev > 1 || current !== 0 && current !== 1) {
                const target = this.lliDOM as HTMLElement;
                const parent = target.parentElement as HTMLElement;
                const distance = target.offsetLeft !== 0 ? (target.offsetLeft > parent.offsetLeft ?
                    target.offsetLeft - parent.offsetLeft :
                    target.offsetLeft) - target.offsetWidth : 0;
                this.setState({
                    transitionStyle: {
                        transform: `translateX(-${distance}px)`,
                        transition: "transform 0.5s"
                    }
                })
            }
        }
    }

    onTabClick = (categoryId: number | string) => {
        this.setState({ categoryId });
    }

    render() {
        const { categoryList } = this.props;
        const { categoryId, articles } = this.state;

        return (
            <aside className="popularity-container">
                <h3 className="title">熱門</h3>
                <nav>
                    <div className="swiper">
                        <ul style={this.state.transitionStyle}>
                            {categoryList.map(category => {
                                const isActive = category.id === categoryId;
                                return (
                                    <li key={category.id} ref={r => {
                                        if (isActive) {
                                            this.lliDOM = r;
                                        }
                                    }}>
                                        <a
                                            className={cx({ active: category.id === categoryId })}
                                            onClick={() => this.onTabClick(category.id)}>
                                            {category.name === "今日頭條" ? "全部" : category.name}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </nav>
                <div className="list">
                    <ol>
                        {articles.map(article => {
                            return (
                                <li key={article.id}>
                                    <a>{article.title}</a>
                                    <div className="publisher">{article.publisher}</div>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </aside>
        )
    }
}

const selector = createSelector(
    (state: StoreState) => state.categories,
    (state: StoreState) => state.categoryId,
    (categories, categoryId) => getArticles(categories, categoryId)
)

const mapStateToProps = (state: StoreState) => {
    return {
        articles: selector(state),
        categoryId: state.categoryId,
        categoryList: state.categoryList,
        categories: state.categories
    }
};

export default connect<StateProps, {}, {}, StoreState>(mapStateToProps)(Popularity);