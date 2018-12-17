import React from 'react'
import cx from "classnames";
import { number } from 'prop-types';

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
    [propName: string]: any,
}


const News = (props: IArticle) => {
    const {
        href,
        title,
        publisher,
        thumbnail,
        size
    } = props;

    return (
        <a className={cx(props.className, "news")} href={href} title={title}>
            <figure style={{ backgroundImage: `url(https://obs.line-scdn.net/${thumbnail.hash}/w${size}` }} />
            <div className="content">
                <p>{title}</p>
                {publisher ? <span>{publisher}</span> : null}
            </div>
        </a>
    )
}

News.defaultProps = {
    size: 580
}

export default News