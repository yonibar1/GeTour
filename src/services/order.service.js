// import axios from 'axios';
import { storageService } from './async-storage.service.js';
import { httpService } from './http.service.js';
// import { utilService } from './util.service.js';

const ORDER_KEY = 'orders';
const ORDER_URL = 'order/';
export const orderService = {
    query,
    getById,
    remove,
    save,
    getEmptyOrder,
    getOrdersByUser
    // saveUser,
    // queryAllByType,
};

async function getOrdersByUser(userId) {
    console.log('userId:', userId)
    const orders = await httpService.get(ORDER_URL);
    console.log('orders:', orders)
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
    // return httpService.get(ORDER_URL + id);
    return storageService.get(ORDER_KEY, id);
}

function remove(_id) {
    // return httpService.delete(ORDER_URL + _id);
    return storageService.remove(ORDER_KEY, _id);
}

function save(order) {
    if (order._id) {
        // return httpService.put(ORDER_URL + order._id, order);
        return storageService.put(ORDER_KEY, order);
    } else {
        // Gonna Change Soon
        order.createdAt = Date.now()
        order.requests = ''
        order.status = 'pending'
        order.byUser = {
            _id: 'mongodbID',
            fullname: 'muki puki',
            imgUrl: 'someurl.jpg',
        }
        // Gonna Change Soon

        // return httpService.post(ORDER_URL, order);
        return storageService.post(ORDER_KEY, order);
    }
}

function getEmptyOrder() {

}

// const orders = [
//     {
//         _id: utilService.makeId(),
//         createdAt: Date.now(),
//         guestsCount: 2,
//         totalPrice: 300, //should be the number of participants * tour price//
//         status: 'pending',
//         byUser:
//         {
//             _id: 'mongodbID',
//             fullname: 'muki puki',
//             imgUrl: 'someurl.jpg',
//         },
//         tour: {
//             _id: 09320320,
//             title: 'tourtitle',
//             imgUrl: './img.jpg'
//         }
//     },
// ]
