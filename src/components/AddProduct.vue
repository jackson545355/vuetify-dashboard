<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="addstep1">
    <v-breadcrumbs divider="mdi-chevron-right" class="custom-breadcrumbs">
      <v-breadcrumbs-item href="/dashboard/Product" class="custom-breadcrumbs-item">
        <v-icon left>mdi-arrow-left</v-icon>
        Products
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <div class="addstepcontent">
      <v-stepper class="step" :items="['Step 1',]">
        <template v-slot:[`item.1`]>
          <v-card title="We need to some information of new product" flat>
            <v-form>
              <v-card>
                <v-card-text>
                  <h3>Basic</h3>
                  <v-text-field label="Product name (English)" v-model="productNameEn" required></v-text-field>
                  <v-text-field label="Product name (Japanese)" v-model="productNameJp" required></v-text-field>
                  <v-text-field label="Short description (English)" v-model="shortDescriptionEn"
                    required></v-text-field>
                  <v-text-field label="Short description (Japanese)" v-model="shortDescriptionJp"
                    required></v-text-field>
                  <v-textarea label="Full description (English)" v-model="fullDescriptionEn" required></v-textarea>
                  <v-textarea label="Full description (Japanese)" v-model="fullDescriptionJp" required></v-textarea>
                  <v-radio-group v-model="status" row>
                    <template v-slot:label>Status *</template>
                    <v-radio label="Demo" value="demo"></v-radio>
                    <v-radio label="Implementing" value="implementing"></v-radio>
                  </v-radio-group>
                  <h3>Techniques</h3>
                  <v-select :items="platformTags" label="Platform Tag *" v-model="platformTag" required></v-select>
                  <v-select :items="technologyFrameworks" label="Technology Frameworks *" v-model="technologyFramework"
                    required></v-select>
                  <v-select :items="tools" label="Tool *" v-model="tool" required></v-select>
                </v-card-text>
              </v-card>
            </v-form>

          </v-card>
        </template>

        <!-- <template v-slot:[`item.2`]>
          <v-card title="Step Two" flat>...</v-card>
        </template>

        <template v-slot:[`item.3`]>
          <v-card title="Step Three" flat>...</v-card>
        </template> -->
      </v-stepper>
    </div>
  </div>
</template>

<script>
import "../assets/css/AddProductStep1.css";
export default {
  name: "BreadcrumbExample",
  data: () => ({
    finished: false,

    productNameEn: '',
    productNameJp: '',
    shortDescriptionEn: '',
    shortDescriptionJp: '',
    fullDescriptionEn: '',
    fullDescriptionJp: '',
    status: '',
    platformTag: '',
    technologyFramework: '',
    tool: '',
    platformTags: ['Tag1', 'Tag2', 'Tag3'],
    technologyFrameworks: ['Framework1', 'Framework2', 'Framework3'],
    tools: ['Tool1', 'Tool2', 'Tool3'],

  }),

  methods: {
    onClickFinish() {
      this.finished = true;

      alert("Finished");
    },
    nextStep() {
      // Xử lý logic cho bước tiếp theo
    },
  },
};
</script>
