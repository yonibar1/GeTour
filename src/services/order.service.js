import { httpService } from './http.service.js';

const ORDER_KEY = 'orders';
const ORDER_URL = 'order/';
export const orderService = {
    query,
    getById,
    remove,
    save,
    getOrdersByUser
};

async function getOrdersByUser(userId) {
    const orders = await httpService.get(ORDER_URL);
    const ordersByUser = orders.filter((order) => {
        return order.buyer._id === userId
    })
    return ordersByUser
}

function query(filterBy = {}) {
    var orders = JSON.parse(localStorage.getItem(ORDER_KEY));
    var ordersCopy = JSON.parse(JSON.stringify(orders));
    if (filterBy.byPriceRange) {
        ordersCopy = ordersCopy.filter((order) => {
            return (
                order.price > filterBy.byPriceRange.min &&
                order.price < filterBy.byPriceRange.max
            );
        });
    }
    if (filterBy.byDestination) {
        ordersCopy = ordersCopy.filter((order) => {
            return order.country
                .toLowerCase()
                .includes(filterBy.byDestination.toLowerCase());
        });
    }
    return ordersCopy;
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