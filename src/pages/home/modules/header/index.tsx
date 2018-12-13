import React, { Component } from 'react';
import cx from "classnames";

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

interface IState {
    visibleList: Array<ICategoryListItem>,
    more: Array<ICategoryListItem>,
    activeId: number
}

export default class Header extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            visibleList: props.list.slice(0, 9),
            more: props.list.slice(9),
            activeId: props.list[0].id
        }
    }

    render() {
        const {
            state: {
                activeId
            }
        } = this;
        return (
            <header className="top-header">
                <nav>
                    <ul>
                        <li className="logo">
                            <a>Line Today</a>
                        </li>
                        {this.state.visibleList.map((category) => {
                            return (
                                <li key={category.id} className={cx({ active: activeId === category.id })}>
                                    <a
                                        onClick={() => this.setState({ activeId: category.id })}>
                                        {category.name}
                                    </a>
                                </li>
                            )
                        })}
                        <li className="more">
                            More
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}