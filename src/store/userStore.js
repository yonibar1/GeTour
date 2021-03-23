import { userService } from '../services/user.service';
// import { uploadImg } from "../services/img-upload.service";
export const userStore = {
    state: {
        users: [],
        user: null,
    },
    getters: {
        users(state) {
            return state.users;
        },
        user(state) {
            return state.user;
        },
        // userToEdit(state) {
        //     return state.userToEdit;
        // },
    },
    mutations: {
        // query(state, { users }) {
        //     state.users = users;
        // },
        setUser(state, { user }) {
            state.user = user;
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
            console.log('loggedUser:', loggedUser);
        },
        remove(state, { id }) {
            const idx = state.users.findIndex((u) => {
                return u._id === id;
            });
            state.users.splice(idx, 1);
        },
    },
    actions: {
        // async query({ state }) {
        //     try {
        //         const users = await userService.query(state.filterBy);
        //         state.commit({ type: 'query', users });
        //         return users;
        //     } catch (err) {
        //         console.log('Cannot get Users', err);
        //     }
        // },
        async getUserToEdit({ commit }, { id }) {
            try {
                if (!id) {
                    const user = userService.getEmptyUser();
                    commit({ type: 'setUserToEdit', user });
                    const userCopy = JSON.parse(JSON.stringify(user));
                    return userCopy;
                } else {
                    const user = await userService.getById(id);
                    const userCopy = JSON.parse(JSON.stringify(user));
                    commit({ type: 'setUserToEdit', user });
                    return userCopy;
                }
            } catch (err) {
                console.log('Cannot get user', err);
            }
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
        // async saveUser({ commit }, { user }) {
        //     const type = user._id ? 'login' : 'signup';
        //     const userAfterSave = await userService.signup(user);
        //     commit({ type, userAfterSave });
        //     return userAfterSave;
        // },
        // async removeUser({ commit }, { id }) {
        //     await userService.remove(id);
        //     commit({ type: 'remove', id });
        // },
        async loadUser({ commit }, { id }) {
            try {
                console.log('id:', id);
                const user = await userService.getById(id);
                console.log('user:', user)
                commit({ type: 'setUser', user });
                return user;
            } catch (err) {
                console.log('Cannot get Users', err);
            }
        },
    },
    modules: {},
};
