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
export function requestGetActiveList() {
    return axios.get('/lists/active')
        .then(res => res.data);
}
export function requestSetCheckedItem({id, status}) {
    return axios.post('/lists/check-item', {id: id, status: status})
}
export function requestSetCompletedList() {
    return axios.post('/lists/complete')
}
export function requestSetCancelledList() {
    return axios.post('/lists/cancel')
}