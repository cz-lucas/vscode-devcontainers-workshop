<template>
  <div>
    <div class="box">
      <form @submit.prevent="addTodo">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input 
              v-model="newTodo" 
              class="input" 
              type="text" 
              placeholder="Add a new task..."
              required
            >
          </div>
          <div class="control">
            <button class="button is-primary" type="submit">
              <span class="icon">
                <i class="fas fa-plus"></i>
              </span>
              <span>Add</span>
            </button>
          </div>
        </div>
      </form>
    </div>

    <div v-if="loading" class="has-text-centered my-5">
      <button class="button is-loading is-white">Loading</button>
    </div>

    <div v-else-if="error" class="notification is-danger">
      {{ error }}
    </div>

    <div v-else-if="todos.length === 0" class="has-text-centered my-5">
      <p class="is-size-5">No todos yet. Add one above!</p>
    </div>

    <div v-else>
      <div 
        v-for="todo in todos" 
        :key="todo.id" 
        class="box"
      >
        <div class="columns is-vcentered is-mobile">
          <div class="column">
            <label class="checkbox">
              <input 
                type="checkbox" 
                :checked="todo.completed" 
                @change="toggleStatus(todo)"
                class="mr-2"
              >
              <span :class="{ 'has-text-grey-light line-through': todo.completed }">
                {{ todo.title }}
              </span>
            </label>
          </div>
          <div class="column is-narrow">
            <button 
              @click="deleteTodo(todo.id)" 
              class="button is-small is-danger is-outlined"
            >
              <span class="icon">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Todo, TodoCreate } from '../types'

export default defineComponent({
  name: 'TodoList',
  data() {
    return {
      todos: [] as Todo[],
      newTodo: '',
      loading: true,
      error: null as string | null
    }
  },
  async mounted() {
    await this.fetchTodos()
  },
  methods: {
    async fetchTodos(): Promise<void> {
      this.loading = true
      try {
        const response = await fetch('/api/todos')
        if (!response.ok) {
          throw new Error('Failed to fetch todos')
        }
        this.todos = await response.json()
        this.error = null
      } catch (err) {
        this.error = `Error loading todos: ${(err as Error).message}`
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    async addTodo(): Promise<void> {
      if (!this.newTodo.trim()) return
      
      try {
        const todoData: TodoCreate = {
          title: this.newTodo,
          completed: false
        }
        
        const response = await fetch('/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(todoData)
        })
        
        if (!response.ok) {
          throw new Error('Failed to add todo')
        }
        
        const newTodo: Todo = await response.json()
        this.todos.push(newTodo)
        this.newTodo = ''
      } catch (err) {
        this.error = `Error adding todo: ${(err as Error).message}`
        console.error(err)
      }
    },
    async toggleStatus(todo: Todo): Promise<void> {
      try {
        const response = await fetch(`/api/todos/${todo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...todo,
            completed: !todo.completed
          })
        })
        
        if (!response.ok) {
          throw new Error('Failed to update todo')
        }
        
        todo.completed = !todo.completed
      } catch (err) {
        this.error = `Error updating todo: ${(err as Error).message}`
        console.error(err)
        await this.fetchTodos() // Refresh the list
      }
    },
    async deleteTodo(id: number): Promise<void> {
      try {
        const response = await fetch(`/api/todos/${id}`, {
          method: 'DELETE'
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete todo')
        }
        
        this.todos = this.todos.filter(todo => todo.id !== id)
      } catch (err) {
        this.error = `Error deleting todo: ${(err as Error).message}`
        console.error(err)
      }
    }
  }
})
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>