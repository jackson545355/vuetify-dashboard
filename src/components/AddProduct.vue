<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="addstep1">
    <v-breadcrumbs divider="mdi-chevron-right" class="custom-breadcrumbs">
      <v-breadcrumbs-item
        href="/dashboard/Product"
        class="custom-breadcrumbs-item"
      >
        <v-icon left>mdi-arrow-left</v-icon>
        Products
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <div class="addstepcontent">
      <v-stepper class="step" :items="['Step 1', 'Step 2', 'Step 3']">
        <template v-slot:[`item.1`]>
          <v-card title="Step One" flat>...</v-card>
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
  }),

  methods: {
    onClickFinish() {
      this.finished = true;

      alert("Finished");
    },
  },
};
</script>
