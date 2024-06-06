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
  <ProductList :projects="paginatedItems" />

  <div class="pagination">
    <v-pagination v-model="page" :length="paginationLength" next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"></v-pagination>
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
          id: 1,
          image: './assets/images/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          id: 2,
          image: './assets/logo.png',
          name: 'ABC',
          type: "Mobile App",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          id: 3,
          image: './assets/logo.png',
          name: 'GHJ',
          type: "Dashboard",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          id: 4,
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          id: 5,
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          id: 6,
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          id: 7,
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          id: 8,
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          id: 9,
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          id: 10,
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          id: 11,
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          id: 12,
          image: './assets/logo.png',
          name: 'HRGs',
          type: "Web",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          id: 13,
          image: './assets/logo.png',
          name: 'ABC',
          type: "Mobile App",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          id: 14,
          image: './assets/logo.png',
          name: 'ABC',
          type: "Mobile App",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          id: 15,
          image: './assets/logo.png',
          name: 'ABC',
          type: "Mobile App",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
        {
          id: 16,
          image: './assets/logo.png',
          name: 'ABC',
          type: "Mobile App",
          createDay: '20/10/2023',
          lastUpdate: '20/10/2023',
        },
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
  },
  mounted() {
    this.filteredItems = this.projects;
  },
};
</script>
