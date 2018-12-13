import React, { PureComponent, ReactElement } from 'react';
import cx from "classnames";

export interface IItem {
    id: string | number;
    displayText: string;
    [propName: string]: any;
}

type ItemTypes = IItem | string | number;
type currentTypes = number | null | undefined;

export interface IProps {
    list: Array<ItemTypes>;
    onChange: (item: ItemTypes) => void;
    current: currentTypes;
}

interface IState {
    current: currentTypes;
    prevPropsIndex: currentTypes;
    hover: boolean;
}

export default class PopupList extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            current: props.current || null,
            hover: false,
            prevPropsIndex: props.current || null
        }
    }

    static getDerivedStateFromProps(props: IProps, state: IState) {
        if (props.current !== state.prevPropsIndex) {
            return {
                current: props.current,
                prevPropsIndex: props.current
            }
        }
        return null;
    }

    onChange = (index: number) => {
        const {
            props: { list },
            state: { current }
        } = this;
        if (current === index) {
            return;
        }
        this.setState({ current: index }, () => {
            this.props.onChange(list[index]);
        })
    }

    render() {
        const {
            props: {
                children,
                list
            },
            state: {
                current
            }
        } = this;

        return (
            <div className="popup-list-wrapper">
                {React.Children.map(children, child => {
                    const $child = child as ReactElement<{ [propName: string]: any }>;
                    return React.cloneElement($child, {
                        className: cx($child.props.className, "popup-list-target")
                    })
                })}
                <div className="popup-list">
                    <ul className="list-wrapper">
                        {list.map((item, index) => {
                            return (
                                <li
                                    className={cx({ active: index === current })}
                                    key={typeof item === "object" ? item.id : index}
                                    onClick={() => this.onChange(index)}>
                                    {typeof item === "object" ? item.displayText : item}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}