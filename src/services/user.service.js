import { httpService } from './http.service.js';
// import { utilService } from './util.service.js';
// import { storageService } from './async-storage.service.js';

const USER_URL = 'user/';
const AUTH_URL = 'auth/';
// const AUTH_KEY = 'user';

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedUser,
};

// For Authentication...

async function login(user) {
    const userFromBack = await httpService.post(AUTH_URL + 'login', user);
    console.log(userFromBack, 'User From Back');
    sessionStorage.setItem('login', JSON.stringify(userFromBack));
    return userFromBack;
}

async function getLoggedUser() {
    const user = JSON.parse(sessionStorage.getItem('login'));
    return user;
}

function logout() {
    sessionStorage.clear();
    // return sessionStorage.getItem(AUTH_KEY + 'logout');
    // return storageService.post(AUTH_KEY + 'logout');
    return httpService.post(AUTH_URL + 'logout');
}

function signup(signupDetails) {
    signupDetails.createdAt = Date.now();
    sessionStorage.setItem('signup', JSON.stringify(signupDetails));
    // return sessionStorage.getItem(AUTH_KEY + 'signup', signupDetails);
    return httpService.post(AUTH_URL + 'signup', signupDetails);
    // return storageService.post(AUTH_KEY + 'signup', signupDetails);
}

function getById(id) {
    return httpService.get(USER_URL + id);
    // return sessionStorage.getItem(AUTH_KEY + id);
    // return storageService.get(AUTH_KEY, id);
}
