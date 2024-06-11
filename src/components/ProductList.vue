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

    <v-dialog v-model="editDialog" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Product</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <h1>Please edit your information!</h1>
            <br />
            <h2>Basic</h2>
            <br />
            <h4>Product name</h4>
            <v-text-field label="English" v-model="productNameEn"></v-text-field>
            <v-text-field label="日本語" v-model="productNameJp"></v-text-field>
            <h4>Short description</h4>
            <v-text-field label="English" v-model="shortDescriptionEn"></v-text-field>
            <v-text-field label="日本語" v-model="shortDescriptionJp"></v-text-field>
            <h4>Full description</h4>
            <v-textarea label="English" v-model="fullDescriptionEn"></v-textarea>
            <v-textarea label="日本語" v-model="fullDescriptionJp"></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="validateForm">Submit</v-btn>
          <v-btn color="secondary" @click="editDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  data() {
    return {
      editDialog: false,
      productIndex: null,
      productId: null,
      productNameEn: '',
      productNameJp: '',
      shortDescriptionEn: '',
      shortDescriptionJp: '',
      fullDescriptionEn: '',
      fullDescriptionJp: '',
    };
  },
  methods: {
    editItem(index) {
      const product = this.projects[index];
      this.productIndex = index;
      this.productId = product.ID;
      this.productNameEn = product.name_eng;
      this.productNameJp = product.name_jp;
      this.shortDescriptionEn = product.sdescription_eng;
      this.shortDescriptionJp = product.sdescription_jp;
      this.fullDescriptionEn = product.fdescription_eng;
      this.fullDescriptionJp = product.fdescription_jp;
      this.editDialog = true;
    },
    async deleteItem(id) {
      try {
        await axios.patch(`http://127.0.0.1:8080/product/delete/${id}`);
        this.$emit('productDeleted', id);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    validateForm() {
      if (this.$refs.form.validate()) {
        this.submitForm();
      } else {
        console.warn('Form validation failed');
      }
    },
    async submitForm() {
      try {
        const product = {
          name_eng: this.productNameEn,
          name_jp: this.productNameJp,
          sdescription_eng: this.shortDescriptionEn,
          sdescription_jp: this.shortDescriptionJp,
          fdescription_eng: this.fullDescriptionEn,
          fdescription_jp: this.fullDescriptionJp,
        };
        console.log('Submitting form with data:', product);
        const response = await axios.patch(`http://127.0.0.1:8080/product/edit/${this.productId}`, { data: product });
        console.log('Product updated:', response.data);
        if (response.status === 200) {
          this.$emit('productUpdated', this.productIndex, product);
          this.editDialog = false;
          window.location.reload();
        } else {
          console.error('Failed to update product:', response);
        }
      } catch (error) {
        console.error('Error editing product:', error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    }
  }
};
</script>

<style>
.card-style {
  margin: 20px 0;
}
</style>
