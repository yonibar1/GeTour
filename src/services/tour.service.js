// import axios from 'axios';
// import { storageService } from './async-storage.service.js';
import { httpService } from './http.service.js';

// const KEY = 'toursDB';
const TOURS_URL = 'tour/';
export const tourService = {
    query,
    getById,
    remove,
    save,
    getEmptyTour,
    queryAllByType,
    loadToursByUser
};


async function query(filterBy = {}) {
    var tours = await httpService.get(TOURS_URL);
    var toursCopy = JSON.parse(JSON.stringify(tours));
    toursCopy = toursCopy.filter((tour) => {
        return (
            tour.price > filterBy.byPriceRange.min &&
            tour.price < filterBy.byPriceRange.max
            );
        });
        if (filterBy.byDestination) {
            toursCopy = toursCopy.filter((tour) => {
                return tour.country
                .toLowerCase()
                .includes(filterBy.byDestination.toLowerCase());
            });
        }
        return toursCopy;
    }
    
    function queryAllByType(type) {
        if (!type) {
            return httpService.get(TOURS_URL);
        }
    }
    
    async function loadToursByUser(userId) {
        const tours = await httpService.get(TOURS_URL);
        const toursByUser = tours.filter((tour) => {
            console.log('tour.byUser === userId:', tour.byUser === userId)
            return tour.byUser === userId
        })
        console.log('Front - tour.service -  tours:', toursByUser)
    }
    
    function getById(id) {
        return httpService.get(TOURS_URL + id);
}

function remove(_id) {
    return httpService.delete(TOURS_URL + _id);
}

function save(tour) {
    if (tour._id) {
        return httpService.put(TOURS_URL + tour._id, tour);

    } else {
        return httpService.post(TOURS_URL, tour);

    }
}
function getEmptyTour() {
    return {
        title: '',
        country: '',
        startedAt: '',
        price: 0,
        rate: 0,
        capacity: 0,
        members: 0,
        daysCount: 0,
        difficulty: 0,
        locs: [],
        imgs: [
        ],
        tags: [],
        description: '',
        byUser: {},
        reviews: [],
    };
}
// @@@@@@@@@@@@@@@@ NEW GET EMPTY TOUR @@@@@@@@@@@

//@@@@@@@@ UNUESED FUNCTIONS FOR NOW..@@@@@@

// function getEmptyTour(title, price, country, imgUrl) {
//     const tour = {
//         title,
//         country,
//         price,
//         startedAt: Date.now(),
//         capacity: utilService.getRandomInt(1, 20),
//         members: utilService.getRandomInt(1, 20),
//         daysCount: utilService.getRandomInt(1, 5),
//         difficulty: utilService.getRandomInt(1, 5),
//         // rate: utilService.getRandomInt(1, 5),
//         locs: [],
//         imgs: [
//             { imgUrl }
//             // { url: '../assets/img/hero.jpg' },
//             // { url: '../assets/img/hero2.jpg' },
//             // { url: '../assets/img/hero.jpg' },
//         ],
//         tags: ['Water Trail', 'For Children'],
//         description:
//             'Get in the mood with a visit to Barcelona’s naughtiest attraction. The Erotic Museum holds 800+ pieces to lust over. It will take you on an erotic journey  from ancient societies to pinup culture. Enjoy a passionate adventure with your other half and take a look at eroticism’s historical influence of humankind through the past. And who knows, perhaps you’ll get some ideas for the not so distant future. ',
//         byUser: {},
//         reviews: [
//             _createReview('nice one'),
//             _createReview('one of the worst'),
//             _createReview('ahla bahla'),
//         ],
//     };
//     let sum = 0;
//     tour.reviews.forEach((r) => {
//         sum += r.rate;
//     });
//     tour.rate = sum / tour.reviews.length;
//     // console.log('  tour.rate:',   tour.rate)

//     return tour;
// }

// function getEmptyReview(txt, rate = 3) {
//     return {
//         txt,
//         createdAt: Date.now(),
//         rate,
//         byUser: {
//             fullname: 'Josh Wellington',
//             _id: utilService.makeId(),
//             imgUrl: 'avatar.jpg',
//         },
//     };
// }

// function _createTours() {
//     var tours = JSON.parse(localStorage.getItem(TOURS_KEY));
//     if (!tours || !tours.length) {
//         tours = [
//             _createTour(
//                 'Through Chang Mai Mountains',
//                 1000,
//                 'Thailand',
//                 'chaing-mai.jpg'
//             ),
//             _createTour(
//                 'Walk through the streets of Amsterdam',
//                 500,
//                 'Netherlands',
//                 'amsterdam.jpg'
//             ),
//             _createTour('Barcelona For Couples', 700, 'Spain', 'barcelona.jpg'),
//             _createTour("New York Street's", 350, 'USA', 'new-york.jpg'),
//             _createTour('Merom Golan Valleys', 20, 'Israel', 'marom-golan.jpg'),
//             _createTour('Budapest Eye', 240, 'Hungary', 'budapest.jpg'),
//             _createTour('Parisian Nights', 300, 'France', 'paris.jpg'),
//             _createTour('Koh Samui Beaches', 700, 'Thailand', 'koh-samui.jpg'),
//             _createTour(
//                 'Lovely Amsterdam',
//                 500,
//                 'Netherlands',
//                 'amsterdam.jpg'
//             ),
//             _createTour('Rio Carnivals', 150, 'Brazil', 'rio-carnival.jpg'),
//             _createTour('The Taste Of Rome', 700, 'Italy', 'rome.jpg'),
//             _createTour('Prague Views', 300, 'Czech Republic', 'prague.jpg'),
//             _createTour('The Western Wall', 80, 'Israel', 'western-wall.jpg'),
//         ];
//         localStorage.setItem(TOURS_KEY, JSON.stringify(tours));
//     }
//     return tours;
// }

// function _createTour(title, price, country, imgUrl) {
//     const tour = getEmptyTour(title, price, country, imgUrl);
//     tour._id = utilService.makeId();
//     return tour;
// }

// function _createReview(txt, rate) {
//     const review = getEmptyReview(txt, rate);
//     review.id = utilService.makeId();
//     return review;
// }

//@@@@@@@@ UNUESED FUNCTIONS FOR NOW..@@@@@@
