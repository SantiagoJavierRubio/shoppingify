import axios from '../../../axiosConfig';

export function requestGetLists() {
    return axios.get('/lists')
        .then(res => res.data)
}

export function requestGetListDetail(id) {
    return axios.get('/lists/info', { params: {id} })
        .then(res => res.data)
}

export function requestCreateList(data) {
    return axios.post('/lists/create', data)
}

export function requestDeleteList(id) {
    return axios.post('/lists/delete', {id: id})
}