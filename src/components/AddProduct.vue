<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="addstep1">
    <v-breadcrumbs divider="mdi-chevron-right" class="custom-breadcrumbs">
      <v-breadcrumbs-item href="/dashboard/Product" class="custom-breadcrumbs-item">
        <v-icon left class="icon">mdi-arrow-left</v-icon>
        Products
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <div class="addstepcontent">
      <!-- <v-stepper v-model="activeStep">
        <v-stepper-header>
          <v-stepper-step :complete="activeStep > 1" step="1">Main Info</v-stepper-step>
          <v-stepper-step :complete="activeStep > 2" step="2">Link & Media</v-stepper-step>
          <v-stepper-step step="3">Launch</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <step1 v-if="activeStep === 1" ref="step1"></step1>
            <v-btn @click="nextStep">Next</v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <step2 v-if="activeStep === 2" ref="step2"></step2>
            <v-btn @click="prevStep">Back</v-btn>
            <v-btn @click="nextStep">Next</v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <step3 v-if="activeStep === 3" ref="step3"></step3>
            <v-btn @click="prevStep">Back</v-btn>
            <v-btn @click="submitForm">Submit</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper> -->
      <v-stepper editable :items="['Main Info', 'Link & Media', 'Launch']">
        <template v-slot:item.1>
          <v-card flat>
            <Step1 />
          </v-card>
        </template>
      
        <template v-slot:item.2>
          <v-card flat>
            <Step2 />
          </v-card>
        </template>
      
        <template v-slot:item.3>
          <v-card flat>
            <Step3 />
          </v-card>
        </template>
      </v-stepper>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Step1 from './AddProductStep1.vue';
import Step2 from './AddProductStep2.vue';
import Step3 from './AddProductStep3.vue';
import "../assets/css/AddProductStep1.css";

export default {
  name: "AddProduct",
  components: {
    Step1,
    Step2,
    Step3,
  },
  data: () => ({
    activeStep: 1,
  }),
  methods: {
    nextStep() {
      this.activeStep++;
    },
    prevStep() {
      this.activeStep--;
    },
    async submitForm() {
      try {
        // Collect data from Step 1
        const step1Data = this.$refs.step1.$data;

        const productData = {
          name_eng: step1Data.productNameEn,
          name_jp: step1Data.productNameJp,
          sdescription_eng: step1Data.shortDescriptionEn,
          sdescription_jp: step1Data.shortDescriptionJp,
          fdescription_eng: step1Data.fullDescriptionEn,
          fdescription_jp: step1Data.fullDescriptionJp,
          status: step1Data.status
          // Add more data from other steps as needed
        };

        console.log('Submitting form with data:', productData);
        const response = await axios.post('http://localhost:8080/product/add', { data: productData });
        console.log('Product added:', response.data);
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
