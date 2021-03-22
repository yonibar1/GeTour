import { orderService } from '../services/order.service';
import { utilService } from '../services/util.service';
export const orderStore = {
    state: {
        // chatHistory: [],
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
        async loadOrders(state) {
            try {
                const orders = await orderService.query();
                state.commit({ type: 'query', orders });
                return orders;
            } catch (err) {
                console.log('Cannot get Orders', err);
            }
        },
        async saveOrder({ commit }, { order }) {
            const type = order._id ? 'updateOrder' : 'addOrder';
            const orderAfterSave = await orderService.save(order);
            console.log(orderAfterSave, 'orderAfterSave');
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
