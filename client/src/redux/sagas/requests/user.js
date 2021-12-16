import axios from 'axios';

export function requestLogUser({ email, password }) {
    return axios.post(
        `http://localhost:5000/users/auth`,
        {email, password}
    ).then(res => res.data)
}

export function requestCheckUser() {
    return axios.get(
        `http://localhost:5000/users/check`,
        { withCredentials: true }
    ).then(res => res.data)
}

export function requestLogOut() {
    return axios.post(
        `http://localhost:5000/users/logout`,
        { withCredentials: true }
    )
}