import { request } from "./api";

const baseUrl = 'http://localhost:3002';

export function signup(email, password, name, avatar) {
    return request(`${baseUrl}/signup`, {
        method: "POST",
        headers: {
            "Content-Typer": "application/json",
        },
        body: JSON.stringify(email, password, name, avatar)
    });
}

export function signin(email, password) {
    return request(`${baseUrl}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(email, password)
    });
}

export function getUserInfo(token) {
    return request(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

            //Specify an authorization header with an appropriately
            //formated value.
            Authorization: `Bearer ${token}`,
        }
    });
}