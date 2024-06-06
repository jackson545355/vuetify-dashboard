<template>
  <v-navigation-drawer app class="['sidebar', { collapsed: isCollapsed }]">
    <v-list>
      <v-list-item class="sidebar-logo">
        <v-list-item-avatar>
          <img :src="logoSrc" alt="Logo" class="logo">
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item-group>
        <router-link 
          v-for="item in items" 
          :key="item.title" 
          :to="item.to" 
          class="router-link"
          active-class="active-link"
        >
          <v-list-item class="menu-item">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="item"><h3>{{ item.title }}</h3></v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import '../assets/css/Sidebar.css'

export default {
  name: 'SidebarPage',
  data() {
    return {
      logoSrc: require('../assets/images/cubelogo.jpg'),
      items: [
        { title: 'Home', to: '/dashboard/Home', icon: 'mdi-home' },
        { title: 'Products', to: '/dashboard/Product', icon: 'mdi-package' },
        { title: 'Comments', to: '/dashboard/Comments', icon: 'mdi-comment' },
        { title: 'Management', to: '/dashboard/Management', icon: 'mdi-cog' }
      ]
    }
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  }
}
</script>