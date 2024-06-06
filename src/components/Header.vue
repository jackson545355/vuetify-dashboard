<template>
  <v-app-bar app color="white" flat class="header">
    <button @click="$emit('toggleSidebar')" class="toggle-button">
      <img src="https://cdn.icon-icons.com/icons2/916/PNG/512/Menu_icon_2_icon-icons.com_71856.png" alt="Menu Icon" />
    </button>
    <v-spacer></v-spacer>
    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn class="flag-button" v-bind="props">
          <v-img
            :src="currentImage.src"
            :alt="currentImage.alt"
            height="24"
            width="24"
            contain
          ></v-img>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list class="bordered-image">
        <v-list-item v-for="(image, index) in images" :key="index" @click="selectImage(image) ">
          <v-list-item-avatar>
             <v-img :src="image.src" :alt="image.alt" height="24" width="24" contain center></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-avatar size="40" class="flag-button">
      <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="Avatar">
    </v-avatar>
  </v-app-bar>
</template>

<script>
import '../assets/css/Header.css'
export default {
  name: 'HeaderPage',
  data() {
    return {
      currentImage: { src: require('../assets/images/vn_flag.jpg'), alt: 'Logo' },
      images: [
        { src: require('../assets/images/vn_flag.jpg'), alt: 'Logo' },
        { src: require('../assets/images/america_flag.jpg'), alt: 'Another Image' },
        { src: require('../assets/images/uc_flag.jpg'), alt: 'Yet Another Image' }
      ]
    };
  },
  methods: {
    selectImage(image) {
      this.currentImage = image;
      console.log('Selected image:', image);
    }
  },
  props: {
    msg: String,
  },
};
</script>