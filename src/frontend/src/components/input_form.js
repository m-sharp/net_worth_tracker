import React, { Component } from "react";

import { post_record } from "../services/record_service";

const default_id = 0

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.default_type_id = default_id;
        this.state = {
            name: "",
            balance: 0,
            type_id: this.default_type_id
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        this.setState(() => {
            return {
                [event.target.name]: event.target.value
            }
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        post_record(this.state.name, this.state.balance, this.state.type_id).then(data => {
            this.props.create_handler(data);
            this.setState(() => {
                return {
                    name: "",
                    balance: 0,
                    type_id: this.default_type_id
                }
            });
        });
    };

    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <div className="horizontal-layout">
                    <label>
                        <strong>Record Type:&nbsp;</strong>
                        <select name="type_id" value={ this.state.type_id } onChange={ this.handleChange } required>
                            <option key={ this.default_type_id } value=''></option>
                            <option key={ this.props.record_types.asset.id }
                                    value={ this.props.record_types.asset.id }>
                                { this.props.record_types.asset.name }
                            </option>
                            <option key={ this.props.record_types.liability.id }
                                    value={ this.props.record_types.liability.id }>
                                { this.props.record_types.liability.name }
                            </option>
                        </select>
                    </label>
                    <label>
                        <strong>Name:&nbsp;</strong>
                        <input name="name"
                               type="text"
                               value={ this.state.name }
                               onChange={ this.handleChange }
                               required />
                    </label>
                    <label>
                        <strong>Balance:&nbsp;</strong>
                        <input name="balance"
                               type="number"
                               className="balance-input"
                               value={ this.state.balance }
                               onChange={ this.handleChange }
                               required />
                    </label>
                    <input type="submit" value="Add Record" />
                </div>
            </form>
        );
    };
};

export default InputForm;
