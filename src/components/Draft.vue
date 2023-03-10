<template>
  <q-btn rounded color="black" size="lg" class="draft-button fixed" icon-right="fa-solid fa-pen-nib" label="Draft" @click="prompt = true" />
  <q-dialog v-model="prompt" maximized persistent>
    <q-form
      @submit="postMessage"
      @reset="clearDraft"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="draft.sender"
        label="Your name *"
        hint="alias@domain.tld"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" v-close-popup />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" v-close-popup />
      </div>
    </q-form>
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
