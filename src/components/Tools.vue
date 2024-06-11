<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="data-table-container">
        <v-toolbar flat color="white">
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search Tools" hide-details
                class="search-bar" single-line outlined></v-text-field>
            <v-spacer></v-spacer>
            <div class="btn-container">
                <v-btn color="red" class="mx-2" variant="elevated" size="large" @click="openDeleteSelectedDialog" :disabled="selected.length === 0">Delete</v-btn>
                <v-btn color="black" class="mx-2" variant="elevated" size="large" @click="openAddDialog">
                    <v-icon left>mdi-plus</v-icon>
                    Add tool
                </v-btn>
            </div>
        </v-toolbar>

        <br />

        <v-data-table 
            v-model="selected" 
            :headers="headers" 
            :items="filteredItems" 
            item-value="name" 
            show-select
            class="elevation-1" 
            :items-per-page="itemsPerPage" 
            :search="search">
            <template v-slot:headers="props">
                <tr class="custom-header">
                    <th class="text-left custom-checkbox-cell" style="width: 5%">
                        <v-checkbox v-model="props.all" :indeterminate="props.indeterminate" 
                        @click="selectAll" hide-details></v-checkbox>
                    </th>
                    <th class="text-left" style="width: 5%">No.</th>
                    <th class="text-left" style="width: 10%">Icon</th>
                    <th class="text-center" style="width: 40%">Name</th>
                    <th class="text-center custom-action-cell" style="width: 40%">Action</th>
                </tr>
            </template>
            <template v-slot:item="{ item, index }">
                <tr>
                    <td>
                        <v-checkbox v-model="selected" :value="item" hide-details></v-checkbox>
                    </td>
                    <td>{{ index + 1 }}</td>
                    <td>
                        <v-img :src="item.icon" max-height="30" max-width="30"></v-img>
                    </td>
                    <td class="text-center">{{ item.name }}</td>
                    <td class="text-center">
                        <v-btn icon @click="editItem(item)" class="mx-2">
                            <v-icon class="primary--text">mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon @click="openDeleteDialog(item)" class="mx-2">
                            <v-icon class="red--text" color="red">mdi-close</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
            <template v-slot:footer>
                <v-container>
                    <v-row justify="space-between" align="center">
                        <v-col class="d-flex align-center">
                            <v-select
                              v-model="itemsPerPage"
                              :items="itemsPerPageOptions"
                              class="mr-2"
                              hide-details
                              dense
                              outlined
                              :style="{ width: '60px' }"
                            />
                            <span>{{ itemsPerPage }} items per page</span>
                        </v-col>
                        <v-col class="text-end">
                            <v-pagination
                              v-model="page"
                              :length="pagination.length"
                              :total-visible="7"
                              prev-icon="mdi-chevron-left"
                              next-icon="mdi-chevron-right"
                              class="pagination-custom"
                            ></v-pagination>
                        </v-col>
                    </v-row>
                </v-container>
            </template>
        </v-data-table>
    </div>

    <!-- Dialog for adding or editing tool -->
    <v-dialog v-model="addDialog" max-width="600px" class="ma-20">
        <v-card rounded="lg">
            <v-card-title>
                <span class="headline">{{ editMode ? 'Edit' : 'Add' }} Tools</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-row>
                        <v-col cols="12"><h4>Logo <span class="redstar">*</span></h4></v-col>
                        <v-col cols="12" sm="3">
                            <v-img :src="logo || require('../assets/images/defaultLogo.png')" max-height="100"
                                max-width="100" class="mt-2"></v-img>
                        </v-col>
                        <v-col cols="12" sm="9">
                            <v-file-input v-model="logoFile" label="Logo" prepend-icon="mdi-upload"
                                accept="image/png, image/jpeg, image/svg+xml" outlined variant="outlined" required
                                @change="onFileChange"></v-file-input>
                            <small class="caption">
                                Logo must be .SVG or PNG
                                <br />
                                Recommended size 240 x 240 px
                            </small>
                        </v-col>
                        <v-col cols="12"><h4>Tool name <span class="redstar">*</span></h4></v-col>
                        <v-col cols="12">
                            <v-text-field v-model="toolName" label="Tool name" variant="outlined"
                                :rules="[v => !!v || 'Tool name is required']" required></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black" size="large" text @click="addDialog = false">Cancel</v-btn>
                <v-btn color="black" size="large" variant="elevated" :disabled="!valid"
                    @click="editMode ? updateTool() : saveTool()">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Dialog for deleting tool -->
    <v-dialog v-model="deleteDialog" max-width="500" class="ma-20">
        <v-card rounded="lg">
            <v-card-title class="headline">Confirm Delete</v-card-title>
            <v-card-text>Are you sure you want to delete this tool?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black" text @click="deleteDialog = false">Cancel</v-btn>
                <v-btn color="red" variant="elevated" text v-if="selected.length === 0" @click="confirmDelete">Confirm</v-btn>
                <v-btn color="red" variant="elevated" text v-else @click="confirmDeleteSelected">Confirm</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Notification for deleted a Tool -->
    <v-snackbar v-model="snackbar" timeout="3000" top right>
        Tool has been deleted
        <template v-slot:actions>
            <v-btn color="red" variant="text" @click="snackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import '../assets/css/MasterItems.css'
