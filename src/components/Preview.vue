<template>
    <Letter :html="body" className="mailBody" :allowedSchemas="allowedSchemas" />
</template>

<script setup>
import { computed } from 'vue'
import { Letter } from 'vue-letter'

const props = defineProps({
    preview: Object
})
const body = computed(() => {
    return props.preview.html ? props.preview.html : props.preview.textAsHtml
})
const allowedSchemas = ['https', 'mailto']
</script>

<style scoped>
.mailBody {
    width: 100%;
    margin: 0 auto;
    background-color: dimgrey;
}
</style>
