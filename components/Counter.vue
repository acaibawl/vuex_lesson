<template>
  <div>
    <div>
      count: {{ count }}
    </div>
    <div>
      localComputed_countBetweenX: {{ localComputed_countBetweenX }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Counter",
  computed: {
    localComputed_countBetweenX () {
      return 'X' + this.count + 'X';
    },
    // mapStateに書き換え
    //   count () {
    //     return this.$store.state.count
    //   }
    ...mapState([
      'count'
    ])
  }

}
</script>
