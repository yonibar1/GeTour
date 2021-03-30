import { userService } from '../services/user.service';
export const userStore = {
    state: {
        users: [],
        user: null,
        loggedInUser: userService.getLoggedUser(),
    },
    getters: {
        users(state) {
            return state.users;
        },
        user(state) {
            return state.user;
        },
        loggedInUser(state) {
            return state.loggedInUser
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user;
        },
        logout(state) {
            state.loggedInUser = null
        },
        updateUser(state, { userAfterSave }) {
            const idx = state.users.findIndex((t) => {
                return t._id === userAfterSave._id;
            });
            state.users.splice(idx, 1, userAfterSave);
        },
        signup(state, { signedUser }) {
            state.users.push(signedUser);
        },
        login(state, { loggedUser }) {
            state.loggedInUser = loggedUser
        },
        remove(state, { id }) {
            const idx = state.users.findIndex((u) => {
                return u._id === id;
            });
            state.users.splice(idx, 1);
        },
    },
    actions: {
        async logout({ commit }) {
            await userService.logout()
            commit({ type: 'logout' })
        },
        async login({ commit }, { user }) {
            const loggedUser = await userService.login(user);
            commit({ type: 'login', loggedUser });
            return loggedUser;
        },
        async signup({ commit }, { userData }) {
            const signedUser = await userService.signup(userData);
            commit({ type: 'signup', signedUser });
            return signedUser;
        },
        async getLoggedUser({ commit }) {
            const loggedUser = await userService.getLoggedUser()
            commit({ type: 'login', loggedUser });
        },
        async loadUser({ commit }, { id }) {
            try {
                const user = await userService.getById(id);
                commit({ type: 'setUser', user });
                return user;
            } catch (err) {
                console.log('Cannot get Users', err);
            }
        },
    },
};
