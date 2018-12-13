import React, { SyntheticEvent, ReactNode } from 'react'
import cx from "classnames";

interface IProps {
    className?: string;
    onClick?: (e: SyntheticEvent) => void;
    children?: ReactNode,
    [propName: string]: any
}

const Button = (props: IProps) => {
    return <button
        {...props}
        className={cx(props.className, "btn")}
        onClick={props.onClick}
    >
        {props.children}
    </button>
}

Button.defaultProps = {
    onClick: () => { }
}

export default Button