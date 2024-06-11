<template>
    <div>
      <v-btn color="primary" @click="editDialog = true">Edit Product</v-btn>
      <v-dialog v-model="editDialog" max-width="800px">
        <v-card>
          <v-card-text>
            <v-form ref="form">
              <h1>Please edit your information!</h1>
              <br />
              <h2>Basic</h2>
              <br />
              <h4>Product name </h4>
              <v-text-field label="English" v-model="productNameEn"></v-text-field>
              <v-text-field label="日本語" v-model="productNameJp" ></v-text-field>
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
            <v-btn color="secondary" @click="dialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import "../assets/css/AddProductStep1.css";
  export default {
    name: "DialogExample",
    data: () => ({
      editDialog: false,
      productNameEn: '',
      productNameJp: '',
      shortDescriptionEn: '',
      shortDescriptionJp: '',
      fullDescriptionEn: '',
      fullDescriptionJp: '',
    }),
    methods: {
      validateForm() {
        if (this.$refs.form.validate()) {
          this.submitForm();
        } else {
          console.warn('Form validation failed');
        }
      },
      async submitForm() {
        try {
          console.log('Submitting form with data:', {
            name_eng: this.productNameEn,
            name_jp: this.productNameJp,
            sdescription_eng: this.shortDescriptionEn,
            sdescription_jp: this.shortDescriptionJp,
            fdescription_eng: this.fullDescriptionEn,
            fdescription_jp: this.fullDescriptionJp,
          });
          const response = await axios.post('http://localhost:8080/product/edit', {
            data: {
              name_eng: this.productNameEn,
              name_jp: this.productNameJp,
              sdescription_eng: this.shortDescriptionEn,
              sdescription_jp: this.shortDescriptionJp,
              fdescription_eng: this.fullDescriptionEn,
              fdescription_jp: this.fullDescriptionJp,
            }
          });
          console.log('Product updated:', response.data);
          this.editDialog = false; // Close the dialog after submission
        } catch (error) {
          console.error('Error adding product:', error);
        }
      },
    },
  };
  </script>
  
  <style>
  .custom-breadcrumbs {
    margin-bottom: 20px;
  }
  </style>
  