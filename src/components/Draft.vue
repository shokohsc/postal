<template>
  <q-btn no-caps rounded color="black" size="md" class="draft-button fixed" icon-right="fa-solid fa-pen-nib" label="New message" @click="prompt = true" />
  <q-dialog v-model="prompt" maximized persistent>
    <q-card>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            v-model="draft.from"
            label="From"
            lazy-rules
            :rules="[ val => val && isValidSender(val) || 'Invalid email address format']"
          />
          <q-input
            v-model="recipients"
            label="To"
            lazy-rules
            :rules="[ val => val && isRecipientsValid() || 'Invalid email address(es) format']"
          />
          <q-input
            v-model="draft.subject"
            label="Subject"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            type="textarea"
            autogrow
            v-model="draft.message"
            label="Message"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <!-- <q-file
            v-model="draft.attachments"
            label="Attachments"
            multiple
            style="max-width: 300px"
          /> -->

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
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

const { draft } = storeToRefs(useEmailStore())
const { postMessage, clearDraft } = useEmailStore()

const prompt = ref(false)

const to = ref(undefined === draft.value.to ? "" : draft.value.to)
const carbonCopy = ref(0 === draft.value.cc.length ? "" : draft.value.cc.join(', '))
const recipients = computed({
  get() {
    if ("" === to.value && "" === carbonCopy.value)
      return ""
    if ("" !== to.value && "" === carbonCopy.value)
      return to.value
    if ("" === to.value && "" !== carbonCopy.value)
      return carbonCopy.value.replaceAll(',  ', ', ')
    return to.value + ', ' + carbonCopy.value.replaceAll(',  ', ', ')
  },
  set(newValue) {
    if (-1 === newValue.search(/\,/g)) {
      to.value = newValue
      draft.value.to = to.value
      carbonCopy.value = ""
      draft.value.cc = [carbonCopy.value]
    } else {
      const cc = newValue.replaceAll(' ', '').split(',')
      draft.value.cc = cc
      to.value = cc.shift()
      draft.value.to = to.value
      carbonCopy.value = cc.join(', ').replaceAll(',  ', ', ')
    }
  }
})

const senderRegExp = /^("[\w\s]+"\ )?(<?(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))>?)$/
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const isValidEmail = input => emailRegExp.test(input)
const isValidSender = input => senderRegExp.test(input)

const isRecipientsValid = async () => {
  if (-1 === recipients.value.search(/\,/g)) {
    draft.value.to = recipients.value
    return isValidEmail(recipients.value)
  }
  const carbonCopy = recipients.value.replaceAll(' ', '').split(',')
  const to = carbonCopy.shift()
  const toValid = isValidEmail(to)
  const CcsValid = carbonCopy.every(recipient => isValidEmail(recipient))

  return toValid && CcsValid
}

const onReset = async () => {
  await clearDraft()
  to.value = ""
  carbonCopy.value = ""
}
const onSubmit = async () => {
  const valid = await isRecipientsValid()
  if (valid) {
    await postMessage(draft.value)
    await clearDraft()
    prompt.value = false
    to.value = ""
    carbonCopy.value = ""
  }
}
</script>

<style scoped>
.draft-button {
  right: 5%;
  bottom: 5%;
}
</style>
