// import axios from 'axios';
import { storageService } from './async-storage.service.js';
// import { httpService } from './http.service.js';
import { utilService } from './util.service.js';

// const KEY = 'toursDB';
const TOURS_KEY = 'tours';
// const TOURS_URL = 'tours/';
// const STAR = '⭐';
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
function query(filterBy = {}) {
    var tours = JSON.parse(localStorage.getItem(TOURS_KEY));
    var toursCopy = JSON.parse(JSON.stringify(tours));
    if (filterBy.byPriceRange) {
        toursCopy = toursCopy.filter((tour) => {
            return (
                tour.price > filterBy.byPriceRange.min &&
                tour.price < filterBy.byPriceRange.max
            );
        });
    }

    if (filterBy.byDestination) {
        toursCopy = toursCopy.filter((tour) => {
            return tour.country
                .toLowerCase()
                .includes(filterBy.byDestination.toLowerCase());
        });
    }
    return toursCopy;
}

// function queryAllByType(type) {
//     if (!type) {
//         return httpService.get(TOUR_URL);
//     }
// }

function getById(id) {
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

function getEmptyTour(title, price, country) {
    return {
        title,
        country,
        price,
        startedAt: Date.now(),
        capacity: utilService.getRandomInt(1, 20),
        members: utilService.getRandomInt(1, 20),
        daysCount: utilService.getRandomInt(1, 5),
        difficulty: utilService.getRandomInt(1, 5),
        rate: utilService.getRandomInt(1, 5) ,
        msgs: [],
        locs: [],
        imgs: [
            // { url: '../assets/img/hero.jpg' },
            // { url: '../assets/img/hero2.jpg' },
            // { url: '../assets/img/hero.jpg' },
        ],
        tags: ['Water Trail', 'For Children'],
        description:
            'Get in the mood with a visit to Barcelona’s naughtiest attraction. The Erotic Museum holds 800+ pieces to lust over. It will take you on an erotic journey  from ancient societies to pinup culture. Enjoy a passionate adventure with your other half and take a look at eroticism’s historical influence of humankind through the past. And who knows, perhaps you’ll get some ideas for the not so distant future. ',
        byUser: {},
        reviews: [
            _createReview('nice one'),
            _createReview('one of the worst'),
            _createReview('ahla bahla'),
        ],
    };
}

function getEmptyReview(txt, rate = 3) {
    return {
        txt,
        createdAt: Date.now(),
        rate,
        byUser: {
            fullname: 'koko me eilat',
            _id: utilService.makeId(),
            avatar: 'avatar.jpg',
        },
    };
}

function _createTours() {
    var tours = JSON.parse(localStorage.getItem(TOURS_KEY));
    if (!tours || !tours.length) {
        tours = [
            _createTour('Parisian Nights', 300, 'France'),
            _createTour('Lovely Amsterdam', 500, 'Netherlands'),
            _createTour('Barcelona For Couples', 700, 'Spain'),
            _createTour("New York Street's", 350, 'USA'),
            _createTour('Merom Golan Valleys', 20, 'Israel'),
            _createTour('Budapest Eye', 240, 'Hungary'),
            _createTour('Koh Samui Beaches', 700, 'Thailand'),
            _createTour('Rio Carnivals', 150, 'Brazil'),
            _createTour('The Taste Of Rome', 700, 'Italy'),
            _createTour('Prague Views', 300, 'Czech Republic'),
            _createTour('The Western Wall', 80, 'Israel'),
            _createTour('Through The Jungle', 1000, 'Thailand'),
        ];
        localStorage.setItem(TOURS_KEY, JSON.stringify(tours));
    }
    return tours;
}

function _createTour(title, price, country) {
    const tour = getEmptyTour(title, price, country);
    tour._id = utilService.makeId();
    return tour;
}

function _createReview(txt, rate) {
    const review = getEmptyReview(txt, rate);
    review.id = utilService.makeId();
    return review;
}
