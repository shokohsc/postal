<template>
  <div class="has-text-centered">
    <h1 class="title">{{ mailbox.toLowerCase() }}</h1>
  </div>
  <ul class="is-hoverable is-fullwidth is-dark">
    <li v-if="loadingMessages">Loading messages</li>
    <li v-if="!loadingMessages && 0 === messages.length">No messages</li>
      <li v-for="(message, index) in messages" :key="index">
        <router-link :to="message.route">
          <div>
            <span class="has-text-grey is-size-7 is-pulled-right">{{ date(message.envelope.date) }}</span>
            <strong v-if="'sent' === mailbox.toLowerCase()">{{ message.envelope.to[0].name }}</strong> <small v-if="'sent' === mailbox.toLowerCase()">{{ message.envelope.to[0].address }}</small>
            <strong v-if="'sent' !== mailbox.toLowerCase()">{{ message.envelope.from[0].name }}</strong> <small v-if="'sent' !== mailbox.toLowerCase()">{{ message.envelope.from[0].address }}</small>
          </div>
          
          <div>
            <span class="has-text-grey is-size-6 subject">{{ message.envelope.subject }}</span>
          </div>
        </router-link>
      </li>
  </ul>
</template>

<script setup>
import dayjs from 'dayjs'

import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useEmailStore } from '../stores/email'

const { loadingMessages, error, messages } = storeToRefs(useEmailStore())
const { getMessages } = useEmailStore()
const route = useRoute()

const date = (date) => { return dayjs().isSame(dayjs(date), 'day') ? dayjs(date).format('HH:mm') : dayjs(date).format('MMM DD, YYYY') }
const mailbox = computed(() => route.params.mailbox ? route.params.mailbox : 'INBOX')

watch(
  () => route.params.mailbox,
  async () => {
    await getMessages({mailbox: route.params.mailbox ? route.params.mailbox : 'INBOX'})
  },
  { immediate: true }
)
</script>

<style scoped>
/* Table styles */
li {
  background-color: #2a2a2a;
  margin-bottom: 2px;
}

li:hover {
  background-color: #4a4a4a;
}
.subject{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  width: calc(100%);
}
</style>
