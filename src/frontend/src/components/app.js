import React, { Component } from "react";
import { render } from "react-dom";

import BalanceSheet from "./balance_sheet";
import InputForm from "./input_form";
import Stats from "./stats";
import { get_all_records, get_calculations, get_record_types } from "../services/record_service";


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
        get_record_types().then(data => {
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
        get_all_records().then(data => {
            this.setState(() => {
                return {
                    records: data.data,
                    meta: data.meta,
                    loaded_records: true
                }
            });
        });
    };


    add_record(record) {
        let records_ = this.state.records;
        records_.push(record);
        this.setState(() => {
            return {
                records: records_
            }
        });
        get_calculations().then(data => {
            this.setState(() => {
                return {
                    meta: data
                }
            });
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