export default {
    data() {
        return {
            //Delete data
            deleteDialog: false,
            itemToDelete: null,
            snackbar: false,
            //Edit mode
            editMode: false,
            editItemData: null,

            //Add/Edit data (add and edit method using the same dialog)
            addDialog: false,
            valid: false,
            logo: '',
            logoFile: null,
            toolName: '',
            //Pagination
            itemsPerPage: 10,
            itemsPerPageOptions: [10, 20, 30, 40, 50],
            page: 1,
            pagination: {
                length: 1,
            },
            //Data table
            search: '',
            headers: [
                { text: 'No.', align: 'start', sortable: false, value: 'no' },
                { text: 'Icon', value: 'icon' },
                { text: 'Name', value: 'name' },
                { text: 'Action', value: 'action', sortable: false },
            ],
            items: [
                {
                    name: 'VS Code',
                    icon: require('../assets/images/vscodeIcon.jpg'),
                },
                {
                    name: 'Figma',
                    icon: require('../assets/images/figmaIcon.jpg'),
                },
            ],
            
            //Other
            selected: [],
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
        // Select all items
        selectAll(props) {
            if (props.all) {
                this.selected = [...this.filteredItems];
            } else {
                this.selected = [];
            }
        },
        // Open add dialog
        openAddDialog() {
            this.resetForm();
            this.addDialog = true;
            this.editMode = false;
        },
        // Open edit dialog
        editItem(item) {
            this.resetForm();
            this.addDialog = true;
            this.editMode = true;
            this.editItemData = item;
            this.logo = item.icon;
            this.toolName = item.name;
        },
        // Reset edit/add form
        resetForm() {
            this.logo = '';
            this.logoFile = null;
            this.toolName = '';
            this.editItemData = null;
        },
        // Handle file change
        onFileChange(e) {
            const file = e.target.files[0];
            if (file) {
                this.logo = URL.createObjectURL(file);
            }
        },
        // Save Tool
        saveTool() {
            this.items.push({
                name: this.toolName,
                icon: this.logo,
            });
            this.addDialog = false;
            this.resetForm();
        },
        // Update Tool
        updateTool() {
            if (this.editItemData) {
                this.editItemData.name = this.toolName;
                this.editItemData.icon = this.logo;
            }
            this.addDialog = false;
            this.resetForm();
        },
        // Delete item
        openDeleteDialog(item) {
            this.itemToDelete = item;
            this.deleteDialog = true;
        },
        confirmDelete() {
            this.deleteDialog = false;
            this.snackbar = true;
            this.deleteItem(this.itemToDelete);
        },
        deleteItem(item) {
            const index = this.items.indexOf(item);
            if (index > -1) {
                this.items.splice(index, 1);
            }
        },
        // Delete selected items
        openDeleteSelectedDialog() {
            this.deleteDialog = true;
        },
        confirmDeleteSelected() {
            this.deleteDialog = false;
            this.snackbar = true;
            this.deleteSelected();
        },
        deleteSelected() {
            this.selected.forEach(item => {
                const index = this.items.indexOf(item);
                if (index > -1) {
                    this.items.splice(index, 1);
                }
            });
            this.selected = [];
        },
    },
}
</script>
