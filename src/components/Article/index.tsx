import React, { PureComponent } from 'react'
import cx from "classnames";
import LazyLoad from "react-lazyload";
export interface IArticle {
    id: string | number,
    badgeText: string,
    categoryId: number,
    categoryName: string,
    postId: string,
    publisher: string,
    status: string,
    thumbnail: {
        hash: string
    },
    title: string,
    url: {
        hash: string,
        url: string
    },
    figure: {
        width: number | string,
        height: number | string
    },
    className: string,
    thumbnailSize?: number,
    lazyLoad?: boolean,
    [propName: string]: any,
}

class Aritcle extends PureComponent<IArticle> {

    static defaultProps = {
        thumbnailSize: 580,
        lazyLoad: false
    }

    render() {
        const {
            href,
            title,
            publisher,
            thumbnail,
            thumbnailSize,
            lazyLoad,
            figure
        } = this.props;

        const figureComponent = <figure style={{
            backgroundImage: `url(https://obs.line-scdn.net/${thumbnail.hash}/w${thumbnailSize}`,
            width: figure.width,
            height: figure.height
        }}>
    
        </figure>

        return (
            <a className={cx(this.props.className, "news")} href={href} title={title}>
                {lazyLoad ?
                    <LazyLoad once height={figure.height} >
                        {figureComponent}
                    </LazyLoad> :
                    figureComponent
                }
                <div className="content">
                    <p>{title}</p>
                    {publisher ? <span>{publisher}</span> : null}
                </div>
            </a>
        )
    }
}

export default Aritcle