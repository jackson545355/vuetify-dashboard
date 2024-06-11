<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <!-- Dialog for adding technology -->
    <v-dialog v-model="addDialog" max-width="600px" class="ma-20">
      <v-card rounded="lg">
        <v-card-title>
          <span class="headline">{{ editMode ? 'Edit' : 'Add' }} Technology</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12" sm="3">
                <v-img :src="logo || require('../assets/images/defaultLogo.png')" max-height="100" max-width="100" class="mt-2"></v-img>
              </v-col>
              <v-col cols="12" sm="9">
                <v-file-input v-model="logoFile" label="Logo" prepend-icon="mdi-upload" accept="image/png, image/jpeg, image/svg+xml" outlined variant="outlined" required @change="onFileChange"></v-file-input>
                <small class="caption">
                  Logo must be .SVG or PNG
                  <br />
                  Recommended size 240 x 240 px
                </small>
              </v-col>
              <v-col>
                <v-text-field v-model="technologyName" label="Technology name" variant="outlined" :rules="[v => !!v || 'Technology name is required']" required></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" size="large" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="black" size="large" variant="elevated" :disabled="!valid" @click="editMode ? updateTechnology() : saveTechnology()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        addDialog: false,
        editMode: false,
        valid: false,
        logo: '',
        logoFile: null,
        technologyName: '',
        technology: null,
      };
    },
    methods: {
      openAddDialog() {
        this.editMode = false;
        this.resetForm();
        this.addDialog = true;
      },
      openEditDialog(technology) {
        this.editMode = true;
        this.technology = technology;
        this.logo = technology.logo;
        this.technologyName = technology.name;
        this.addDialog = true;
      },
      closeDialog() {
        this.addDialog = false;
      },
      resetForm() {
        this.logo = '';
        this.logoFile = null;
        this.technologyName = '';
      },
      onFileChange(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.logo = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      saveTechnology() {
        // Thêm logic lưu mới
        this.closeDialog();
      },
      updateTechnology() {
        // Thêm logic cập nhật
        this.technology.logo = this.logo;
        this.technology.name = this.technologyName;
        this.closeDialog();
      },
    },
  };
  </script>
  