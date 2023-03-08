<template>
  <aside class="menu is-hidden-touch">
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

  <div id="mailboxes-mobile" class="mailboxes modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <section class="modal-card-body">
        <ul class="menu-list">
          <li v-if="loadingMailboxes">Loading mailboxes</li>
          <li v-for="(mailbox, index) in mailboxes" :key="index">
            <router-link :to="mailbox.route" class="mailbox">
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
      </section>
    </div>
  </div>
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
section.modal-card-body {
  background-color: #23232e;
  color: aliceblue;
}

</style>
