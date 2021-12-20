import axios from '../../../axiosConfig';

export function requestGetProducts() {
    return axios.get('/products')
        .then(res => res.data)
}

export function requestCreateProduct(product) {
    return axios.post('/products/create', product)
}

export function requestDeleteProduct(id) {
    return axios.post('/products/delete', {id: id})
}
