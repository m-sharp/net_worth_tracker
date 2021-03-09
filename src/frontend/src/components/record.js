import React, { Component } from "react";

import { delete_record } from "../services/record_service";
import { usd_format } from "../services/utils";


class Record extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.get_record_type = this.get_record_type.bind(this);
    };

    handleClick(event) {
        event.preventDefault();
        delete_record(this.props.id).then(data => {
            this.props.delete_handler(this.props.id);
        });
    };

    get_record_type() {
        return this.props.record.record_type == this.props.record_types.asset.id ? "asset" : "liability";
    };

    render () {
        return (
            <React.Fragment>
                <td>{ this.props.record.name }</td>
                <td className={ this.get_record_type() }>
                    <strong>{ usd_format(this.props.record.balance) }</strong>
                </td>
                <td className="delete-column"><button onClick={ this.handleClick }>Delete</button></td>
            </React.Fragment>
        );
    };
};

export default Record;
