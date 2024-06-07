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
          varriant="solo-inverted" @change="filterItems"></v-select>
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
      projects: [
        // Thêm các project khác ở đây
      ],
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
        //link API
        const response = await axios.get('http://127.0.0.1:8080/product/');
        console.log(response)
        this.projects = response.data;
        this.filteredItems = this.projects;
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },
    search() {
      this.filteredItems = this.projects.filter(project =>
        project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filterItems() {
      let filtered = this.projects;
      if (this.selectedType && this.selectedType !== 'All') {
        filtered = filtered.filter(project => project.type === this.selectedType);
      }
      if (this.searchQuery) {
        filtered = filtered.filter(project =>
          project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      this.filteredItems = filtered;
      this.page = 1;
    },
    navigateToAddProduct() {
      // Navigate to Add Product page
      // Your navigation logic here
      this.$router.push({ name: 'AddProductStep1' })
    },
    removeProduct(id) {
      this.projects = this.projects.filter(project => project.id !== id);
      this.filterItems();
    },
  },
  mounted() {
    this.filteredItems = this.projects;
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<!-- <template>
  <v-container>
    <div style="margin-bottom: 1.5%;">
      <h1> Products </h1>
    </div>
    <v-row align="center">
      <v-col cols="12" sm="6" md="4">
        <v-card class="mx-auto" color="surface-light" max-width="400">
          <v-card-text class="pa-0">
            <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact"
              label="Search Product'name" variant="solo" hide-details v-model="searchQuery" outlined
              @keyup.enter="search" @click:append-inner="search"></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4" class="filter">
        <v-select v-model="selectedType" :items="types" label="Filter by Type" clearable density="compact"
          varriant="solo-inverted" @change="filterItems"></v-select>
      </v-col>

      <v-col cols="12" sm="6" md="4" class="text-right">
        <v-btn size="large" prepend-icon="mdi-plus" variant="elevated" class="addbutton" @click="navigateToAddProduct">
          Add Product
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

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
        const response = await axios.get('/api/products');
        this.projects = response.data;
        this.filteredItems = this.projects;
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },
    search() {
      this.filteredItems = this.projects.filter(project =>
        project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filterItems() {
      let filtered = this.projects;
      if (this.selectedType && this.selectedType !== 'All') {
        filtered = filtered.filter(project => project.type === this.selectedType);
      }
      if (this.searchQuery) {
        filtered = filtered.filter(project =>
          project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      this.filteredItems = filtered;
      this.page = 1;
    },
    navigateToAddProduct() {
      this.$router.push({ name: 'AddProductStep1' });
    },
    removeProduct(id) {
      this.projects = this.projects.filter(project => project.id !== id);
      this.filterItems();
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script> -->
