<template>
  <v-container>
    <v-row>
      <v-col v-for="(project, index) in projects" :key="index" cols="12" sm="6" md="4">
        <v-card class="card-style">
          <v-card-title class="card-header">
            <div class="d-flex align-center justify-space-between" style="width: 100%;">
              <div class="d-flex align-center">
                <v-avatar size="50">
                  <v-img :src="project.image"></v-img>
                </v-avatar>
                <span class="ml-3">{{ project.name }}</span>
              </div>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list class="rounded-list">
                  <v-list-item @click="editItem(index)">
                    <v-list-item-avatar>
                      <v-icon>mdi-pencil</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title class="ml-2">Edit</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deleteItem(index)">
                    <v-list-item-avatar>
                      <v-icon color="red">mdi-delete</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title class="red-text ml-2">Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card-title>
          <v-card-subtitle>{{ project.type }}</v-card-subtitle>
          <hr />
          <v-card-text class="card-text">
            <div class="dates-container">
              <div class="create-date">Create date: <br /> {{ project.createDay }}</div>
              <div class="last-update">Last update: <br /> {{ project.lastUpdate }}</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProjectList',
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  methods: {
    editItem(index) {
      // Add your edit logic here
      console.log("Edit item", index);
    },
    deleteItem(index) {
      // Add your delete logic here
      console.log("Delete item", index);
    },
  },
}
</script>
