<template>
  <q-btn flat round dense icon="fa-solid fa-search" @click="prompt = true" />
  <q-dialog v-model="prompt" persistent>
    <q-card>
      <q-card-section>
        <q-form
          @submit="getResults"
          @reset="clearQuery"
          class="q-gutter-md"
        >
          <q-input
            v-model="query"
            label="Query"
          />

          <div>
            <q-btn label="Submit" type="submit" color="primary" v-close-popup @click="getResults" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" v-close-popup  @click="clearQuery"/>
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

const { error, query } = storeToRefs(useEmailStore())
const { getResults, clearQuery } = useEmailStore()

const prompt = ref(false)
</script>

<style scoped>
.draft-button {
  right: 5%;
  bottom: 5%;
}
</style>
