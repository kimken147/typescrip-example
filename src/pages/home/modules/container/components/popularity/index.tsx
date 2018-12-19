import React, { PureComponent } from 'react';

interface IProps {
    activeId: number
}

interface IState extends IProps {
    prevId: number
}

export default class Popularity extends PureComponent<IProps, IState> {

    state = {
        activeId: this.props.activeId,
        prevId: this.props.activeId
    }

    static getDerivedStateFromProps(props: IProps, state: IState) {
        if (props.activeId !== state.prevId) {
            return {
                activeId: props.activeId,
                prevId: props.activeId
            };
        }
        return null;
    }
    render() {
        return (
            <div className="popularity-container">
                ppppppp
            </div>
        )
    }
}