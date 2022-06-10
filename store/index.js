export const state = () => ({
  count: 0,
  todos: [
    { id: 1, text: 'todo1です', done: true},
    { id: 2, text: 'todo2です', done: false}
  ],
  cart: {
    added: []
  }
});

// ミューテーションハンドラ
// stateに対する専用のセッターみたいなやつ
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

// アクションハンドラ storeを包括するcontextを引数に受け取る
// ミューテーションは同期的処理しか入れられないので、ミューテーションの前段で非同期的な処理をしたいときに用いる
// vueコンポーネント側で呼び出す時は、this.$store.dispatch('xxx')またはmapActionsヘルパーでmethodsにマッピングして呼び出す
export const actions = {
  increment (context) {
    context.commit('increment')
  },
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  },
  checkout ({ commit, state }, products) {
    // 本来は別のファイルに定義するべき
    const types = {
      CHECKOUT_REQUEST: 'CHECKOUT_REQUEST',
      CHECKOUT_SUCCESS: 'CHECKOUT_SUCCESS',
      CHECKOUT_FAILURE: 'CHECKOUT_FAILURE'
    }

    // 現在のカート内の商品を保存する
    const savedCartItems = [...state.cart.added]
    // チェックアウトのリクエストを送信し、楽観的にカート内をクリアする
    commit(types.CHECKOUT_REQUEST)
    // shop API は成功時のコールバックと失敗時のコールバックを受け取る
    shop.buyProducts(
      products,
      // 成功時の処理
      () => commit(types.CHECKOUT_SUCCESS),
      // 失敗時の処理
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  },
  // dispatch（アクションの呼び出し）は、トリガーされたアクションハンドラによって返されたPromiseを処理できる
  async actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('sommeMutation')
        resolve()
      }, 1000)
    })
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 'actionA'が完了するのを待機する
    commit('gotOtherData', await getOtherData())
  }
}

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
