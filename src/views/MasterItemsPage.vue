<template>
  <div class="data-table-container">
    <v-toolbar flat>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        hide-details
        class="search-bar"
        single-line
        outlined
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn color="red" class="mx-2" @click="deleteSelected">Delete</v-btn>
      <v-btn color="black" class="mx-2" @click="dialog = true">
        <v-icon left>mdi-plus</v-icon>
        Add technology
      </v-btn>
    </v-toolbar>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="filteredItems"
      item-value="name"
      show-select
      class="elevation-1"
      :items-per-page="itemsPerPage"
      :search="search"
    >
      <template v-slot:headers="props">
        <tr>
          <th class="text-left" style="width: 5%">
            <v-checkbox
              v-model="props.all"
              :indeterminate="props.indeterminate"
              @click="props.selectAll"
              hide-details
            ></v-checkbox>
          </th>
          <th class="text-left" style="width: 5%">No.</th>
          <th class="text-left" style="width: 10%">Icon</th>
          <th class="text-center" style="width: 50%">Name</th>
          <th class="text-left" style="width: 30%">Action</th>
        </tr>
      </template>
      <template v-slot:item="{ item, index }">
        <tr>
          <td>
            <v-checkbox v-model="item.selected" hide-details></v-checkbox>
          </td>
          <td>{{ index + 1 }}</td>
          <td>
            <v-img :src="item.icon" max-height="30" max-width="30"></v-img>
          </td>
          <td class="text-center">{{ item.name }}</td>
          <td>
            <v-btn icon @click="editItem(item)" class="mx-2">
              <v-icon class="primary--text">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteItem(item)" class="mx-2">
              <v-icon class="red--text">mdi-close</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
      <template v-slot:footer>
        <v-data-footer
          :pagination="pagination"
          :items-per-page-text="$t('global.itemsPerPageText')"
          @update:options="onOptionsUpdate"
          class="pagination"
        />
      </template>
    </v-data-table>

    <!-- Dialog for adding technology -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Technology</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12" sm="6">
                <v-file-input
                  v-model="logo"
                  label="Logo"
                  prepend-icon="mdi-upload"
                  accept="image/png, image/jpeg, image/svg+xml"
                  outlined
                  required
                ></v-file-input>
                <v-img :src="logo" max-height="100" max-width="100" class="mt-2"></v-img>
                <small class="caption">
                  Logo must be .SVG or PNG
                  <br />
                  Recommended size 240 x 240 px
                </small>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="technologyName"
                  label="Technology name"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="black" :disabled="!valid" @click="saveTechnology">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
        valid: false,
        logo: '',
        technologyName: '',
        selected: [],
        itemsPerPage: 10,
        options: {},
        pagination: {},
        search: '',
        headers: [
          { text: 'No.', align: 'start', sortable: false, value: 'no' },
          { text: 'Icon', value: 'icon' },
          { text: 'Name', value: 'name' },
          { text: 'Action', value: 'action', sortable: false },
        ],
        items: [
          {
            name: 'Vue.js',
            icon: 'https://cdn.vuetifyjs.com/images/logos/logo.svg',
          },
          {
            name: 'Java',
            icon: 'https://cdn.vuetifyjs.com/images/logos/java.svg',
          },
          // Thêm các mục khác nếu cần
        ],
      }
    },
    computed: {
      filteredItems() {
        return this.items.filter(item => {
          return item.name.toLowerCase().includes(this.search.toLowerCase())
        })
      },
    },
    methods: {
      editItem(item) {
        // Hàm chỉnh sửa
        console.log('Edit', item)
      },
      deleteItem(item) {
        // Hàm xóa
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?') &&
          this.items.splice(index, 1)
      },
      deleteSelected() {
        // Hàm xóa các mục đã chọn
        this.selected.forEach(item => {
          const index = this.items.indexOf(item)
          if (index > -1) {
            this.items.splice(index, 1)
          }
        })
        this.selected = []
      },
      addTechnology() {
        // Mở dialog thêm công nghệ
        this.dialog = true
      },
      saveTechnology() {
        // Lưu công nghệ mới
        this.items.push({
          name: this.technologyName,
          icon: this.logo,
        })
        this.dialog = false
      },
      onOptionsUpdate(newOptions) {
        this.options = newOptions
      },
    },
  }
</script>

<style>
  .data-table-container {
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    padding: 16px;
    background-color: #fff;
  }
  .v-data-table-header th {
    font-weight: bold;
  }
  .v-btn {
    margin: 0 5px;
    border-radius: 12px;
  }
  .v-data-table .v-input--selection-controls__input {
    margin: 0 auto;
  }
  td {
    vertical-align: middle !important;
  }
  .text-center {
    text-align: center !important;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .pagination .v-data-footer__select {
    margin-right: auto;
  }
  .search-bar {
    max-width: 300px;
    margin-right: auto; /* Aligns the search bar to the left */
    border: 1px solid #e0e0e0;
    border-radius: 25px;
    padding-left: 15px;
  }
  .search-bar {
    max-width: 300px;
    margin-right: auto; /* Aligns the search bar to the left */
    border-radius: 25px;
    background-color: white; /* Set background color to white */
  }
  .v-text-field--outlined .v-input__control {
    border-radius: 25px;
    border: 1px solid #dcdcdc;
    background-color: white; /* Set background color to white */
  }
  .v-text-field--outlined .v-input__control .v-input__slot {
    border-radius: 25px;
    padding: 10px;
    background-color: white; /* Set background color to white */
  }
  .v-text-field--outlined .v-input__control::before,
  .v-text-field--outlined .v-input__control::after {
    border-bottom: none !important; /* Remove the underline */
  }
  .v-field--variant-filled .v-field__overlay {
    background-color: white;
  }
  .v-field__outline {
    --v-field-border-width: 0px;
  }
</style>
