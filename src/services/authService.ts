import api from "../api/api";

export const register = (username: string, password: string) => {
    return api.post('/auth/register', {username, password});
}

export const login = (username: string, password: string) => {
    return api.post('/auth/login', {username, password})
        .then(response => {
            localStorage.setItem('token', response.data.token)
            return response.data
        });
}

export const logout = () => {
    localStorage.removeItem('token')
}