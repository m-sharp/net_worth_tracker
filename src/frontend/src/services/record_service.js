// TODO: This doesn't work for all cases but will do for now...
function handleResponse(response) {
    if (response.status >= 400) {
        return this.setState(() => {
            return {
                status: "Something went wrong!",
                loaded_records: false
            };
        });
    }
    return response.json();
};


export const delete_record = (id) => {
    let endpoint = "api/record/" + id + "/";
    return fetch(endpoint, {
        method: "DELETE"
    });
};


export const get_all_records = () => {
    return fetch("api/record/get_all/").then(response => {
        return handleResponse(response);
    });
};


export const get_calculations = () => {
    return fetch("api/record/get_meta/").then(response => {
        return handleResponse(response);
    });
};


export const get_record_types = () => {
    return fetch("api/record_type/").then(response => {
        return handleResponse(response);
    });
};


export const post_record = (name, balance, type_id) => {
    return fetch("api/record/", {
        method: "POST",
        headers: {
           "Content-Type": "application/json",
           "Accept": "application/json"
        },
        body: JSON.stringify({
           name: name,
           balance: balance,
           record_type: type_id
        })
    }).then(response => {
        return handleResponse(response);
    });
};
