<template>
  <ul>
    <li
      v-for="product in products"
      :key="product.id">
      {{ product.title }} - {{ currency(product.price) }}
      <br>
      <button
        :disabled="!product.inventory"
        @click="addProductToCart(product)">
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { currency } from '~/currency'

export default {
  computed: mapState('modules/products', {
    products: state => state.all
  }),
  methods: {
    ...mapActions('modules/cart', [
      'addProductToCart'
    ]),
    currency
  },
  created () {
    this.$store.dispatch('modules/products/getAllProducts')
  }
}
</script>
