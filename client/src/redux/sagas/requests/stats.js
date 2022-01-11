import axios from '../../../axiosConfig';

export function requestGetStats() {
    return axios.get('/stats').then(res => res.data)
}