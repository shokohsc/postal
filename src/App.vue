<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="bg-black text-white">
        <q-btn dense flat round icon="fa-solid fa-bars" @click="toggleLeftDrawer">
          <q-badge rounded floating :label="unreadMailNumber" v-if="0 < unreadMailNumber" />
        </q-btn>

        <q-toolbar-title>
          <router-link to="/" class="text-white" style="text-decoration: none;" >Postal</router-link>
        </q-toolbar-title>
        <Search />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay elevated behavior="mobile">
      <Mailboxes />
    </q-drawer>

    <q-page-container>
      <router-view />
      <!-- <Draft /> -->
    </q-page-container>


  </q-layout>
</template>

<script setup>
import 'virtual:fonts.css'
import Mailboxes from './components/Mailboxes.vue'
// import Draft from './components/Draft.vue'
import Search from './components/Search.vue'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useEmailStore } from './stores/email'

const { unreadMailNumber } = storeToRefs(useEmailStore())
const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const $q = useQuasar()
$q.dark.set(true)
</script>

<style>
body {
  font-family: "Code New Roman";
}
*::-webkit-scrollbar {
  display: none !important;
}
</style>
