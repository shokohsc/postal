import { createRouter, createWebHistory } from 'vue-router'
import Messages from './components/Messages.vue';
import Message from './components/Message.vue';

const routes = [
  { 
    path: '/:mailbox?',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/:mailbox/:uid',
    name: 'Message',
    component: Message
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
