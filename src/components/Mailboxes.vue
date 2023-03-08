<template>
  <aside class="menu">
    <ul class="menu-list">
      <li v-if="loadingMailboxes">Loading mailboxes</li>
      <li v-for="(mailbox, index) in mailboxes" :key="index">
        <router-link :to="mailbox.route">
          <span v-if=mailbox.icon class="icon">
            <i :class=mailbox.icon />
          </span>
          <span v-else class="icon">
            <i class="fa-solid fa-folder" />
          </span> 
          {{ mailbox.path.toLowerCase() }} <span v-if="0 < mailbox.unseen" class="tag is-rounded is-pulled-right">{{ mailbox.unseen }}</span>
        </router-link>
      </li>
    </ul>
  </aside>
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
aside {
  font-family: "Code New Roman" !important;
}
.menu-list li a {
  text-decoration: none !important;
}
.menu-list li:hover {
  color: #2a2a2a
}
</style>
