import { tourService } from '../services/tour.service';
import { utilService } from '../services/util.service';
export const tourStore = {
    state: {
        tours: [],
        tour: null,
        tourToEdit: null,
        // reviews: [],
    },
    getters: {
        tours(state) {
            return state.tours;
        },
        tour(state) {
            console.log('Getters',state.tour);
            return state.tour;
        },
        tourToEdit(state) {
            return state.tourToEdit;
        },
        reviews(state) {
            return state.reviews;
        },
    },
    mutations: {
        query(state, { tours }) {
            state.tours = tours;
        },
        setTour(state,{tour}) {
            console.log('Tour', tour);
            state.tour = tour;
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
        // addReview(state, { review }) {
        //     state.reviews.push(review);
        // },
    },
    actions: {
        // async loadChat(state, { tourId }) {
        //     const tour = await tourService.getById(tourId)
        //     state.commit({ type: 'setChatHistory', chat: tour.chatHistory })
        // },
        // async saveMsg(state, { data }) {
        //     const tour = await tourService.getById(data.tourId)
        //     tour.chatHistory = data.msgs
        //     const tourAfterSave = await tourService.save(tour)
        //     state.commit({ type: 'updateTour', tourAfterSave })
        // },
        // async setFilter(state, { filter }) {
        //     try {
        //         const tours = await tourService.query(filter)
        //         state.commit({ type: 'query', tours })
        //     } catch (err) {
        //         console.log('Cannot set filter', err);
        //     }
        // },
        async query({ commit }) {
            try {
                const tours = await tourService.query();
                commit({ type: 'query', tours });
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
        async addReview({ commit }, { review, tourId }) {
            try {
                const tourById = await tourService.getById(tourId);
                review.id=utilService.makeId()
                tourById.reviews.push(review);

                const tour = await tourService.save(tourById);
                console.log('tourAfterSave:', tour);
                // commit({ type: 'updateTour', tour });
                commit({ type: 'setTour', tour });
            } catch (err) {
                console.log('Cannot add review', err);
            }
        },
    },
    modules: {},
};
