<template>
  <div class="box">
    <div class="columns is-vcentered is-mobile">
      <div class="column">
        <label class="checkbox">
          <input 
            type="checkbox" 
            :checked="todo.completed" 
            @change="$emit('toggle', todo)"
            class="mr-2"
          >
          <span :class="{ 'has-text-grey-light line-through': todo.completed }">
            {{ todo.title }}
          </span>
        </label>
        <div v-if="todo.due_until" class="has-text-grey is-size-7 mt-1">
          Due: {{ formatDueUntil(todo.due_until) }}
        </div>
      </div>
      <div class="column is-narrow">
        <button 
          @click="$emit('delete', todo.id)" 
          class="button is-small is-danger is-outlined"
        >
          <span class="icon">
            <i class="fas fa-trash"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Todo } from '../types'

export default defineComponent({
  name: 'TodoItem',
  props: {
    todo: {
      type: Object as () => Todo,
      required: true
    }
  },
  emits: ['toggle', 'delete'],
  methods: {
    formatDueUntil(date: string | null) {
      if (!date) return ''
      const d = new Date(date)
      return d.toLocaleString()
    }
  }
})
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
