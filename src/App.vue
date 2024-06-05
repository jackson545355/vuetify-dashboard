<template>
  <v-app>
    <div class="dashboard">
      <Sidebar />
      <div class="content">
        <Header />
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
