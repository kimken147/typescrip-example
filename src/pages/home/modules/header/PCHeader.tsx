import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import cx from "classnames";

import { StoreState, ActionCreators, CategoryList, CategoryIdType } from "pages/lineTodayRedux";
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
interface StateProps {
    categoryId: CategoryIdType;
    list: CategoryList
}

interface State {
    visibleList: Array<ICategoryListItem>,
    more: Array<ICategoryListItem>,
}

type Props = typeof ActionCreators & StateProps;

class Header extends Component<Props, State> {

    state = {
        visibleList: this.props.list.slice(0, 9),
        more: this.props.list.slice(9),
    };

    render() {
        const {
            state: {
                visibleList,
                more
            },
            props: {
                categoryId
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
            current: more.findIndex(item => item.id === categoryId),
            onChange: $item => {
                const item = $item as IItem;
                this.props.setCategoryId(item.id);
            }
        };

        return (
            <header className="top-header">
                <nav>
                    <ul className="nav-list">
                        <li className="logo">
                            <a>Line Today</a>
                        </li>
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

const mapStateToProps = (state: StoreState): StateProps => {
    return {
        categoryId: state.category.id,
        list: state.categoryList
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {    
    return bindActionCreators(ActionCreators, dispatch);
};

export default connect<StateProps, typeof ActionCreators, {}, StoreState>(mapStateToProps, mapDispatchToProps)(Header)