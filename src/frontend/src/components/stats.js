import React, { Component } from "react";


class Stats extends Component {
    render () {
        return (
            <div>
                <p><strong>Total Assets:</strong> { this.props.asset_total }</p>
                <p><strong>Total Liabilities:</strong> { this.props.liability_total }</p>
                <p><strong>Net Worth:</strong> { this.props.net_worth }</p>
            </div>
        );
    };
};

export default Stats;
