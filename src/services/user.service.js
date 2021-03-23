// import { httpService } from './http.service.js';
// import { utilService } from './util.service.js';
// import { storageService } from './async-storage.service.js';

// const KEY = 'toysDB';
// const USER_URL = 'user/';
// const AUTH_URL = 'auth/';
const AUTH_KEY = 'user';

export const userService = {
    login,
    logout,
    signup,
    getById,
};

// For Authentication...

function login(user) {
    sessionStorage.setItem('login', user.username);
    // return storageService.post(AUTH_KEY + 'login', user);
    return sessionStorage.getItem(AUTH_KEY + 'login', JSON.stringify(user));
    // return httpService.post(AUTH_URL + 'login', user);
}
function logout() {
    sessionStorage.clear();
    return sessionStorage.getItem(AUTH_KEY + 'logout');
    // return storageService.post(AUTH_KEY + 'logout');
    // return httpService.post(AUTH_URL + 'logout');
}

function signup(signupDetails) {
    console.log('signupDetails:', signupDetails);
    sessionStorage.setItem('signup', JSON.stringify(signupDetails));
    return sessionStorage.getItem(AUTH_KEY + 'signup', signupDetails);
    // return httpService.post(AUTH_URL + 'signup', signupDetails);
    // return storageService.post(AUTH_KEY + 'signup', signupDetails);
}

function getById(id) {
    // return httpService.get(TOUR_URL + id);
    return sessionStorage.getItem(AUTH_KEY + id);
    // return storageService.get(AUTH_KEY, id);
}
