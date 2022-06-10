<template>
  <div>
    Clicked: {{ $store.state.counter.counterModule.count }} times, count is {{ evenOrOdd }}
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
  </div>
</template>

<script>
import { mapGetters, mapActions} from "vuex";

export default {
  name: "CounterPage",
  computed: mapGetters('counter/counterModule', [
    'evenOrOdd'
  ]),
  methods: mapActions('counter/counterModule', [
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])
}
</script>

<style scoped>
button {
  display: block;
  border: orange solid 3px;
  padding: 3px;
}
</style>
