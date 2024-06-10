<template>
  <v-container>
      <v-row>
          <v-col>
              <h1 class="title">Master Items</h1>
          </v-col>
      </v-row>
      <v-tabs v-model="tab" class="tabs">
          <v-tab>Technologies</v-tab>
          <v-tab>Tools</v-tab>
          <v-tab>Platforms</v-tab>
      </v-tabs>
      <br/>
      <v-tabs-items v-model="tab">
          <v-tab-item>
              <Technologies />
          </v-tab-item>
          <v-tab-item>
              <Tools />
          </v-tab-item>
          <v-tab-item>
              <Platforms />
          </v-tab-item>
      </v-tabs-items>
  </v-container>
</template>

<script>
import Technologies from '../components/Technologies.vue'
import Tools from '../components/Tools.vue'
// import Platforms from '../components/Platforms.vue'

export default {
  components: {
      Technologies,
      Tools,
      // Platforms,
  },
  data() {
      return {
          tab: null,
      }
  },
}
</script>

<style scoped>
</style>