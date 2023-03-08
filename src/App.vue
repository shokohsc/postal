<template>
  <section class="is-fullheight is-fullwidth">
    <!-- Hero content: will be in the middle -->
    <div class="hero is-dark">
      <Navbar />
      <div id="columns" class="columns is-mobile is-gapless">
        <div id="mailboxes" class="column is-2-desktop is-hidden-touch">
          <Mailboxes />
        </div>
        <div id="view" class="column is-10-desktop is-full-mobile">
          <router-view />
        </div>
      </div>
      <button class="button is-black js-modal-trigger" data-target="draft">
        Draft
      </button>
      <Draft />
    </div>
  </section>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Mailboxes from './components/Mailboxes.vue'
import Draft from './components/Draft.vue'
import 'virtual:fonts.css'
</script>

<style>
html {
  background-color: #23232e;
  height: 100%
}
body {
  font-family: "Code New Roman";
}
body::-webkit-scrollbar {
  display: none;
}
.columns {
  overflow-x: auto;
}
#mailboxes {
  overflow-y: auto;
  overflow-x: auto;
  height: calc(100vh);
}
#mailboxes::-webkit-scrollbar {
  display: none;
}
#view {
  overflow-y: auto;
  height: calc(100vh);
}
#view::-webkit-scrollbar {
  display: none;
}
.navbar-brand.left-burger {
	align-items: flex-start;
}
.navbar-brand.left-burger .navbar-burger {
	margin-left: 0;
	margin-right: 0;
}
.js-modal-trigger {
  position: absolute;
  bottom: 2%;
  right: 5%;
}
</style>
