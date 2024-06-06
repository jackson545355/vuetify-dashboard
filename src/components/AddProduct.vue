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
      <v-stepper class="step" :items="['Main Infor', 'Link & media', 'Launch']">
        <template v-slot:[`item.1`]>
          <v-card flat>
            <v-form>
              <v-card>
                <v-card-text>
                  <h1>We need to some information of new product!</h1>
                  <br/>
                  <h2>Basic</h2>
                  <br />
                  <h4>Product name <span class="redstar">*</span></h4>
                  <v-text-field label="English" v-model="productNameEn" required
                    :rules="[v => !!v || 'Product Name is required']"></v-text-field>
                  <v-text-field label="日本語" v-model="productNameJp" required
                    :rules="[v => !!v || '製品名は必須です']"></v-text-field>
                  <h4>Short description <span class="redstar">*</span></h4>
                  <v-text-field label="English" v-model="shortDescriptionEn" required
                    :rules="[v => !!v || 'Short description is required']"></v-text-field>
                  <v-text-field label="日本語" v-model="shortDescriptionJp" required
                    :rules="[v => !!v || '簡単な説明が必要です']"></v-text-field>
                  <h4>Full description <span class="redstar">*</span></h4>
                  <v-textarea label="English" v-model="fullDescriptionEn" required
                    :rules="[v => !!v || 'Full description is required']"></v-textarea>
                  <v-textarea label="日本語" v-model="fullDescriptionJp" required
                    :rules="[v => !!v || '完全な説明が必要です']"></v-textarea>
                  <h2>Status <span class="redstar">*</span></h2>
                  <br />
                  <v-radio-group v-model="status" :rules="[v => !!v || 'Status is required']" row>
                    <v-radio label="Demo" value="demo"></v-radio>
                    <v-radio label="Implementing" value="implementing"></v-radio>
                  </v-radio-group>
                  <h2>Techniques</h2>
                  <br />
                  <h4>Platform Tag <span class="redstar">*</span></h4>
                  <v-select :items="platformTags" label="Platform Tag" v-model="platformTag" required
                    :rules="[v => !!v || 'Platform Tag is required']"></v-select>
                  <h4>Technology Framework <span class="redstar">*</span></h4>
                  <v-select :items="technologyFrameworks" label="Technology Frameworks" v-model="technologyFramework"
                    required :rules="[v => !!v || 'Platform Tag is required']"></v-select>
                  <h4>Tools <span class="redstar">*</span></h4>
                  <v-select :items="tools" label="Tool" v-model="tool" required
                    :rules="[v => !!v || 'Platform Tag is required']"></v-select>
                  <H4 style="color: grey; text-align:center;">Click to below button or "Image & Media" part on tab bar
                    to add media for product.</H4>
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
import axios from 'axios';
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
    validateForm() {
      if (this.$refs.form.validate()) {
        this.submitForm();
      }
    },
    async submitForm() {
      try {
        //link API
        const response = await axios.post('api/Product/add', {
          productNameEn: this.productNameEn,
          productNameJp: this.productNameJp,
          shortDescriptionEn: this.shortDescriptionEn,
          shortDescriptionJp: this.shortDescriptionJp,
          fullDescriptionEn: this.fullDescriptionEn,
          fullDescriptionJp: this.fullDescriptionJp,
          status: this.status,
          platformTag: this.platformTag,
          technologyFramework: this.technologyFramework,
          tool: this.tool
        });
        console.log('Product added:', response.data);
        // this.step++;
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },
    nextStep() {
      // Xử lý logic cho bước tiếp theo
    },
  },
};
</script>
