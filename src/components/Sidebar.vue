<template>
    <v-navigation-drawer app>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img src="https://via.placeholder.com/150x50.png?text=Cube+System" alt="Logo">
          </v-list-item-avatar>
        </v-list-item>
  
        <v-divider></v-divider>
  
        <v-list-item-group>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
  
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-box</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Products</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
  
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-comment</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Comments</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
  
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Management</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script>
  export default {
    name: 'SidebarPage'
  }
  </script>
  