import { request } from "./api";

const baseUrl = 'http://localhost:3002';

export function signup(user) {
    return request(`${baseUrl}/signup`, {
        method: "POST",
        headers: {
            "Content-Typer": "application/json",
        },
        body: JSON.stringify(user)
    });
}

export function signin(user) {
    return request(`${baseUrl}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    });
}