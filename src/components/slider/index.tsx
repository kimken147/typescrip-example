import React, { PureComponent, ReactElement } from 'react'
import cx from "classnames";

enum Direction {
    Left = "Left",
    Right = "Right"
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
    onSildeEnd: (index: number) => void;
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
        direction: Direction.Left,
        prev: 0,
        interval: undefined
    }

    static defaultProps = {
        styles: {
            width: 712,
            heigth: 400
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
        this.setState({ prev: current, current: $next, sliding: true, direction: Direction.Right });
    }

    prev = () => {
        const {
            props: { children },
            state: { current, sliding }
        } = this;
        if (sliding) return;
        const length = React.Children.count(children);
        const $prev = current === 0 ? length - 1 : current - 1;
        this.setState({ prev: current, current: $prev, sliding: true, direction: Direction.Left });
    }

    goto(index: number) {
        const {
            state: { current, sliding }
        } = this;
        if (sliding) return;
        if (index === current) return;
        const direction = index > current ? Direction.Right : Direction.Left;
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
                            $styles.transform = `translateX(${direction === Direction.Left ? "" : "-"}100%)`;
                            $styles.transition = `transform 0.5s`;
                            $styles.opacity = 1;
                        }
                        else if (index === current && sliding) {
                            $styles.transform = `translateX(${direction === Direction.Left ? "" : "-"}100%)`;
                            $styles[direction] = -styles.width
                            $styles.transition = `transform 0.5s`;
                        }
                        return (
                            <li
                                className={cx("item", { active: index === current })}
                                style={{ ...styles, ...$styles }} onTransitionEnd={() => {
                                    if (index === current) {
                                        this.setState({ sliding: false }, () => this.props.onSildeEnd(index));
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
                        <svg xmlns="http://www.w3.org/2000/svg" width={arrow.size} height={arrow.size} viewBox={`0 0 ${arrow.size / 3} ${arrow.size / 3}`}>
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                            <path d="M0 0h24v24H0z" fill="none" />
                        </svg>
                    </div>
                    <div className="right-arrow" style={{ width: arrow.size, height: arrow.size }} onClick={this.next}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: arrow.size, height: arrow.size }} viewBox={`0 0 ${arrow.size / 3} ${arrow.size / 3}`}>
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                            <path d="M0 0h24v24H0z" fill="none" />
                        </svg>
                    </div>
                </div>}

            </div>
        )
    }
}