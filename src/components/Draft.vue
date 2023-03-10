<template>
  <q-btn rounded color="black" size="lg" class="draft-button fixed" icon-right="fa-solid fa-pen-nib" label="Draft" @click="prompt = true" />
  <q-dialog v-model="prompt" maximized persistent>
    <q-card>
      <q-card-section>
        <q-form
          @submit="postMessage"
          @reset="clearDraft"
          class="q-gutter-md"
        >
          <q-input
            filled
            type="email"
            v-model="draft.sender"
            label="Sender address"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            filled
            v-model="draft.recipients"
            label="Recipient(s) address(es)"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            filled
            v-model="draft.subject"
            label="Subject"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            filled
            type="textarea"
            v-model="draft.message"
            label="Message"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-file
            v-model="draft.attachments"
            label="Attachments"
            filled
            multiple
            style="max-width: 300px"
          />

          <div>
            <q-btn label="Submit" type="submit" color="primary" v-close-popup />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" v-close-popup />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useEmailStore } from '../stores/email'
import { ref } from 'vue'

const { loadingMessage, error, draft } = storeToRefs(useEmailStore())
const { postMessage, clearDraft } = useEmailStore()

const prompt = ref(false)
</script>

<style scoped>
.draft-button {
  right: 5%;
  bottom: 5%;
}
</style>
