import React, { Component } from "react";


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
        fetch("api/record/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                balance: this.state.balance,
                record_type: this.state.type_id
            })
        }).then(response => {
            if (response.status === 201) {
                return response.json();
            }
        })
        .then(data => {
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
                <label>
                    Record Type:
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
                    Name:
                    <input name="name"
                           type="text"
                           value={ this.state.name }
                           onChange={ this.handleChange }
                           required />
                </label>
                <label>
                    Balance:
                    <input name="balance"
                           type="number"
                           value={ this.state.balance }
                           onChange={ this.handleChange }
                           required />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    };
};

export default InputForm;
