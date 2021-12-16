import axios from '../../../axiosConfig';

export function requestLogUser({ email, password }) {
    return axios.post('/users/auth',{email, password})
        .then(res => res.data)
}

export function requestCheckUser() {
    return axios.get('/users/check').then(res => res.data)
}

export function requestLogOut() {
    return axios.post('/users/logout')
}