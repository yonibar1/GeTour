// const gUsers = [
//     {
//         username: 'BarneyS',
//         fullname: 'Barney Stinson',
//         password: 'legendary1'
//     }
// ]




// // the order object
// // order = {
// //        _id: 'mongodbID',
// //     createdAt: 9898989,
// //     guestsCount: 3,
// //     totalPrice: 300,
// //     status: 'pending',
// //     buyer: {
// //         _id: 'mongodbID',
// //         fullname: 'muki puki',
// //         imgUrl: 'someurl.jpg',
// //     },
// //     tour: {
// //         _id: 09320320,
// //         title: 'tourtitle',
// //     },
// // };
// import { httpService } from './http.service.js';
// import { utilService } from './util.service.js';
// import { storageService } from './async-storage.service.service.js';

// const KEY = 'toysDB';
// // const USER_URL = 'user/';
// // const AUTH_URL = 'auth/';
// const AUTH_KEY = 'user';

// export const userService = {
//     login,
//     logout,
//     signup,
// };

// // For Authentication...

// function login(user) {
//     sessionStorage.setItem('logedinuser', user.username);
//     return storageService.post(AUTH_KEY + 'login', user);
//     // return httpService.post(AUTH_URL + 'login', user);
// }
// function logout() {
//     sessionStorage.clear();
//     return storageService.post(AUTH_KEY + 'logout');
//     // return httpService.post(AUTH_URL + 'logout');
// }

// function signup(signupDetails) {
//     sessionStorage.setItem('signup', signupDetails);
//     // return httpService.post(AUTH_URL + 'signup', signupDetails);
//     return storageService.post(AUTH_URL + 'signup', signupDetails);
// }




