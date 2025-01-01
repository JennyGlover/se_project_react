const baseUrl = 'http://localhost:3002';

export function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export function request(url, options) {
    return fetch(url, options).then(checkResponse);
}


function getItems() {
    return request(`${baseUrl}/items`);
}

function postItem(token, item) {
    return request(`${baseUrl}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item)
    });
}

function deleteItem(token, id) {
    return request(`${baseUrl}/items/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

        }
    });
}


export { getItems, postItem, deleteItem };