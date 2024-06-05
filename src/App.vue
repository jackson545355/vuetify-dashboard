<template>
  <v-app>
    <div class="dashboard">
      <Sidebar />
      <div class="content">
        <Header />
        <nav>
          <router-link to="/dashboard/Home">Home aaa</router-link>
          <router-link to="/dashboard/Product">Product</router-link>
          <router-link to="/dashboard/Comments">Comments</router-link>
          <router-link to="/dashboard/Management">Management</router-link>
        </nav>
        <v-main>
          <router-view />
        </v-main>
      </div>
    </div>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import './assets/css/ProductPage.css'

export default {
  name: 'App',
  components: {
    Sidebar,
    Header,
  }
}
</script>

<style>
/* Add your styles here */
nav {
  display: flex;
  gap: 10px;
}
</style>
