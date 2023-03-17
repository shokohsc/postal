<template>
  <q-btn no-caps rounded color="black" size="md" class="draft-button fixed" icon-right="fa-solid fa-pen-nib" label="New message" @click="prompt = true" />
  <q-dialog v-model="prompt" maximized persistent>
    <q-card>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          @reset="clearDraft"
          class="q-gutter-md"
        >
          <q-input
            v-model="draft.from"
            label="From"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            v-model="recipients"
            label="To"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
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
import { computed, ref } from 'vue'

const { error, draft } = storeToRefs(useEmailStore())
const { postMessage, clearDraft } = useEmailStore()

const prompt = ref(false)
const recipients = ref("")

const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const senderRegexp = /^"([^"]+)"\s+<([^<>]+)>$/
const emailsRegexp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})(,\s*([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}))*$/
const isSender = async input => senderRegexp.test(input)
const isEmail = async input => emailRegexp.test(input)
const isEmails = async input => emailsRegexp.test(input)
const isCarbonCopy = async input => -1 < input.search(/\,/)

const onSubmit = async () => {
  // const to = -1 < recipients.value.search(/\,/g) ? recipients.value.split(',')[0] : recipients.value
  // const carbonCopy = -1 < recipients.value.search(/\,/g) && 1 < recipients.value.split(',').length ? recipients.value.replace(' ', '').split(',') : []
  // lium@example,alias@example.com, other@example.com

  const isRecipientValid = async () => {
    // there are no carbon copies
    console.log('to: ', recipients.value);
    if (-1 === recipients.value.search(/\,/g)) {
      return isEmail(recipients.value)
    }
    return false
  }

  const isCarbonCopiesValid = async () => {
    // there are carbon copies
    if (-1 < recipients.value.search(/\,/g)) {
      const tos = recipients.value.replace(' ', '').split(',')
      // remove first recipient
      tos.shift()
      return tos.some(recipient => !isEmail(recipient))
    }
    return false
  }
  // console.log(to);
  // console.log(carbonCopy);

  console.log('isRecipientValid', await isRecipientValid());
  console.log('isCarbonCopiesValid', await isCarbonCopiesValid());

  // draft.value.to = to
  // draft.value.cc = carbonCopy

  // await postMessage(draft.value)
}
</script>

<style scoped>
.draft-button {
  right: 5%;
  bottom: 5%;
}
</style>
