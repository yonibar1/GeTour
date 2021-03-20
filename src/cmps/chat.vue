<template>
    <section>
        <h3>Chat</h3>
        <ul>
            <li v-for="(msg, idx) in messages" :key="idx">
                {{ msg.from }}: {{ msg.txt }}
            </li>
        </ul>
        <div v-if="!userIsTyping">{{ typingUser }} is typing...</div>
        <form @submit.prevent="sendMsg" id="form" action="">
            <input @input="userType" v-model="msg.txt" autocomplete="off" />
            <button>Send</button>
        </form>
    </section>
</template>

<script>
import { socketService } from '../services/socket.service.js';
export default {
    name: 'ChatApp',
    props: {
        tourId: {
            type: String,
        },
    },
    data() {
        return {
            msg: {
                txt: '',
            },
            messages: [],
            userIsTyping: true,
            typingUser: null,
        };
    },
    computed: {
        loggedUser() {
            if (!this.$store.getters.getUser) {
                return { fullname: 'Guest' };
            }
            return this.$store.getters.getUser;
        },
    },
    methods: {
        async sendMsg() {
            this.msg.from = this.loggedUser.fullname;
            socketService.emit('chat newMsg', this.msg);
            this.msg = { txt: '' };
        },
        addMsg(msg) {
            this.$store.commit({ type: 'addMsg', msg });
            //   this.messages.push(msg);
        },
        userType() {
            socketService.emit('userIsTyping', this.loggedUser.fullname);
        },
        unsetUserIsTyping() {
            this.userIsTyping = false;
        },
        setUserIsTyping() {
            this.userIsTyping = true;
        },
        async loadChat() {
            await this.$store.dispatch({
                type: 'loadChat',
                toyId: this.toyId,
            });
            const messages = this.$store.state.chatHistory;
            this.messages = messages;
        },
    },
    created() {
        this.loadChat();
        this.setUserIsTyping = socketService.debounce(this.setUserIsTyping);
        socketService.setup();
        socketService.emit('chat set-topic', this.toyId);
        socketService.on('chat addMsg', this.addMsg);
        socketService.on('someoneIsTyping', (fullname) => {
            this.typingUser = fullname;
            this.setUserIsTyping();
            this.unsetUserIsTyping();
        });
    },
    destroyed() {
        this.$store.dispatch({
            type: 'saveMsg',
            data: { msgs: this.messages, toyId: this.toyId },
        });
    },
};
</script>
