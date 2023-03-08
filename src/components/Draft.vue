<template>
  <div id="draft" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Draft</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Sender</label>
          <div class="control has-icons-left">
            <input class="input" type="text" placeholder="'Uber' <uber@shokohsc.com>" v-model="draft.sender">
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Recipient(s)</label>
          <div class="control has-icons-left">
            <input class="input" type="email" placeholder="" v-model="draft.recipients">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Subject</label>
          <div class="control">
            <input class="input" type="text" placeholder="" v-model="draft.subject">
          </div>
        </div>

        <div class="field">
          <label class="label">Message</label>
          <div class="control">
            <textarea class="textarea" placeholder="" v-model="draft.message"></textarea>
          </div>
        </div>

        <div class="file">
          <label class="file-label">
            <input class="file-input" type="file" name="resume">
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Choose a file…
              </span>
            </span>
          </label>
        </div>

      </section>
      <footer class="modal-card-foot">
        <button class="button send is-dark" @click="postMessage" >Send</button>
        <button class="button cancel is-grey">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useEmailStore } from '../stores/email'
import { onMounted } from 'vue'

const { loadingMessage, error, draft } = storeToRefs(useEmailStore())
const { postMessage } = useEmailStore()

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
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .cancel') || []).forEach(($close) => {
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

<style scoped>
</style>
