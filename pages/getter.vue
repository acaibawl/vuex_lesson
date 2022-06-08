<template>
  <div>
    <div>
      doneTodosCount: {{ doneTodosCount }}
    </div>
    <div>
      <input v-model="todoId" type="text">
      <button @click="consoleOutTodo(todoId)">コンソール出力する</button>
      <div>todoId: {{ todoId }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "getter",
  data() {
    return {
      todoId: 2,
    };
  },
  methods: {
    getTodoByIdMethod (id) {
      // storeの引数をとるゲッターは、画面読み込み時のみ動く処理になる。
      return this.$store.getters.getTodoById(id);
    },
    consoleOutTodo (id) {
      console.log(this.getTodoByIdMethod(id));
    }
  },
  computed: {
    // mapGettersを使って、storeのゲッターを同名の算出プロパティにマッピングさせる
    // doneTodosCount () {
    //   return this.$store.getters.doneTodosCount;
    // }
    ...mapGetters([
      'doneTodosCount',
    ])
  }
}
</script>
