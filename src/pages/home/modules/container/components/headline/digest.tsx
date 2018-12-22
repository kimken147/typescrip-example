import React, { PureComponent } from 'react';
import Data from "models/data.json";
import Slider from "components/Slider";
import Article, { IArticle } from "components/Article";
import { ICategory, ISection, ITemplates } from "pages/home/modules/container";
import DetectWindowWidth from 'components/HOC/DetectWindowWidth';

type StateProps = {
    windowWidth: number
}
class Digest extends PureComponent<StateProps>{

    newsList: IArticle[];
    state: Readonly<{ article: IArticle }>;

    constructor(props: StateProps) {
        super(props);
        this.newsList = (((Data.result.categories.find(item => item.id === 100259) as ICategory)
            .templates.find(item => item.type === 50) as ITemplates)
            .sections.find(item => item.type === 1) as ISection).articles;
        this.state = {
            article: this.newsList[0]
        }
    }

    private onSlideEnd = (index: number) => {
        this.setState({ article: this.newsList[index] });
    }

    render() {
        const { article } = this.state;
        const width = this.props.windowWidth <= 1024 ? this.props.windowWidth : 712

        return (
            <div className="headline-digest">
                <Slider onSildeEnd={this.onSlideEnd} styles={{ width, height: width / 1.78 }}>
                    {this.newsList.map(news => {
                        return <Article key={news.id} {...news} thumbnailSize={1200} figure={{ width, height: width / 1.78 }} />;
                    })}
                </Slider>
                <a className="digest-detail">
                    <h2>{article.title}</h2>
                    <p>content</p>
                    <div className="category">
                        <span className="name">{article.categoryName}</span>
                        <span className="publisher">{article.publisher}</span>
                    </div>
                </a>
            </div>
        )
    }
}

export default DetectWindowWidth(Digest);