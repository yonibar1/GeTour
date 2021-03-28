import { orderService } from '../services/order.service';
export const orderStore = {
    state: {
        orders: [],
        order: null,
    },
    getters: {
        orders(state) {
            return state.orders;
        },
        order(state) {
            return state.order;
        },
    },
    mutations: {
        query(state, { orders }) {
            state.orders = orders;
        },
        setOrder(state, { order }) {
            state.order = order;
        },
        updateOrder(state, { orderAfterSave }) {
            const idx = state.orders.findIndex((o) => {
                return o._id === orderAfterSave._id;
            });
            state.orders.splice(idx, 1, orderAfterSave);
        },
        addOrder(state, { order }) {
            state.orders.push(order);
        },
        remove(state, { id }) {
            const idx = state.orders.findIndex((t) => {
                return t._id === id;
            });
            state.orders.splice(idx, 1);
        },
    },
    actions: {
        async loadOrdersByGuide(context, { guideId }) {
            try {
                const orders = await orderService.getOrdersByGuide(guideId)
                return orders
            } catch (err) {
                console.log('Cannot get orders', err);
            }
        },
        async loadOrdersByTour(context, { toursIds }) {
            try {
                const orders = await orderService.query(toursIds)
                console.log(orders);

            } catch (err) {
                console.log(err, 'FAILED');
            }
        },
        async saveOrder({ commit }, { order }) {
            const type = order._id ? 'updateOrder' : 'addOrder';
            const orderAfterSave = await orderService.save(order);
            console.log(orderAfterSave,'Order');
            commit({ type, orderAfterSave });
            return orderAfterSave;
        },
        async removeOrder({ commit }, { id }) {
            await orderService.remove(id);
            commit({ type: 'remove', id });
        },
        async loadOrder({ commit }, { id }) {
            try {
                const order = await orderService.getById(id);
                commit({ type: 'setOrder', order });
                return order;
            } catch (err) {
                console.log('Cannot get Orders', err);
            }
        },
    },
    modules: {},
};
