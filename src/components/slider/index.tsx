import React, { PureComponent, ReactElement } from 'react';
import cx from "classnames";
import { LeftArrow, RightArrow } from "components/Icons";

enum Direction {
    left = "left",
    right = "right"
};

type DirectionTypes = keyof typeof Direction;
type DirectionAsKeys = {
    [key in DirectionTypes]?: number
}

interface IStyles extends DirectionAsKeys {
    transform?: string;
    transition?: string;
    opacity?: number;
}

interface IProps {
    time: number;
    styles: {
        width: number,
        height: number,
        [name: string]: any
    };
    arrow?: {
        enabled: boolean,
        size: number
    };
    onSildeEnd?: (index: number) => void;
}

interface IState {
    current: number;
    sliding: boolean;
    direction: Direction;
    prev: number;
    interval: number | undefined;
}


export default class Slider extends PureComponent<IProps, IState> {

    state: Readonly<IState> = {
        current: 0,
        sliding: false,
        direction: Direction.left,
        prev: 0,
        interval: undefined
    }

    static defaultProps = {
        styles: {
            width: 712,
            height: 400
        },
        time: 5000,
        arrow: {
            enabled: true,
            size: 72
        },
        children: [
            <div></div>
        ],
        onSlideEnd: () => { }
    }

    componentDidMount() {
        if (this.props.time) {
            const interval = setInterval(this.next, this.props.time);
            this.setState({ interval });
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    next = () => {
        const {
            props: { children },
            state: { current, sliding }
        } = this;
        if (sliding) return;
        const length = React.Children.count(children);
        const $next = current === length - 1 ? 0 : current + 1;
        this.setState({ prev: current, current: $next, sliding: true, direction: Direction.right });
    }

    prev = () => {
        const {
            props: { children },
            state: { current, sliding }
        } = this;
        if (sliding) return;
        const length = React.Children.count(children);
        const $prev = current === 0 ? length - 1 : current - 1;
        this.setState({ prev: current, current: $prev, sliding: true, direction: Direction.left });
    }

    goto(index: number) {
        const {
            state: { current, sliding }
        } = this;
        if (sliding) return;
        if (index === current) return;
        const direction = index > current ? Direction.right : Direction.left;
        this.setState({ prev: current, current: index, sliding: true, direction });
    }

    render() {
        const {
            props: {
                styles,
                arrow
            },
            state: {
                current,
                direction,
                prev,
                sliding
            }
        } = this;


        return (
            <div className="slider-wrapper" >
                <ul className={cx("slider-container")} style={{ ...styles }}>
                    {React.Children.map(this.props.children, (child, index) => {
                        let $styles: IStyles = {};
                        if (index === prev && sliding) {
                            $styles.transform = `translateX(${direction === Direction.left ? "" : "-"}100%)`;
                            $styles.transition = `transform 0.5s`;
                            $styles.opacity = 1;
                        }
                        else if (index === current && sliding) {
                            $styles.transform = `translateX(${direction === Direction.left ? "" : "-"}100%)`;
                            $styles[direction] = -styles.width
                            $styles.transition = `transform 0.5s`;
                        }
                        return (
                            <li
                                key={index}
                                className={cx("item", { active: index === current })}
                                style={{ ...styles, ...$styles }} onTransitionEnd={() => {
                                    if (index === current) {
                                        this.setState({ sliding: false }, () => {
                                            this.props.onSildeEnd && this.props.onSildeEnd(index);
                                        });
                                    }
                                }}>
                                {React.cloneElement(child as ReactElement<any>, {
                                    ...styles
                                })}
                            </li>
                        )
                    })}
                </ul>
                <div className="slider-dot-wrapper" style={{ width: styles.width }}>
                    {React.Children.map(this.props.children, (child, index) => {
                        return <div className={cx("dot", { active: current === index })} onClick={() => this.goto(index)}></div>
                    })}
                </div>
                {arrow && <div className="arrow-wrapper" style={{ width: styles.width, top: `calc(50% - ${arrow.size / 2}px)` }}>
                    <div className="left-arrow" style={{ width: arrow.size, height: arrow.size }} onClick={this.prev}>
                        <LeftArrow width={arrow.size} height={arrow.size} scale={3} />
                    </div>
                    <div className="right-arrow" style={{ width: arrow.size, height: arrow.size }} onClick={this.next}>
                        <RightArrow width={arrow.size} height={arrow.size} scale={3} />
                    </div>
                </div>}

            </div>
        )
    }
}