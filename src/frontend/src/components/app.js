import React, { Component } from "react";
import { render } from "react-dom";

import BalanceSheet from "./balance_sheet";
import InputForm from "./input_form";
import Stats from "./stats";


function handleResponse(response) {
    if (response.status >= 400) {
        return this.setState(() => {
            return { status: "Something went wrong!" };
        });
    }
    return response.json();
};


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            meta: {},
            record_types: {},
            loaded_records: false,
            loaded_record_types: false,
            status: "Loading...",
        };
        this.add_record = this.add_record.bind(this);
    };

    componentDidMount() {
        fetch("api/record_type/")
            .then(response => {
                return handleResponse(response);
            })
            .then(data => {
                let asset = data.filter(function(record_type) { return record_type.name === "Asset" });
                let liability = data.filter(function(record_type) { return record_type.name === "Liability" });
                this.setState(() => {
                    return {
                        record_types: {
                            asset: asset[0],
                            liability: liability[0]
                        },
                        loaded_record_types: true
                    }
                });
            });
        fetch("api/record/get_all/")
            .then(response => {
                return handleResponse(response);
            })
            .then(data => {
                this.setState(() => {
                    return {
                        records: data.data,
                        meta: data.meta,
                        loaded_records: true
                    }
                });
            });
    };

    // ToDo: Need to update meta calculations as well
    add_record(record)
        let records_ = this.state.records;
        records_.push(record);
        this.setState(() => {
            return {
                records: records_
            }
        });
    };

    render() {
        if (!this.state.loaded_record_types || !this.state.loaded_records) {
            return <div />
        }
        return (
            <div>
                <div>
                    <BalanceSheet records={ this.state.records } />
                    <InputForm record_types={ this.state.record_types }
                               create_handler={ this.add_record } />
                    <Stats asset_total={ this.state.meta.asset_total}
                           liability_total={ this.state.meta.liability_total}
                           net_worth={ this.state.meta.net_worth } />
                </div>
            </div>
        );
    };
};

export default App;

const root = document.getElementById("app");
render(<App />, root);
