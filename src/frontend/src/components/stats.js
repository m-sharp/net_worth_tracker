import React, { Component } from "react";

import { usd_format } from "../services/utils";

class Stats extends Component {
    render () {
        return (
            <div className="stats horizontal-layout">
                <p>
                    <strong>Total Assets:&nbsp;</strong>
                    <strong className="asset">{ usd_format(this.props.asset_total) }</strong>
                </p>
                <p>
                    <strong>Total Liabilities:&nbsp;</strong>
                    <strong className="liability">{ usd_format(this.props.liability_total) }</strong>
                </p>
                <p>
                    <strong>Net Worth:&nbsp;</strong>
                    <strong className={ this.props.net_worth >= 0 ? "asset" : "liability" }>
                        { usd_format(this.props.net_worth) }
                    </strong>
                </p>
            </div>
        );
    };
};

export default Stats;
