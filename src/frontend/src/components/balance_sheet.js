import React, { Component } from "react";

import Record from "./record";


class BalanceSheet extends Component {
    render () {
        return (
            <div>
                <h4>Balance Sheet</h4>
                <ul>
                    { this.props.records.map(record => {
                        return (
                            <Record record={ record } key={ record.id } />
                        );
                    })}
                </ul>
            </div>
        );
    };
};

export default BalanceSheet;
