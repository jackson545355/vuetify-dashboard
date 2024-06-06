<template>
  <!-- Product header -->
  <v-container>
    <div style="margin-bottom: 1.5%;">
      <h1> Products </h1>
    </div>
    <v-row>
      <v-col cols="12" sm="1" md="3">
        <!-- Search field -->
        <v-card class="mx-auto" color="surface-light" max-width="400">
          <v-card-text class="pa-0">
            <v-text-field
              :loading="loading"
              append-inner-icon="mdi-magnify"
              density="compact"
              label="Search Product'name"
              variant="solo"
              hide-details
              v-model="searchQuery"
              outlined
              @keyup.enter="search"
              @click:append-inner="search"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4" md="2">
        <!-- Filter dropdown -->
        <v-select
          v-model="selectedType"
          density="compact"
          :items="types"
          label="Filter by Type"
          outlined
          full-width
          @change="filterItems"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="4" md="2.5">
        <!-- Bottom navigation -->
        <v-btn
          size="large"
          prepend-icon="mdi-plus"
          variant="elevated"
          class="addbuttom"
          @click="navigateToAddProduct"
        >
          Add Product
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <!-- List card -->
  <ProductList :projects="filteredItems" />
  
  <div class="pagination">
    <v-pagination
      v-model="page"
      :length="paginationLength"
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"
    ></v-pagination>
  </div>
</template>

<script>
import ProductList from '../components/ProductList.vue';
import '../assets/css/ProductPage.css';

export default {
  components: { ProductList },
  data() {
    return {
      searchQuery: '',
      selectedType: '',
      types: ['All', 'Web', 'Mobile App', 'Dashboard'],
      projects: [
        {
          image: './assets/images/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          image: './assets/logo.png',
          name: 'ABC',
          type: "Mobile App",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          image: './assets/logo.png',
          name: 'GHJ',
          type: "Dashboard",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
      ],
      filteredItems: [],
      loading: false,
      page: 1,
      paginationLength: 4,
    };
  },
  watch: {
    searchQuery() {
      this.search();
    },
    selectedType() {
      this.filterItems();
    },
  },
  methods: {
    search() {
      this.filteredItems = this.projects.filter(project =>
        project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filterItems() {
      if (this.selectedType === 'All' || this.selectedType === '') {
        this.filteredItems = this.projects;
      } else {
        this.filteredItems = this.projects.filter(
          project => project.type === this.selectedType
        );
      }
    },
    navigateToAddProduct() {
      this.$router.push({ name: 'AddProductStep1' });
    },
  },
  mounted() {
    this.filteredItems = this.projects;
  },
};
</script>
