<template>
  <v-app>
    <v-layout>
      <div class="dashboard">
        <div class="content" :class="{ expanded: isSidebarCollapsed }">
          <Header
            class="header"
            :class="{ expanded: isSidebarCollapsed }"
            @toggleSidebar="toggleSidebar"
          />
          <v-main>
            <router-view />
          </v-main>
        </div>
      </div>
      <Sidebar v-if="!isSidebarCollapsed" />
    </v-layout>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";
import "./assets/css/ProductPage.css";

export default {
  name: "App",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      isSidebarCollapsed: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
  },
};
</script>

<style>
/* Add your styles here */
nav {
  display: flex;
  gap: 10px;
}
</style>
