<template>
  <q-list bordered v-if="!loadingMessages">
    <q-item>
      <q-item-section avatar>
        <q-avatar color="primary" text-color="white">
          {{ messages[0].envelope.from[0].name[0] || messages[0].envelope.from[0].address[0] }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ messages[0].envelope.subject }}</q-item-label>
        <q-item-label><span class="text-weight-bold">{{ messages[0].envelope.from[0].name || messages[0].envelope.from[0].address.split('@')[1] }}</span></q-item-label>
        <q-item-label caption lines="1">{{ messages[0].envelope.from[0].address }}</q-item-label>
      </q-item-section>

      <q-item-section side top>
        {{ date(messages[0].envelope.date) }}
      </q-item-section>
    </q-item>
  </q-list>
  <div v-html="messages[0].preview.html" v-if="messages[0].preview.html" />
  <div v-else>
    {{ messages[0].preview.textAsHtml }}
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
