<template>
  <div class="dashboard">
    <Sidebar />
    <div class="content">
      <Header />
      <ProductList />
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue'
import ProductList from '../components/ProductList.vue'
import '../assets/css/ProductPage.css'

export default {
  name: 'ProductPage',
  components: {
    Sidebar,
    Header,
    ProductList
  }
}
</script>