<template>
  <v-container>
    <v-row>
      <v-col v-for="(product, index) in projects" :key="index" cols="12" sm="6" md="4">
        <v-card class="card-style">
          <v-card-title class="card-header">
            <div class="d-flex align-center justify-space-between" style="width: 100%;">
              <div class="d-flex align-center">
                <v-avatar size="50">  
                  <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                </v-avatar>
                <span class="ml-3">{{ product.name_eng }}</span>
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
                  <v-list-item @click="deleteItem(product.ID)">
                    <v-list-item-avatar>
                      <v-icon color="red">mdi-delete</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title class="red-text ml-2">Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card-title>
          <v-card-subtitle>{{ product.type }}</v-card-subtitle>
          <hr />
          <v-card-text class="card-text">
            <div class="dates-container">
              <div class="create-date">Create date: <br /> {{ formatDate(product.createAt) }}</div>
              <div class="last-update">Last update: <br /> {{ formatDate(product.updateAt) }}</div>
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
  name: 'ProductList',
  props: {
    projects: {
      type: Array,
      required: true,
    }
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
         this.$emit('productDeleted', id);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1; // getMonth() trả về giá trị từ 0-11, cần +1 để đúng với tháng
      const year = date.getFullYear();
      return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    }
  },
  data(){
    return{
      image: [
        { src: require("../assets/images/vn_flag.jpg"), alt: "Logo" },]
    }
  },
  // created() {
  //   this.$emit('fetchProducts');
  // },
}
</script>

<style>
.card-style {
  margin: 20px 0;
}
</style>
