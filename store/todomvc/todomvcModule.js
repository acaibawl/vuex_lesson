import { createLogger } from 'vuex'

const STORAGE_KEY = 'todos-vuejs'

const state = {
  todos: getTodosInit()
}

function getTodosInit() {
  if (process.client) {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  } else {
    return []
  }
}

// for testing
// if (navigator.webdriver) {
//   window.localStorage.clear()
// }

const mutations = {
  addTodo (state, todo) {
    state.todos.push(todo)
  },

  removeTodo (state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },

  editTodo (state, { todo, text = todo.text, done = todo.done }) {
    const index = state.todos.indexOf(todo)

    state.todos.splice(index, 1, {
      ...todo,
      text,
      done
    })
  }
}

const actions = {
  addTodo ({ commit }, text) {
    commit('addTodo', {
      text,
      done: false
    })
  },

  removeTodo ({ commit }, todo) {
    commit('removeTodo', todo)
  },

  toggleTodo ({ commit }, todo) {
    commit('editTodo', { todo, done: !todo.done})
  },

  editTodo ({ commit }, { todo, value }) {
    commit('editTodo', { todo, text: value })
  },

  toggleAll ({ state, commit }, done) {
    state.todos.forEach((todo) => {
      commit('editTodo', { todo, done })
    })
  },

  clearCompleted ({ state, commit }) {
    state.todos.filter(todo => todo.done)
      .forEach(todo => {
        commit('removeTodo', todo)
      })
  }
}

function localStoragePlugin (store) {
  store.subscribe((mutation, { todos }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger(), localStoragePlugin]
    : [localStoragePlugin]
}
