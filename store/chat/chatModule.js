import * as api from '~/api_mock/index'

const state = {
  currentThreadID: null,
  threads: {
    /*
    id: {
      id,
      name,
      messages: [...ids],
      lastMessage
    }
    */
  },
  messages: {
    /*
    id: {
      id,
      threadId,
      threadName,
      authorName,
      text,
      timestamp,
      isRead
    }
     */
  }
}

const mutations = {
  receiveAll (state, messages) {
    let latestMessage;
    messages.forEach(message => {
      // create new thread if the thread doesn't exist
      if (!state.threads[message.threadID]) {
        createThread(state, message.threadID, message.threadName)
      }
      // mark the latest message
      if (!latestMessage || message.timeStamp > latestMessage.timestamp) {
        latestMessage = message
      }
      // add message
      addMessage(state, message)
    })
    // set initial thread to the one with the latest message
    setCurrentThread(state, latestMessage.threadID)
  },

  receiveMessage (state, message) {
    addMessage(state, message)
  },

  switchThread (state, id) {
    setCurrentThread(state, id)
  }
}

function createThread (state, id, name) {
  state.threads = {
    ...state.threads,
    [id]: {
      id,
      name,
      messages: [],
      lastMessage: null
    }
  }
}

function addMessage (state, message) {
  // add a `isRead` field before adding the message
  message.isRead = message.threadID === state.currentThreadID
  // add it to the thread it belongs to
  const thread = state.threads[message.threadID]
  if (!thread.messages.some(id => id === message.id)) {
    thread.messages.push(message.id)
    thread.lastMessage = message
  }
  // add it to the messages map
  state.messages = {
    ...state.messages,
    [message.id]: message
  }
}

function setCurrentThread (state, id) {
  state.currentThreadID = id
  if (!state.threads[id]) {
    debugger
  }
  // mark thread ad read
  state.threads[id].lastMessage.isRead = true
}

const actions = {
  getAllMessages: ({ commit }) => {
    api.getAllMessages(messages => {
      commit('receiveAll', messages)
    })
  },

  sendMessage: ({ commit }, payload) => {
    api.createMessage(payload, message => {
      commit('receiveMessage', message)
    })
  },

  switchThread: ({ commit }, payload) => {
    commit('switchThread', payload)
  }
}

const getters = {
  threads: state => state.threads,

  currentThread: state => {
    return state.currentThreadID
      ? state.threads[state.currentThreadID]
      : {}
  },

  currentMessages: (state, getters) => {
    const thread = getters.currentThread
    return thread.messages
      ? thread.messages.map(id => state.messages[id])
      : []
  },

  unreadCount: ({ threads }) => {
    return Object.keys(threads).reduce((count, id) => {
      return threads[id].lastMessage.isRead ? count : count + 1
    }, 0)
  },

  sortedMessages: (state, getters) => {
    const messages = getters.currentMessages
    return messages.slice().sort((a, b) => a.timestamp - b.timestamp)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  // plugins: process.env.NODE_ENV !== 'production'
  //   ? [createLogger()]
  //   : []
}
