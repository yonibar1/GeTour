// import axios from 'axios';
import { storageService } from './async-storage.service.js';
// import { httpService } from './http.service.js';
import { utilService } from './util.service.js';

// const KEY = 'toursDB';
const TOURS_KEY = 'tours';
// const TOURS_URL = 'tours/';

export const tourService = {
    query,
    getById,
    remove,
    save,
    getEmptyTour,
    // saveUser,
    // queryAllByType,
};
_createTours();
function query() {
    // filterBy = {}, pageIdx = 0 - as a paramater
    // const params = {
    //     filterBy,
    //     pageIdx,
    // };
    // return httpService.get(TOUR_URL, params);

    var tours = JSON.parse(localStorage.getItem(TOURS_KEY));
    console.log('tours:', tours);
    return tours;
}

// function queryAllByType(type) {
//     console.log('type:', type);
//     if (!type) {
//         return httpService.get(TOUR_URL);
//     }
// }

function getById(id) {
    // console.log('id:', id);
    // return httpService.get(TOUR_URL + id);
    return storageService.get(TOURS_KEY, id);
}

function remove(_id) {
    // return httpService.delete(TOUR_URL + _id);
    return storageService.remove(TOURS_KEY, _id);
}

function save(tour) {
    if (tour._id) {
        // return httpService.put(TOUR_URL + tour._id, tour);
        return storageService.put(TOURS_KEY, tour);
    } else {
        // return httpService.post(TOUR_URL, tour);
        return storageService.post(TOURS_KEY, tour);
    }
}

// function saveUser(user) {
//     const savedUser = user._id ? _update(user) : _add(user);
//     storageService.store('USER', user);
//     return savedUser;
// }

function getEmptyTour(title, price) {
    return {
        title,
        price,
        startedAt: Date.now(),
        capacity: utilService.getRandomInt(1, 20),
        members: utilService.getRandomInt(1, 20),
        daysCount: utilService.getRandomInt(1, 5),
        difficulty: utilService.getRandomInt(1, 5),
        rate: utilService.getRandomInt(1, 5),
        msgs: [],
        locs: [],
        imgs: [],
        tags: [],
        description: 'lorem ipsum dolor sit amet, consectetur adipis',
        byUser: {},
        reviews: [],
    };
}

function _createTours() {
    var tours = JSON.parse(localStorage.getItem(TOURS_KEY));
    if (!tours || !tours.length) {
        tours = [
            _createTour('Parisian Nights', 300),
            _createTour('Lovely Amsterdam', 500),
            _createTour('Barcelona For Couples', 700),
            _createTour('New York Street\'s', 350),
            _createTour('Merom Golan Valleys', 20),
            _createTour('Budapest Eye', 240),
            _createTour('Koh Samui Beaches', 700),
            _createTour('Rio Carnivals', 150),
            _createTour('The Taste Of Rome', 700),
            _createTour('Prague Views', 300),
            _createTour('The Western Wall', 80),
            _createTour('Through The Jungle', 1000),
        ];
        localStorage.setItem(TOURS_KEY, JSON.stringify(tours));
    }
    return tours;
}

function _createTour(title, price) {
    const tour = getEmptyTour(title, price);
    tour._id = utilService.makeId();
    return tour;
}
