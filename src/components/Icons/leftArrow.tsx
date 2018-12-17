import React from 'react';

interface IProps {
    width: number;
    height: number;
    scale?: number
}

const LeftArrow = (props: IProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox={`0 0 ${props.width / (props.scale ? props.scale : 2)} ${props.height / (props.scale ? props.scale : 2)}`}>
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </svg>
    )
}

LeftArrow.defaultProps = {
    scale: 2
}

export { LeftArrow }
export default LeftArrow