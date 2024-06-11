<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="title">Master Items</h1>
      </v-col>
    </v-row>
    <v-tabs v-model="tab" class="tabs">
      <v-tab to="/dashboard/MasterItems/technologies">Technologies</v-tab>
      <v-tab to="/dashboard/MasterItems/tools">Tools</v-tab>
      <v-tab to="/dashboard/MasterItems/platforms">Platforms</v-tab>
    </v-tabs>
    <br/>
    <v-tabs-items v-model="tab">
      <router-view />
    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tab: this.$route.path.split('/').pop(), // Lấy tên tab từ URL
    }
  },
  watch: {
    '$route'(to) {
      this.tab = to.path.split('/').pop()
    }
  },
}
</script>

<style scoped>
</style>
