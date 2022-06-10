export const state = () => ({
  count: 0,
  todos: [
    { id: 1, text: 'todo1です', done: true},
    { id: 2, text: 'todo2です', done: false}
  ]
});

// ミューテーションハンドラ
export const mutations = {
  // タイプが"increment"のミューテーションがトリガーされたときにこのハンドラが呼ばれるというイベント登録
  increment (state) {
    state.count++
  },
  add (state, payload) {
    // ペイロードはオブジェクトにする
    state.count += payload.amount
  }
};

// gettersで、stateを扱う汎用的なプロパティを作成できる
export const getters = {
  doneTodos (state) {
    return state.todos.filter(todo => todo.done);
  },
  doneTodosCount (state, getters) {
    return getters.doneTodos.length;
  },
  // 関数を返り値にすることで、引数をとるゲッターも作れる
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id);
  }
}
