<template>
  <q-btn no-caps rounded color="black" size="md" class="draft-button fixed" icon-right="fa-solid fa-pen-nib" label="New message" @click="prompt = true" />
  <q-dialog v-model="prompt" maximized persistent>
    <q-card>
      <q-card-section>
        <q-form
          @submit="postMessage"
          @reset="clearDraft"
          class="q-gutter-md"
        >
          <q-input
            v-model="draft.sender"
            label="From"
          />
          <q-input
            v-model="draft.recipients"
            label="To"
          />
          <q-input
            v-model="draft.subject"
            label="Subject"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            type="textarea"
            v-model="draft.message"
            label="Message"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-file
            v-model="draft.attachments"
            label="Attachments"
            multiple
            style="max-width: 300px"
          />

          <div>
            <q-btn label="Submit" type="submit" color="primary" v-close-popup />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" v-close-popup />
            <q-btn label="Close" color="primary" flat class="q-ml-sm" v-close-popup />
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

const { error, draft } = storeToRefs(useEmailStore())
const { postMessage, clearDraft } = useEmailStore()

const prompt = ref(false)
</script>

<style scoped>
.draft-button {
  right: 5%;
  bottom: 5%;
}
</style>
