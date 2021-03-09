import React, { Component } from "react";

import Record from "./record";


class BalanceSheet extends Component {
    render () {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Balance</th>
                        <th className="delete-column">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.props.records.map(record => {
                        return (
                            <tr key={ record.id }>
                                <Record record={ record }
                                        id={ record.id }
                                        delete_handler={ this.props.delete_handler }
                                        record_types={ this.props.record_types } />
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };
};

export default BalanceSheet;
