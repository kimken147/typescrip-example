import React, { Component, DragEvent, MouseEvent, SyntheticEvent, TouchEvent, ReactNode } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import cx from "classnames";

import { StoreState, ActionCreators, CategoryList, CategoryIdType } from "pages/lineTodayRedux";

export interface ICategoryListItem {
    id: number,
    name: string,
    type: number,
    highlight?: {
        enable: boolean
    } | undefined
}
interface StateProps {
    categoryId: CategoryIdType;
    list: CategoryList,
}

interface State {
    visibleList: Array<ICategoryListItem>,
    currentX: number,
    coordinateX: number,
    distance: number,
    duration: number,
}

type Props = typeof ActionCreators & StateProps;

class MobileHeader extends Component<Props, State> {

    navWidth = 0;
    navDOM = React.createRef<HTMLUListElement>();

    state = {
        visibleList: this.props.list,
        coordinateX: 0,
        distance: 0,
        currentX: 0,
        duration: 0
    };

    componentDidMount() {
        const target = this.navDOM.current as HTMLElement;
        this.navWidth = target.scrollWidth - target.clientWidth;
    }

    onTouchStart = (e: TouchEvent) => {
        this.setState({
            coordinateX: e.touches[0].clientX,
        });
    }

    onTouchMove = (e: TouchEvent) => {
        const { clientX } = e.touches[0];
        this.setState(({ coordinateX }) => {
            return {
                distance: clientX - coordinateX
            }
        })
    }

    onTouchEnd = () => {
        this.setState(({ currentX: $currentX, distance }) => {
            const current = $currentX + distance;
            const isOverLeftBound = current > 0;
            const isOverRightBound = current < -this.navWidth;
            let currentX: number = current;

            if (isOverLeftBound) {
                currentX = 0;
            }
            else if (isOverRightBound) {
                currentX = -this.navWidth;
            }
            return {
                currentX,
                distance: 0,
                duration: isOverLeftBound || isOverRightBound ? 600 : 0
            }
        });
    }

    onTransitionEnd = () => {
        this.setState({
            duration: 0
        });
    }

    render() {
        const {
            state: {
                visibleList,
                distance,
                currentX,
                duration
            },
            props: {
                categoryId
            }
        } = this;

        return (
            <header className="mobile-header">
                <nav>
                    <ul className="nav-wrapper">
                        <li className="logo">
                            <a>Line Today</a>
                        </li>
                        <li
                            className="nav-items">
                            <ul className="moveable-wrapper"
                                ref={this.navDOM}
                                style={{
                                    transform: `translateX(${currentX + distance}px)`,
                                    transitionDuration: `${duration}ms`
                                }}
                                onTouchStart={this.onTouchStart}
                                onTouchMove={this.onTouchMove}
                                onTouchEnd={this.onTouchEnd}
                                onTransitionEnd={this.onTransitionEnd}>

                                {visibleList.map((category) => {
                                    return (
                                        <li key={category.id} className={cx({ active: categoryId === category.id })}>
                                            <a
                                                onClick={() => this.props.setCategoryId(category.id)}>
                                                {category.name}
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>

                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

const mapStateToProps = (state: StoreState): StateProps => {
    return {
        categoryId: state.category.id,
        list: state.categoryList
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
};

export default connect<StateProps, typeof ActionCreators, {}, StoreState>(mapStateToProps, mapDispatchToProps)(MobileHeader)