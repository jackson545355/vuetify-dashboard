<template>
  <v-card flat>
    <v-container>
      <v-card-text>
        <h1>The best product media to show</h1>
        <br />

        <!-- Logo Section -->
        <h2>Logo <span class="redstar">*</span></h2>
        <v-row class="mb-4 logo-section">
          <v-col cols="12" sm="2">
            <v-img :src="logoPreview || require('../assets/images/defaultLogo.png')" max-height="100" max-width="100"
              class="mt-2"></v-img>
          </v-col>
          <v-col cols="12" sm="3">
            <v-file-input v-model="logo" label="Upload" prepend-icon="mdi-upload"
              accept="image/png, image/jpeg, image/svg+xml" outlined variant="solo" 
              required @change="onLogoChange"
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
                <v-btn
                  v-if="isHovering"
                  icon
                  small
                  class="delete-btn"
                  @click="removeScreenshot(index + 1)"
                >
                  <v-icon color="red">mdi-close</v-icon>
                </v-btn>
                <v-btn
                  v-if="isHovering"
                  icon
                  small
                  class="edit-btn"
                  @click="editScreenshot(index + 1)"
                >
                  <v-icon color="blue">mdi-pencil</v-icon>
                </v-btn>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <br/>
        <!-- File Input for Uploading Images -->
        <v-file-input
          ref="fileInputRef"
          v-model="newImage"
          label="Upload Screenshots"
          variant="solo"
          prepend-icon="mdi-upload"
          accept="image/*"
          outlined
          multiple
          @change="onScreenshotsChange(newImage)"
        ></v-file-input>

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

        <h4 style="color: grey; text-align:center;">Click to below button or "Launch checklist" part on tab bar to
          review
          for submit new product
        </h4>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import '../assets/css/AddProductStep2.css';

export default {
  name: 'AddProductStep2',
  data() {
    return {
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
    };
  },
  methods: {
    // Logo
    onLogoChange() {
      if (this.logo) {
        this.logoPreview = URL.createObjectURL(this.logo);
      }
    },
    // Screenshots
    onScreenshotsChange(event) {
      const files = Array.from(event);
      const newScreenshots = files.map(file => URL.createObjectURL(file));
      this.screenshots = [...newScreenshots, ...this.screenshots];
    },
    selectScreenshot(screenshot) {
      this.selectedScreenshot = screenshot;
    },
    removeScreenshot(index) {
      this.screenshots.splice(index, 1);
    },
    editScreenshot(index) {
      alert('Edit screenshot: ' + index);
    },
  },
};
</script>

<style>

</style>
