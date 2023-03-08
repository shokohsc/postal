<template>
  <section class="is-fullheight is-fullwidth">
    <!-- Hero content: will be in the middle -->
    <div class="hero is-dark">
      <Navbar />
      <div id="columns" class="columns is-mobile is-gapless">
        <div id="mailboxes" class="column is-2-desktop">
          <Mailboxes />
        </div>
        <div id="view" class="column is-10-desktop is-full-mobile">
          <router-view />
        </div>
      </div>
      <button id="draft-button" class="button is-black js-modal-trigger" data-target="draft">
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
import { onMounted } from 'vue'

onMounted(() => {
  document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }

    function closeModal($el) {
      $el.classList.remove('is-active');
    }

    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);

      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .cancel .mailbox') || []).forEach(($close) => {
      const $target = $close.closest('.modal');

      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;

      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });
})

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
.mailboxes {
  overflow-y: auto;
  overflow-x: auto;
  height: calc(100vh);
  background-color: #23232e;
  color: aliceblue;
}
.mailboxes::-webkit-scrollbar {
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
#draft-button {
  position: absolute;
  bottom: 2%;
  right: 5%;
}
</style>
