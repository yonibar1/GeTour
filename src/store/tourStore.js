import { tourService } from '../services/tour.service';
import { utilService } from '../services/util.service';
export const tourStore = {
    state: {
        tours: [],
        tour: null,
        filterBy: {
            byDestination: '',
            byDate: '',
            byPriceRange: { min: 0, max: 2000 },
        },
    },
    getters: {
        tours(state) {
            return state.tours;
        },
        tour(state) {
            return state.tour;
        },
        // tourToEdit(state) {
        //     return state.tourToEdit;
        // },
        filterBy(state) {
            return state.filterBy;
        },
    },
    mutations: {
        setTours(state, { tours }) {
            state.tours = tours;
        },
        setTour(state, { tour }) {
            state.tour = tour;
        },
        setFilterBy(state, { filter }) {
            state.filterBy = filter;
        },
        // setTourToEdit(state, { tour }) {
        //     state.tourToEdit = tour;
        // },
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
        setChatHistory(state, { chat }) {
            state.chatHistory = chat;
            
        },
    },
    actions: {
        async loadChat(state, { tourId }) {
            const tour = await tourService.getById(tourId);
            state.commit({ type: 'setChatHistory', chat: tour.chatHistory });
        },
        async saveMsg(state, { data }) {
            console.log('payload:', data);
            const tour = await tourService.getById(data.tourId);
            tour.chatHistory = data.msgs;
            const tourAfterSave = await tourService.save(tour);
            state.commit({ type: 'updateTour', tourAfterSave });
        },
        async query(context) {
            try {
                const tours = await tourService.query(context.state.filterBy);
                context.commit({ type: 'setTours', tours });
                return tours;
            } catch (err) {
                console.log('Cannot get Tours', err);
            }
        },
        async getTourToEdit(context, { id }) {
            try {
                if (!id) {
                    const tour = tourService.getEmptyTour();
                    // commit({ type: 'setTourToEdit', tour });
                    const tourCopy = JSON.parse(JSON.stringify(tour));
                    return tourCopy;
                } else {
                    const tour = await tourService.getById(id);
                    const tourCopy = JSON.parse(JSON.stringify(tour));
                    // commit({ type: 'setTourToEdit', tour });
                    return tourCopy;
                }
            } catch (err) {
                console.log('Cannot get tour', err);
            }
        },
        async saveTour({ commit }, { tour }) {
            console.log('tour:', tour);
            try {
                const type = tour._id ? 'updateTour' : 'addTour';
                const tourAfterSave = await tourService.save(tour);
                console.log('tourAfterSave:', tourAfterSave);
                commit({ type, tourAfterSave });
                return tourAfterSave;
            } catch (err) {
                console.log('cannot save tour', err);
            }
        },
        async removeTour({ commit }, { id }) {
            try {
                await tourService.remove(id);
                commit({ type: 'remove', id });
            } catch (err) {
                console.log('cannot remove tour', err);
            }
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
        async loadToursByUser(context, { userId }) {
            try {
                const tours = await tourService.loadToursByUser(userId);
                return tours;
            } catch (err) {
                console.log('Cannot get Tours By User', err);
            }
        },
        async addReview({ commit }, { review, tourId }) {
            try {
                review.id = utilService.makeId();
                const tourById = await tourService.getById(tourId);
                tourById.reviews.push(review);
                console.log('tourById:', tourById);
                const tour = await tourService.save(tourById);
                console.log('tour:', tour);
                commit({ type: 'setTour', tour });
            } catch (err) {
                console.log('Cannot add review', err);
            }
        },
    },
};
