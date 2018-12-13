import React, { Component } from 'react';
import cx from "classnames";
import PopupList, { IProps as IPopupListProps, IItem } from "components/PopupList";
import Button from "components/Button";

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
    activeId: number | string
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
                visibleList,
                activeId,
                more
            }
        } = this;

        const popupListProps: IPopupListProps = {
            list: more.map(item => {
                const $IItem: IItem = {
                    displayText: item.name,
                    id: item.id
                };
                return $IItem;
            }),
            current: more.findIndex(item => item.id === activeId),
            onChange: item => this.setState({ activeId: (item as IItem).id })
        };

        return (
            <header className="top-header">
                <nav>
                    <ul>
                        <li className="logo">
                            <a>Line Today</a>
                        </li>
                        {visibleList.map((category) => {
                            return (
                                <li key={category.id} className={cx({ active: activeId === category.id })}>
                                    <a
                                        onClick={() => this.setState({ activeId: category.id })}>
                                        {category.name}
                                    </a>
                                </li>
                            )
                        })}
                        <PopupList {...popupListProps}>
                            <Button className="more">
                                More
                            </Button>
                        </PopupList>

                    </ul>
                </nav>
            </header>
        )
    }
}