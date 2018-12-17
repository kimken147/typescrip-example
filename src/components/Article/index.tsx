import React from 'react'
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
    className: string,
    size?: number,
    lazyLoad?: boolean,
    [propName: string]: any,
}


const News = (props: IArticle) => {
    const {
        href,
        title,
        publisher,
        thumbnail,
        size,
        lazyLoad
    } = props;

    return (
        <a className={cx(props.className, "news")} href={href} title={title}>
            {lazyLoad ?
                <LazyLoad once>
                    <figure style={{ backgroundImage: `url(https://obs.line-scdn.net/${thumbnail.hash}/w${size}` }} />
                </LazyLoad> :
                <figure style={{ backgroundImage: `url(https://obs.line-scdn.net/${thumbnail.hash}/w${size}` }} />
            }
            <div className="content">
                <p>{title}</p>
                {publisher ? <span>{publisher}</span> : null}
            </div>
        </a>
    )
}

News.defaultProps = {
    size: 580,
    lazyLoad: false
}

export default News