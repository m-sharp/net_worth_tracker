import React, { Component } from "react";

import { delete_record } from "../services/record_service";


class Record extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick(event) {
        event.preventDefault();
        delete_record(this.props.id).then(data => {
            this.props.delete_handler(this.props.id);
        });
    };

    render () {
        return (
            <span>
                <li>{ this.props.record.name } - { this.props.record.balance }</li>
                <button onClick={ this.handleClick }>Delete</button>
            </span>
        );
    };
};

export default Record;
