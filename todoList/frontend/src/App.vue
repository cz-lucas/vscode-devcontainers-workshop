<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">Node.js + Vue + TypeScript + Python FastAPI Todo App</h1>
      <router-view />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
    }
  }
})
</script>
