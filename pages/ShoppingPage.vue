<template>
  <div>
    <h1>Shopping Cart Example</h1>
    <hr>
    <h2>Products</h2>
    <ProductList />
    <hr>
    <ShoppingCart />
  </div>
</template>

<script>
import ProductList from "~/components/Shopping/ProductList";
import ShoppingCart from "~/components/Shopping/ShoppingCart";

export default {
  components: {ShoppingCart, ProductList}
}
</script>
