<template>
  <div v-if="!loadingMessages">
    <h1 class="title has-text-centered">{{ messages[0].envelope.subject }}</h1>
    <article class="message is-black">
      <div class="message-header">
        <p>
          {{ messages[0].envelope.sender[0].name }}
          <br>
          {{ messages[0].envelope.sender[0].address }}
        </p>
        <p>{{ date(messages[0].envelope.date) }}</p>
      </div>
      <div class="message-body">
        <span v-html="messages[0].preview.html ? messages[0].preview.html : messages[0].preview.textAsHtml" />
      </div>
    </article>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'

import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useEmailStore } from '../stores/email'

const { loadingMessages, error, messages } = storeToRefs(useEmailStore())
const { getMessages } = useEmailStore()
const route = useRoute()

const date = (date) => { return dayjs().isSame(dayjs(date), 'day') ? dayjs(date).format('HH:mm') : dayjs(date).format('MMM DD, YYYY') }

watch(
  [() => route.params.mailbox, () => route.params.uid],
  async () => {
    await getMessages({mailbox: route.params.mailbox, uid: route.params.uid})
  },
  { immediate: true }
)
</script>

<style scoped>
</style>
