import React from 'react';
import { Subtract } from "utility-types";
import Throttle from "utils/throttle";

interface InjectedProps {
    windowWidth: number
}

export default <WrappedProps extends InjectedProps>(
    WrappedComponent: React.ComponentType<InjectedProps>
) => {
    type HocProps = Subtract<WrappedProps, InjectedProps>;
    type HocState = {
        readonly width: number;
    }
    return class DetectMobile extends React.Component<HocProps, HocState> {
        state: HocState = {
            width: window.innerWidth
        };

        componentDidMount() {
            window.addEventListener("resize", this.onResize);
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.onResize);
        }

        onResize = Throttle(() => {
            this.setState({ width: window.innerWidth });
        }, 100)

        render() {
            const { ...restProps } = this.props as {};
            const { width } = this.state;
            return <WrappedComponent {...restProps} windowWidth={width} />
        }
    }
}