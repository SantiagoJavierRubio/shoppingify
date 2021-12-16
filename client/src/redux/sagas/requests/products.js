import axios from '../../../axiosConfig';

export function requestGetProducts() {
    return axios.post('/products')
        .then(res => res.data)
}
