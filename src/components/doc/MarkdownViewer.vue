<script setup>
import { ref } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css' // 使用暗色主题

const props = defineProps(['content'])

const mdViewerRef = ref()

// 创建并配置 markdown-it 实例
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return '' // 使用默认转义
  }
})
</script>
<template>
  <div ref="mdViewerRef" class="markdown-body" v-html="md.render(String(content || ''))" />
</template>

<style>
/* 添加基本的 Markdown 样式 */
.markdown-body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}

.markdown-body pre {
  background-color: #282c34;
  border-radius: 6px;
  padding: 16px;
  overflow: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 16px 0;
}

.markdown-body code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 85%;
  background-color: rgba(40, 44, 52, 0.1);
  border-radius: 3px;
  padding: 0.2em 0.4em;
  color: #e06c75;
}

.markdown-body pre code {
  background-color: transparent;
  padding: 0;
  color: #abb2bf;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-body blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}
</style>