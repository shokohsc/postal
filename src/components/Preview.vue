<template>
    <iframe class="preview" seamless />
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  preview: String
})
onMounted(() => {
    const preview = props.preview.html ? props.preview.html : props.preview.textAsHtml
    document.querySelector('iframe.preview')
    .contentDocument.write(preview)
})
</script>

<style scoped>
iframe.preview {
    background: grey;
    width: calc(100vw);
    height: calc(86vh);
}
iframe.preview::-webkit-scrollbar {
    display: none !important;
}
</style>
