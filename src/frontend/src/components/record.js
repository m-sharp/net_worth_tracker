import React, { Component } from "react";


class Record extends Component {
    render () {
        return (
            <li>{ this.props.record.name } - { this.props.record.balance }</li>
        );
    };
};

export default Record;
