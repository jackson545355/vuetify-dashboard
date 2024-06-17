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
          <hr style="margin-top:10px; margin-bottom:0px"/>
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
        <v-card-text>
          <h1>Edit your product information and submit!</h1>
          <br />
          <h2>Basic</h2>
          <br/>
          <v-form ref="form">
            <h4>Product name <span class="redstar">*</span></h4>
            <v-text-field label="English" v-model="productNameEn" required variant="solo"
              :rules="[v => !!v || 'Product Name is required']"></v-text-field>
            <v-text-field label="日本語" v-model="productNameJp" required variant="solo"
              :rules="[v => !!v || '製品名は必須です']"></v-text-field>
            <h4>Short description <span class="redstar">*</span></h4>
            <v-text-field label="English" v-model="shortDescriptionEn" required variant="solo"
              :rules="[v => !!v || 'Short description is required']"></v-text-field>
            <v-text-field label="日本語" v-model="shortDescriptionJp" required variant="solo"
              :rules="[v => !!v || '簡単な説明が必要です']"></v-text-field>
            <h4>Full description <span class="redstar">*</span></h4>
            <v-textarea label="English" v-model="fullDescriptionEn" required variant="solo"
              :rules="[v => !!v || 'Full description is required']"></v-textarea>
            <v-textarea label="日本語" v-model="fullDescriptionJp" required variant="solo"
              :rules="[v => !!v || '完全な説明が必要です']"></v-textarea>
            <hr />
            <h2>Status <span class="redstar">*</span></h2>
            <br />
            <v-radio-group v-model="status" :rules="[v => !!v || 'Status is required']" row>
              <v-radio label="Demo" value="demo"></v-radio>
              <v-radio label="Implementing" value="implementing"></v-radio>
            </v-radio-group>
            <hr />

            <h2>Techniques</h2>
            <br />
            <h4>Platform Tag <span class="redstar">*</span></h4>
            <v-select :items="platformTags" label="Platform Tag" v-model="platformTag" required variant="solo"
              :rules="[v => !!v || 'Platform Tag is required']"></v-select>
            <h4>Technology Framework <span class="redstar">*</span></h4>
            <v-select :items="technologyFrameworks" label="Technology Frameworks" v-model="technologyFramework" required
              variant="solo" :rules="[v => !!v || 'Technology Frameworks is required']"></v-select>
            <h4>Tools <span class="redstar">*</span></h4>
            <v-select :items="tools" label="Tool" v-model="tool" required variant="solo"
              :rules="[v => !!v || 'Tool is required']"></v-select>
            <hr />

            <!-- Logo Section -->
            <h2>Logo <span class="redstar">*</span></h2>
            <v-row class="mb-4 logo-section">
              <v-col cols="12" sm="2">
                <v-img :src="logoPreview || require('../assets/images/defaultLogo.png')" max-height="100"
                  max-width="100" class="mt-2"></v-img>
              </v-col>
              <v-col cols="12" sm="4">
                <v-file-input v-model="logo" label="Upload" prepend-icon="mdi-upload"
                  accept="image/png, image/jpeg, image/svg+xml" outlined variant="solo" required @change="onLogoChange"
                  class="centered-label"></v-file-input>
                <small class="caption">
                  Logo must be .SVG or PNG
                  <br />
                  Recommended size 240 x 240 px
                </small>
              </v-col>
            </v-row>
            <hr />

            <!-- Gallery Section -->
            <h2>Gallery</h2>
            <br />
            <h4>Screenshots<span class="redstar">*</span></h4>
            <h4 style="color: grey; margin-top:10px; font-weight:400">Upload limit 3 screenshots of product</h4>
            <div class="dashed-border">
              <v-img :src="selectedScreenshot || screenshots[0]" class="screenshot" max-height="500px" contain></v-img>
              <p v-if="!screenshots.length">Drag and drop or click to upload</p>
            </div>

            <!-- Gallery of Uploaded Images -->
            <v-row class="mt-4 gallery">
              <v-col v-for="(screenshot, index) in screenshots.slice(0)" :key="index" cols="12" sm="2">
                <v-hover v-slot:default="{ isHovering }">
                  <v-card class="screenshot-card">
                    <v-img :src="screenshot" height="100px" @click="selectScreenshot(screenshot)"></v-img>
                    <v-btn v-if="isHovering" icon small class="delete-btn" @click="removeScreenshot(index + 1)">
                      <v-icon color="red">mdi-close</v-icon>
                    </v-btn>
                    <v-btn v-if="isHovering" icon small class="edit-btn" @click="editScreenshot(index + 1)">
                      <v-icon color="blue">mdi-pencil</v-icon>
                    </v-btn>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
            <br />

            <!-- File Input for Uploading Images -->
            <v-file-input ref="fileInputRef" v-model="newImage" label="Upload Screenshots" variant="solo"
              prepend-icon="mdi-upload" accept="image/*" outlined multiple
              @change="onScreenshotsChange(newImage)"></v-file-input>
            <hr />

            <!-- Links Section -->
            <h2>Links</h2>
            <br />
            <h4>Intropage </h4>
            <v-text-field v-model="introPageLink" label="Intro Page Link" variant="solo" outlined dense></v-text-field>
            <h4>Web </h4>
            <v-text-field v-model="webLink" label="Web Link" variant="solo" outlined dense></v-text-field>
            <h4>Android </h4>
            <v-text-field v-model="androidLink" label="Android Link" variant="solo" outlined dense></v-text-field>
            <h4>iOS </h4>
            <v-text-field v-model="iosLink" label="iOS Link" variant="solo" outlined dense></v-text-field>
            <hr />

            <!-- Active, Show on the home page -->
            <v-row>
              <v-col cols="12" class="d-flex align-center justify-space-between" style="margin-bottom: -50px;">
                <span class="mr-2">Active</span>
                <v-switch v-model="activeSwitch" color="primary"></v-switch>
              </v-col>
              <v-col cols="12" class="d-flex align-center justify-space-between">
                <span class="mr-2">Show on the home page</span>
                <v-switch v-model="showSwitch" color="primary"></v-switch>
              </v-col>
            </v-row>
          </v-form>
          <h4 style="color: grey; text-align:center;">Click the button "Submit" below to save your edit the product
            information.
          </h4>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="editDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="validateForm">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';
import '../assets/css/AddProductStep1.css'
import '../assets/css/AddProductStep2.css'
import '../assets/css/AddProductStep3.css'

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
      //Basic
      productNameEn: '',
      productNameJp: '',
      shortDescriptionEn: '',
      shortDescriptionJp: '',
      fullDescriptionEn: '',
      fullDescriptionJp: '',
      //Status
      status: '',
      //Technologies
      platformTag: '',
      technologyFramework: '',
      tool: '',
      platformTags: ['Tag1', 'Tag2', 'Tag3'],
      technologyFrameworks: ['Framework1', 'Framework2', 'Framework3'],
      tools: ['Tool1', 'Tool2', 'Tool3'],
      //Logo
      logo: null,
      logoPreview: null,
      //Screenshots
      screenshots: [],
      newImage: null,
      selectedScreenshot: null,
      //Links
      introPageLink: '',
      webLink: '',
      androidLink: '',
      iosLink: '',
      //Active - Show
      activeSwitch: false,
      showSwitch: false
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
