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
hr {
  border: 0;
  height: 1px;
  background-color: gray;
  margin: 20px 0;
}
span{
  font-weight: 500;
  color: black;
}
.v-selection-control__wrapper{
  margin-top: 20px;
}

</style>
