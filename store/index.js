export const state = () => ({
  count: 0,
  todos: [
    { id: 1, text: 'todo1です', done: true},
    { id: 2, text: 'todo2です', done: false}
  ]
});

export const mutations = {
  increment (state) {
    state.count++
  }
};
