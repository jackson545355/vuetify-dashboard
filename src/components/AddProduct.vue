<template>
  <div class="addstep1">
    <v-breadcrumbs divider="mdi-chevron-right" class="custom-breadcrumbs">
      <v-breadcrumbs-item href="/dashboard/Product" class="custom-breadcrumbs-item">
        <v-icon left class="icon">mdi-arrow-left</v-icon>
        Products
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <div class="addstepcontent">
      <v-card flat>
        <v-form ref="form">
          <v-card-text>
            <h1>We need some information of new product!</h1>
            <br />
            <h2>Basic</h2>
            <br />
            <h4>Product name <span class="redstar">*</span></h4>
            <v-text-field label="English" v-model="productNameEn" required :rules="[v => !!v || 'Product Name is required']"></v-text-field>
            <v-text-field label="日本語" v-model="productNameJp" required :rules="[v => !!v || '製品名は必須です']"></v-text-field>
            <h4>Short description <span class="redstar">*</span></h4>
            <v-text-field label="English" v-model="shortDescriptionEn" required :rules="[v => !!v || 'Short description is required']"></v-text-field>
            <v-text-field label="日本語" v-model="shortDescriptionJp" required :rules="[v => !!v || '簡単な説明が必要です']"></v-text-field>
            <h4>Full description <span class="redstar">*</span></h4>
            <v-textarea label="English" v-model="fullDescriptionEn" required :rules="[v => !!v || 'Full description is required']"></v-textarea>
            <v-textarea label="日本語" v-model="fullDescriptionJp" required :rules="[v => !!v || '完全な説明が必要です']"></v-textarea>
            <h2>Status <span class="redstar">*</span></h2>
            <br />
            <v-radio-group v-model="status" :rules="[v => !!v || 'Status is required']" row>
              <v-radio label="Demo" value="demo"></v-radio>
              <v-radio label="Implementing" value="implementing"></v-radio>
            </v-radio-group>
            <h2>Techniques</h2>
            <br />
            <h4>Platform Tag <span class="redstar">*</span></h4>
            <v-select :items="platformTags" label="Platform Tag" v-model="platformTag" required :rules="[v => !!v || 'Platform Tag is required']"></v-select>
            <h4>Technology Framework <span class="redstar">*</span></h4>
            <v-select :items="technologyFrameworks" label="Technology Frameworks" v-model="technologyFramework" required :rules="[v => !!v || 'Platform Tag is required']"></v-select>
            <h4>Tools <span class="redstar">*</span></h4>
            <v-select :items="tools" label="Tool" v-model="tool" required :rules="[v => !!v || 'Platform Tag is required']"></v-select>
            <h4 style="color: grey; text-align:center;">Click the button below to submit the product information.</h4>
            <v-btn color="primary" @click="validateForm">Submit</v-btn>
          </v-card-text>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import "../assets/css/AddProductStep1.css";
export default {
  name: "BreadcrumbExample",
  data: () => ({
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
    validateForm() {
      if (this.$refs.form.validate()) {
        this.submitForm();
      }
    },
    async submitForm() {
      try {
        const response = await axios.post('http://127.0.0.1:8080/product/add', {
          productNameEn: this.productNameEn,
          productNameJp: this.productNameJp,
          shortDescriptionEn: this.shortDescriptionEn,
          shortDescriptionJp: this.shortDescriptionJp,
          fullDescriptionEn: this.fullDescriptionEn,
          fullDescriptionJp: this.fullDescriptionJp,
          // status: this.status,
          // platformTag: this.platformTag,
          // technologyFramework: this.technologyFramework,
          // tool: this.tool,
        });
        console.log('Product added:', response.data);
        // Optionally, redirect or show a success message
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },
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
