import { tourService } from '../services/tour.service';
import { utilService } from '../services/util.service';
export const tourStore = {
    state: {
        // chatHistory: [],
        tours: [],
        tour: null,
        tourToEdit: null,
        reviews: [],
        filterBy: {},
    },
    getters: {
        tours(state) {
            return state.tours;
        },
        tour(state) {
            return state.tour;
        },
        tourToEdit(state) {
            return state.tourToEdit;
        },
        reviews(state) {
            return state.reviews;
        },
        filterBy(state) {
            return state.filterBy;
        },
    },
    mutations: {
        query(state, { tours }) {
            state.tours = tours;
        },
        setTour(state, { tour }) {
            state.tour = tour;
        },
        setFilterBy(state, { filter }) {
            state.filterBy = filter;
            console.log('set filter in mutation', filter);
        },
        loadReviews(state, { reviews }) {
            state.reviews = reviews;
        },
        setTourToEdit(state, { tour }) {
            state.tourToEdit = tour;
        },
        updateTour(state, { tourAfterSave }) {
            const idx = state.tours.findIndex((t) => {
                return t._id === tourAfterSave._id;
            });
            state.tours.splice(idx, 1, tourAfterSave);
        },
        addTour(state, { tour }) {
            state.tours.push(tour);
        },
        remove(state, { id }) {
            const idx = state.tours.findIndex((t) => {
                return t._id === id;
            });
            state.tours.splice(idx, 1);
        },
        addReview(state, { review }) {
            state.reviews.push(review);
        },
        // setChatHistory(state, { chat }) {
        //     console.log('chat:', chat)
        //     state.chatHistory = chat;
        // },
    },
    actions: {
        // async loadChat(state, payload) {
        //     // console.log('payload:', payload)
        //     // const tour = await tourService.getById(tourId);
        //     state.commit({ type: 'setChatHistory', chat: tour.chatHistory });
        // },
        // async saveMsg(state, { data }) {
        //     // console.log('data:', data)
        //     const tour = await tourService.getById(data.tourId);
        //     tour.chatHistory = data.msgs;
        //     const tourAfterSave = await tourService.save(tour);
        //     state.commit({ type: 'updateTour', tourAfterSave });
        // },
        async setFilter(state, { filter }) {
            console.log('setFilter in store:', filter)
            try {
                state.commit({ type: 'setFilterBy', filter });
                console.log(state.filterBy);
                // const tours = await tourService.query(state.filterBy);
                // state.commit({ type: 'query', tours });

            } catch (err) {
                console.log('Cannot set filter', err);
            }
        },
        async query(state) {
            try {
                const tours = await tourService.query(state.filterBy);
                state.commit({ type: 'query', tours });
                return tours;
            } catch (err) {
                console.log('Cannot get Tours', err);
            }
        },
        async getTourToEdit({ commit }, { id }) {
            try {
                if (!id) {
                    const tour = tourService.getEmptyTour();
                    commit({ type: 'setTourToEdit', tour });
                    const tourCopy = JSON.parse(JSON.stringify(tour));
                    return tourCopy;
                } else {
                    const tour = await tourService.getById(id);
                    const tourCopy = JSON.parse(JSON.stringify(tour));
                    commit({ type: 'setTourToEdit', tour });
                    return tourCopy;
                }
            } catch (err) {
                console.log('Cannot get tour', err);
            }
        },
        async saveTour({ commit }, { tour }) {
            const type = tour._id ? 'updateTour' : 'addTour';
            const tourAfterSave = await tourService.save(tour);
            commit({ type, tourAfterSave });
            return tourAfterSave;
        },
        async removeTour({ commit }, { id }) {
            await tourService.remove(id);
            commit({ type: 'remove', id });
        },

        async loadTour({ commit }, { id }) {
            try {
                const tour = await tourService.getById(id);
                commit({ type: 'setTour', tour });
                return tour;
            } catch (err) {
                console.log('Cannot get Tours', err);
            }
        },
        async loadReviews({ commit }, { id }) {
            try {
                const tour = await tourService.getById(id);
                const reviews = tour.reviews;
                commit({ type: 'loadReviews', reviews });
            } catch (err) {
                console.log(err);
            }
        },
        async addReview({ commit }, { review, tourId }) {
            try {
                review.id = utilService.makeId();
                commit({ type: 'addReview', review });
                const tourById = await tourService.getById(tourId);
                tourById.reviews.push(review);
                const tour = await tourService.save(tourById);
                console.log(tour, 'Tour After Save');
                commit({ type: 'setTour', tour });
            } catch (err) {
                console.log('Cannot add review', err);
            }
        },
    },
    modules: {},
};
