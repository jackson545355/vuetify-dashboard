<template>
    <v-card flat>
        <v-form ref="form">
            <v-card-text>
                <h1>We need some information about the new product!</h1>
                <br />
                <h2>Basic</h2>
                <br />
                <h4>Product name <span class="redstar">*</span></h4>
                <v-text-field label="English" v-model="productNameEn" required variant="solo"
                    :rules="[v => !!v || 'Product Name is required']"></v-text-field>
                <v-text-field label="日本語" v-model="productNameJp" required variant="solo"
                    :rules="[v => !!v || '製品名は必須です']"></v-text-field>
                <h4>Short description <span class="redstar">*</span></h4>
                <v-text-field label="English" v-model="shortDescriptionEn" required variant="solo"
                    :rules="[v => !!v || 'Short description is required']"></v-text-field>
                <v-text-field label="日本語" v-model="shortDescriptionJp" required variant="solo"
                    :rules="[v => !!v || '簡単な説明が必要です']"></v-text-field>
                <h4>Full description <span class="redstar">*</span></h4>
                <v-textarea label="English" v-model="fullDescriptionEn" required variant="solo"
                    :rules="[v => !!v || 'Full description is required']"></v-textarea>
                <v-textarea label="日本語" v-model="fullDescriptionJp" required variant="solo"
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
                <v-select :items="platformTags" label="Platform Tag" v-model="platformTag" required variant="solo"
                    :rules="[v => !!v || 'Platform Tag is required']"></v-select>
                <h4>Technology Framework <span class="redstar">*</span></h4>
                <v-select :items="technologyFrameworks" label="Technology Frameworks" v-model="technologyFramework"
                    required variant="solo" :rules="[v => !!v || 'Platform Tag is required']"></v-select>
                <h4>Tools <span class="redstar">*</span></h4>
                <v-select :items="tools" label="Tool" v-model="tool" required variant="solo"
                    :rules="[v => !!v || 'Platform Tag is required']"></v-select>
                <h4 style="color: grey; text-align:center;">Click the button below to submit the product information.
                </h4>
            </v-card-text>
        </v-form>
    </v-card>
</template>

<script>
export default {
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
};
</script>

<style>
.redstar {
    color: red;
}
</style>