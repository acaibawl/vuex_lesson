<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="what needs to be done?"
        @keyup.enter="addTodo"
      >
    </header>
    <!-- main section -->
    <section class="main" v-show="todos.length">
      <input
        class="toggle-all"
        id="toggle-all"
        type="checkbox"
        :checked="allChecked"
        @change="toggleAll(!allChecked)"
      >
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <todo-item
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          />
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ plualize(remaining, 'item') }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters">
          <a
            :href="'#/' + key"
            :class="{ selected: visibility === key }"
            @click="visibility = key">{{ capitalize(key) }}</a>
        </li>
      </ul>
      <button
        class="clear-completed"
        v-show="todos.length > remaining"
        @click="clearCompleted">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>

import {mapActions} from "vuex";
import TodoItem from "~/components/todomvc/TodoItem";

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

export default {
  name: "TodomvcPage",
  components: {TodoItem},
  data () {
    return {
      visibility: 'all',
      filters: filters
    }
  },
  computed: {
    todos () {
      // this.$store.state.todos だと、store直下のindex.jsのstate.todosを参照してしまう
      return this.$store.state.todomvc.todomvcModule.todos
    },
    allChecked () {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos () {
      return filters[this.visibility](this.todos) // dataからMethodsに切り出したい
    },
    remaining () {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  methods: {
    ...mapActions('todomvc/todomvcModule', [
      'toggleAll',
      'clearCompleted'
    ]),
    addTodo (e) {
      const text = e.target.value
      if (text.trim()) {
        this.$store.dispatch('todomvc/todomvcModule/addTodo', text)
      }
      e.target.value = ''
    },
    plualize (n, w) {
      return n === 1 ? w : (w + 's')
    },
    capitalize (s) {
      return s.charAt(0).toUpperCase() + s.slice(1)
    }
  }
}
</script>

<style scoped>
.todoapp {
  background-color: chartreuse;
}
</style>
