<template>
  <v-container>
    <v-row>
      <v-col v-for="(project, index) in projects" :key="index" cols="12" sm="6" md="4">
        <v-card class="card-style">
          <v-card-title class="card-header">
            <div class="d-flex align-center justify-space-between" style="width: 100%;">
              <div class="d-flex align-center">
                <v-avatar size="50">
                  <v-img :src="project.image"></v-img>
                </v-avatar>
                <span class="ml-3">{{ project.name_eng }}</span>
              </div>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                </template>
                <v-list class="rounded-list">
                  <v-list-item @click="editItem(index)">
                    <v-list-item-avatar>
                      <v-icon>mdi-pencil</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title class="ml-2">Edit</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deleteItem(project.id)">
                    <v-list-item-avatar>
                      <v-icon color="red">mdi-delete</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title class="red-text ml-2">Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card-title>
          <v-card-subtitle>{{ project.type }}</v-card-subtitle>
          <hr />
          <v-card-text class="card-text">
            <div class="dates-container">
              <div class="create-date">Create date: <br /> {{ project.createDay }}</div>
              <div class="last-update">Last update: <br /> {{ project.lastUpdate }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ProjectList',
  data() {
    return {
      projects: {
      type: Array,
    }
    };
  },
  methods: {
    editItem(index) {
      // Add your edit logic here
      console.log("Edit item", index);
    },
    async deleteItem(id) {
      try {
        // Gửi yêu cầu xóa sản phẩm tới server
        await axios.patch(`http://127.0.0.1:8080/product/delete/${id}`);
        // Sau khi xóa thành công, phát sự kiện 'productDeleted'
        //this.$emit('productDeleted', id);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
  }
}
</script>
