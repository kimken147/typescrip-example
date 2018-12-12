import React, { Component } from 'react';

export interface ICategoryListItem {
    id: number,
    name: string,
    type: number,
    highlight?: {
        enable: boolean
    } | undefined
}
interface IProps {
    list: Array<ICategoryListItem>
}

export default class Header extends Component<IProps> {
    render() {
        return (
            <header>
                {this.props.list.map((category) => {
                    return (
                        <span key={category.id}>{category.name}</span>
                    )
                })}
            </header>
        )
    }
}