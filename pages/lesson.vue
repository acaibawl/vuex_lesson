<template>
  <div>
    <counter/>
  </div>
</template>

<script>
import Counter from "~/components/Counter";
export default {
  name: "lesson",
  components: {Counter},
  methods: {
    increment() {
      this.$store.commit('increment');
      console.log(this.$store.state.count)
    }
  }
}
</script>

<style scoped>

</style>
