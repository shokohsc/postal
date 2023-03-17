<template>
  <q-list dense>
    <q-item dense v-if="loadingMailboxes">
      <q-item-section>
        <q-spinner
          color="primary"
          size="3em"
          :thickness="10"
        />
      </q-item-section>
    </q-item>

    <q-item v-if="!loadingMailboxes && 0 === mailboxes.length">
      <q-item-section>{{ error }}</q-item-section>
    </q-item>


    <q-item class="mailboxes" dense clickable v-ripple v-for="(mailbox, index) in mailboxes" :key="index" :to="mailbox.route">
      <q-item-section side>
        <q-icon right :name="mailbox.icon" v-if=mailbox.icon>
          <q-badge rounded floating :label="mailbox.unseen" v-if="0 < mailbox.unseen" />
        </q-icon>
        <q-icon right name="fa-solid fa-folder" v-else>
          <q-badge rounded floating :label="mailbox.unseen" v-if="0 < mailbox.unseen" />
        </q-icon>
      </q-item-section>

      <q-item-section side>
        {{ mailbox.path.toLowerCase() }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useEmailStore } from '../stores/email'

const { loadingMailboxes, error, mailboxes } = storeToRefs(useEmailStore())
const { getMailboxes } = useEmailStore()

onMounted(async () => {
  await getMailboxes()
})
</script>

<style scoped>
.mailboxes {
  font-family: "Code New Roman" !important;
  text-decoration: none;
  color: white;
}
</style>
