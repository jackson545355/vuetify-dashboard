<template>
  <v-card flat>
    <v-container>
      <v-card-text>
        <h1>Recheck product information and submit</h1>
        <br/>
        <v-row>
          <v-col cols="12" class="d-flex align-center justify-space-between" style="margin-bottom: -50px;">
            <span class="mr-2">Active</span>
            <v-switch v-model="activeSwitch" color="primary"></v-switch>
            <!-- <v-switch
              v-model="activeSwitch"
              :label="performance ? 'On' : 'Off'"
              color="blue-darken-4"
              density="compact"
              hide-details
              inline
              inset
            ></v-switch> -->
          </v-col>
          <v-col cols="12" class="d-flex align-center justify-space-between">
            <span class="mr-2">Show on the home page</span>
            <v-switch v-model="showSwitch" color="primary"></v-switch>
          </v-col>
        </v-row>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import '../assets/css/AddProductStep3.css'
export default {
  name: 'AddProductStep3',
  data(){
    return {
      activeSwitch: false,
      showSwitch: false
    }
  }
};
</script>

<style scoped>


</style>
