import React from 'react'
import cx from "classnames";

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
    [propName: string]: any
}


const News = (props: IArticle) => {
    const {
        href,
        title,
        publisher,
        imageUrl
    } = props;

    return (
        <a className={cx(props.className, "news")} href={href} title={title}>
            <figure style={{backgroundImage: `url(${imageUrl}`}} />
            <div className="content">
                <p>{title}</p>
                {publisher ? <span>{publisher}</span>: null}
            </div>
        </a>
    )
}

export default News