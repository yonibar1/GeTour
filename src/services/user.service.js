import { httpService } from './http.service.js';

const USER_URL = 'user/';
const AUTH_URL = 'auth/';

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedUser,
};

async function login(user) {
    const userFromBack = await httpService.post(AUTH_URL + 'login', user)
    sessionStorage.setItem('login', JSON.stringify(userFromBack));
    return userFromBack;
}

async function getLoggedUser() {
    const user = JSON.parse(sessionStorage.getItem('login'));
    return user;
}

function logout() {
    sessionStorage.clear();
    return httpService.post(AUTH_URL + 'logout');
}

function signup(signupDetails) {
    signupDetails.createdAt = Date.now();
    sessionStorage.setItem('signup', JSON.stringify(signupDetails));
    return httpService.post(AUTH_URL + 'signup', signupDetails);
}

function getById(id) {
    return httpService.get(USER_URL + id);
}
