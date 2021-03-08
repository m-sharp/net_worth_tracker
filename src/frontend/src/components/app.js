import React, { Component } from "react";
import { render } from "react-dom";

import BalanceSheet from "./balance_sheet";
import Stats from "./stats";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            meta: {},
            loaded: false,
            status: "Loading...",
        };
    };

    componentDidMount() {
        fetch("api/record/get_all/")
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return { status: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data => {
                this.setState(() => {
                    return {
                        records: data.data,
                        meta: data.meta,
                        loaded: true
                    }
                });
            });
    };

    render() {
        return (
            <div>
                { !this.state.loaded &&
                    <h4>{ this.state.status }</h4>
                }
                { this.state.loaded &&
                    <div>
                        <BalanceSheet records={ this.state.records } />
                        <Stats asset_total={ this.state.meta.asset_total}
                               liability_total={ this.state.meta.liability_total}
                               net_worth={ this.state.meta.net_worth } />
                    </div>
                }
            </div>
        );
    };
};

export default App;

const root = document.getElementById("app");
render(<App />, root);
