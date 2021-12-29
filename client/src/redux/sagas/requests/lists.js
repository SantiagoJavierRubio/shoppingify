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
    try{
        axios.post('/lists/delete-active');
        return axios.post('/lists/create', data)
    } catch(err){
        console.log(err);
    }
}

export function requestDeleteList(id) {
    return axios.post('/lists/delete', {id: id})
}

export function requestGetActiveList() {
    return axios.get('/lists/active')
        .then(res => res.data);
}