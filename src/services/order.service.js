import { httpService } from './http.service.js';

const ORDER_KEY = 'orders';
const ORDER_URL = 'order/';
export const orderService = {
    query,
    getById,
    remove,
    save,
    getOrdersByGuide
};

async function getOrdersByGuide(guideId) {
    const orders = await httpService.get(ORDER_URL);
    console.log(orders, 'Orders');
    const ordersByGuide = orders.filter(order => {
        return order.tour._guideId === guideId
    })
    return ordersByGuide
}

function query(toursIds) {
    return httpService.get(ORDER_URL);
}

function getById(id) {
    return httpService.get(ORDER_URL + id);
}

function remove(_id) {
    return httpService.delete(ORDER_URL + _id);
}

function save(order) {
    try {
        if (order._id) {
            return httpService.put(ORDER_URL, order)
        } else {
            order.createdAt = Date.now()
            order.status = 'pending'
            if (sessionStorage.getItem('login')) {
                let { _id, fullname, imgUrl } = JSON.parse(sessionStorage.getItem('login'))
                order.buyer = { _id, fullname, imgUrl }
            }
            return httpService.post(ORDER_URL, order);
        }
    } catch (err) {
        console.log('Cannot save order', err);
    }
}