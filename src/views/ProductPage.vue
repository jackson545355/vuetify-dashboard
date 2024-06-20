<template>
  <!-- Product header -->
  <v-container>
    <div style="margin-bottom: 1.5%;">
      <h1> Products </h1>
    </div>
    <v-row align="center">
      <v-col cols="12" sm="6" md="4">
        <!-- Search field -->
        <v-card class="mx-auto" color="surface-light" max-width="400">
          <v-card-text class="pa-0">
            <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact"
              label="Search Product'name" variant="solo" hide-details v-model="searchQuery" outlined
              @keyup.enter="search" @click:append-inner="search"></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4" class="filter">
        <!-- Filter dropdown -->
        <v-select v-model="selectedType" :items="types" label="Filter by Type" clearable density="compact"
          varriant="solo" oulined @change="filterItems"></v-select>
      </v-col>

      <v-col cols="12" sm="6" md="4" class="text-right">
        <!-- Add Product button -->
        <v-btn size="large" prepend-icon="mdi-plus" variant="elevated" class="addbutton" @click="navigateToAddProduct">
          Add Product
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <!-- List card -->
  <ProductList :projects="paginatedItems" @productDeleted="removeProduct" />

  <div class="pagination">
    <v-pagination v-model="page" :length="paginationLength" next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"></v-pagination>
  </div>
</template>

<script>
import axios from 'axios';
import ProductList from '../components/ProductList.vue';
import '../assets/css/ProductPage.css';

export default {
  components: { ProductList },
  data() {
    return {
      searchQuery: '',
      selectedType: '',
      types: ['All', 'Web', 'Mobile App', 'Dashboard'],
      projects: [],
      filteredItems: [],
      loading: false,
      page: 1,
      itemsPerPage: 12,
    };
  },
  computed: {
    paginationLength() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      console.log(this.filteredItems.slice(start, end))
      return this.filteredItems.slice(start, end);
    },
  },
  watch: {
    searchQuery() {
      this.filterItems();
    },
    selectedType() {
      this.filterItems();
    },
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await axios.get('http://127.0.0.1:4000/products/');
        this.projects = response.data;
        this.filteredItems = this.projects;
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },
    search() {
      this.filterItems(); // Use filterItems to handle the search logic
    },
    filterItems() {
      let filtered = this.projects;

      if (this.selectedType && this.selectedType !== 'All') {
        filtered = filtered.filter(project => project.type === this.selectedType);
      }

      if (this.searchQuery) {
        const searchQueryLower = this.searchQuery.toLowerCase();
        filtered = filtered.filter(project =>
          project.name_eng?.toLowerCase().includes(searchQueryLower)
        );
      }

      this.filteredItems = filtered;
      this.page = 1; // Reset to the first page after filtering
    },
    navigateToAddProduct() {
      this.$router.push({ name: 'AddProductStep1' });
    },
    removeProduct(id) {
      this.projects = this.projects.filter(project => project.id !== id);
      this.filteredItems = this.projects;
      this.fetchProducts();
      this.filterItems();
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style>
.custom-breadcrumbs {
  margin-bottom: 20px;
}

.redstar {
  color: red;
}
</style>
