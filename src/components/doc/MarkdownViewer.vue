<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js/lib/core'

const props = defineProps(['content'])

const mdViewerRef = ref()

marked.setOptions({
  
})

onMounted(() => {
  mdViewerRef.value.querySelectorAll('pre code').forEach(el => {
    hljs.highlightElement(el)
  })
})
</script>
<template>
  <div ref="mdViewerRef" class="markdown-body" v-html="marked.parse(content)" />
</template>

<style scoped>

</style>