import React, { Component } from 'react';

export interface AntProps {
    name: string,
    company: string
}

export default class Ant extends Component<AntProps, {}> {
    render() {
        return (
            <h1>
                Hi, I am {this.props.name}, I in {this.props.company} now! This is a Typescript and React sample.
            </h1>
        )
    }
}