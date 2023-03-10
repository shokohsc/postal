<template>
  <q-list separator>
    <q-item v-if="loadingMessages">
      <q-item-section>
        <q-spinner
          color="primary"
          size="3em"
          :thickness="10"
        />
      </q-item-section>
    </q-item>

    <q-item v-if="!loadingMessages && 0 === messages.length">
      <q-item-section>No messages in {{ mailbox.toLowerCase() }}</q-item-section>
    </q-item>

    <q-item clickable v-ripple v-for="(message, index) in messages" :key="index" :to="message.route">
      <q-item-section avatar>
        <q-avatar color="dark" text-color="white">
          {{ message.envelope.from[0].name[0] || message.envelope.from[0].address[0] }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ message.envelope.subject }}</q-item-label>
        <q-item-label><span class="text-weight-bold">{{ message.envelope.from[0].name || message.envelope.from[0].address.split('@')[1] }}</span></q-item-label>
        <q-item-label caption>{{ message.envelope.from[0].address }}</q-item-label>
        
      </q-item-section>

      <q-item-section side top>
        {{ date(message.envelope.date) }}
      </q-item-section>
    </q-item>
  </q-list>
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
</style>
