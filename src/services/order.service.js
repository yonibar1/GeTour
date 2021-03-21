// import axios from 'axios';
import { storageService } from './async-storage.service.js';
// import { httpService } from './http.service.js';
import { utilService } from './util.service.js';

const ORDER_KEY = 'orders';
const ORDER_URL = 'api/order';
export const orderService = {
    query,
    getById,
    remove,
    save,
    getEmptyOrder,
    // saveUser,
    // queryAllByType,
};
function query(filterBy = {}) {
    var orders = JSON.parse(localStorage.getItem(ORDER_KEY));
    var ordersCopy = JSON.parse(JSON.stringify(orders));
    if (filterBy.byPriceRange) {
        console.log('inside Price If');
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
        // return httpService.post(ORDER_URL, order);
        return storageService.post(ORDER_KEY, order);
    }
}

function getEmptyOrder() {

}

const orders = [
    {
        _id: utilService.makeId(),
        createdAt: Date.now(),
        guestsCount: 2,
        totalPrice: 300, //should be the number of participants * tour price//
        status: 'pending',
        buyer:
        {
            _id: 'mongodbID',
            fullname: 'muki puki',
            imgUrl: 'someurl.jpg',
        },
        tour: {
            _id: 09320320,
            title: 'tourtitle',
            imgUrl: './img.jpg'
        }
    },
]
