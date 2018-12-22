import React from 'react';
import { Subtract } from "utility-types";
import Throttle from "utils/throttle";

interface InjectedProps {
    isMobile: boolean
}

export default <WrappedProps extends InjectedProps>(
    WrappedComponent: React.ComponentType<InjectedProps>
) => {
    type HocProps = Subtract<WrappedProps, InjectedProps>;
    type HocState = {
        readonly isMobile: boolean;
    }
    return class DetectMobile extends React.Component<HocProps, HocState> {
        state: HocState = {
            isMobile: window.innerWidth <= 1024
        };

        componentDidMount() {
            window.addEventListener("resize", Throttle((e: UIEvent) => {
                if (window.innerWidth <= 1024) {
                    this.setState({ isMobile: true });
                }
                else {
                    this.setState({ isMobile: false})
                }
            }, 100));
        }

        render() {
            const { ...restProps } = this.props as {};
            const { isMobile } = this.state;
            return <WrappedComponent {...restProps} isMobile={isMobile} />
        }
    }
}