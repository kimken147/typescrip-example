import React from 'react';

interface IProps {
    width: number;
    height: number;
    scale?: number
}

const RightArrow = (props: IProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox={`0 0 ${props.width / (props.scale ? props.scale : 2)} ${props.height / (props.scale ? props.scale : 2)}`}>
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </svg>
    )
}

RightArrow.defaultProps = {
    scale: 2
}

export { RightArrow }
export default RightArrow