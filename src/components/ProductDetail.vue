<template>
    <v-container>
        <!-- Button to trigger the dialog -->
        <v-btn color="primary" @click="dialog = true">Show Details</v-btn>

        <!-- The Dialog component -->
        <v-dialog v-model="dialog" max-width="900px">
            <v-card class="custom-dialog-card">
                <!-- Dialog Header -->
                <v-card-title class="d-flex justify-space-between align-center">
                    <!-- Left Side: Logo and Title -->
                    <div class="d-flex align-center">
                        <v-img :src=this.product.logo class="logo mr-2"></v-img>
                        <v-col>
                            <v-row>
                                <div>
                                    <span class="headline">{{ this.product.name }}</span>
                                    <v-chip class="ml-2" small>{{ this.product.platform }}</v-chip>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="version mr-3">Version {{ this.product.version }}</div>
                            </v-row>
                        </v-col>
                    </div>

                    <!-- Right Side: Version, Heart Icon, and Go Intropage Button -->
                    <div class="d-flex align-center">
                        <v-btn icon @click="toggleFavorite">
                            <v-icon :color="this.product.isFavorite ? 'red' : 'grey'">mdi-heart</v-icon>
                        </v-btn>
                        <v-btn @click="goToIntropage" variant="elevated" size="large" color="primary">
                            <span style="color: white;">Go Intropage</span>
                        </v-btn>
                    </div>
                </v-card-title>

                <!-- Dialog Content -->
                <v-card-text class="pb-0">
                    <!-- Carousel Section -->
                    <!-- <div class="carousel-wrapper mb-3">
                        <v-carousel height="400px" show-arrows="hover" cycle hide-delimiter-background>
                            <v-carousel-item v-for="(image, i) in product.images" :key="i" :src="image">
                            </v-carousel-item>
                        </v-carousel>
                    </div> -->
                    <Carousel/>
                    


                    <v-row class="tech-tools-section">
                        <!-- Description Section -->
                        <v-col cols="12" sm="6">
                            <h4>Description</h4>
                            {{ this.product.descripton }}
                            <p><b><a :href=this.product.intropage target="_blank">Open live site <svg
                                            xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15"
                                            viewBox="0 0 48 48" color="blue">
                                            <path
                                                d="M 40.960938 4.9804688 A 2.0002 2.0002 0 0 0 40.740234 5 L 28 5 A 2.0002 2.0002 0 1 0 28 9 L 36.171875 9 L 22.585938 22.585938 A 2.0002 2.0002 0 1 0 25.414062 25.414062 L 39 11.828125 L 39 20 A 2.0002 2.0002 0 1 0 43 20 L 43 7.2460938 A 2.0002 2.0002 0 0 0 40.960938 4.9804688 z M 12.5 8 C 8.3826878 8 5 11.382688 5 15.5 L 5 35.5 C 5 39.617312 8.3826878 43 12.5 43 L 32.5 43 C 36.617312 43 40 39.617312 40 35.5 L 40 26 A 2.0002 2.0002 0 1 0 36 26 L 36 35.5 C 36 37.446688 34.446688 39 32.5 39 L 12.5 39 C 10.553312 39 9 37.446688 9 35.5 L 9 15.5 C 9 13.553312 10.553312 12 12.5 12 L 22 12 A 2.0002 2.0002 0 1 0 22 8 L 12.5 8 z">
                                            </path>
                                        </svg></a></b></p>
                        </v-col>

                        <!-- Technologies & Tools Section -->
                        <v-col cols="12" sm="6">
                            <h4>Technologies</h4>
                            <br />
                            <v-row>
                                <v-img v-for="technology in this.product.technologies" :key="technology" :src="technology.image"
                                    class="masterItems"></v-img>
                            </v-row>
                            <br />
                            <h4>Tools</h4>
                            <br />
                            <v-row>
                                <v-img v-for="tool in this.product.tools" :key="tool" :src="tool.image" class="masterItems"></v-img>
                            </v-row>
                        </v-col>
                    </v-row>
                    <br />
                    <hr />

                    <!-- Comments Section -->
                    <h4>Leave a comment</h4>
                    <br />
                    <v-row>
                        <v-avatar :image="this.user.avatar" style="margin-top:5px; margin-right: 10px;"></v-avatar>
                        <v-text-field v-model="this.user.comment" label="What do you think?" clearable append-icon="mdi-send"
                            variant="solo" @click:append="addComment" class="mb-3"></v-text-field>
                    </v-row>
                    <!-- <v-text-field v-model="this.user.comment" label="What do you think?" variant="solo"> 
                        <div>
                            <v-avatar :image="this.user.avatar"></v-avatar>
                            <v-btn color="blue" @click:="addComment">Send</v-btn>
                        </div>  
                    </v-text-field> -->


                    <!-- Display Comments -->
                    <v-list dense>
                        <v-list-item v-for="comment in comments" :key="comment">
                            <v-list-item-avatar>
                                <v-avatar :image="comment.avatar" class="masterItems"></v-avatar>
                            </v-list-item-avatar>
                            <v-list-item-content style="margin-left: 10px;">
                                <v-list-item-title>{{ comment.name }}<span style="font-size: small; color: rgb(206, 205, 205); font-weight:300;"> - {{comment.time}}</span></v-list-item-title>
                                <v-list-item-subtitle>{{ comment.message }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <br />
                    </v-list>
                </v-card-text>

                <!-- Dialog Actions -->
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import '../assets/css/ProductDetail.css';
import Carousel from './Carousel.vue';

export default {
    components:{
        Carousel,
    },
    data() {
        return {
            dialog: false,
            user: {
                avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
                name: 'User',
                comment: '',
            },
            product: {
                name: 'HRGs',
                platform: 'Web app',
                logo: 'https://cdn.vuetifyjs.com/images/logos/logo.svg',
                version: '1.0',
                isFavorite: false,
                intropage: 'https://your-intropage-url.com',
                images: [
                    require('../assets/images/cubesystem_logo.jpg'),
                    'https://via.placeholder.com/300x200',
                    require('../assets/images/cubelogo.jpg'),
                ],
                descripton: 'Human resource management system, timekeeping, contract, salary calculation for the organization.',
                technologies: [
                    { image: "https://cdn.vuetifyjs.com/images/logos/logo.svg" },
                    { image: require("../assets/images/javaIcon.jpg") },
                ],
                tools: [
                    { image: require("../assets/images/vscodeIcon.jpg") },
                    { image: require("../assets/images/figmaIcon.jpg") }
                ],
            },
            comments: [
                { name: 'Alex', avatar: require('../assets/images/defaultLogo.png'), time:'4 hours ago', message: 'Awesome' },
                { name: 'Elijah B', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', time:'3 days ago', message: 'Amazing, I love it' },
                { name: 'Katana', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', time:'1 year ago', message: 'Great job' }
            ],
        };
    },
    methods: {
        toggleFavorite() {
            this.product.isFavorite = !this.product.isFavorite;
        },
        goToIntropage() {
            window.location.href = this.product.intropage;
        },
        addComment() {
            if (this.user.comment) {
                this.comments.push({
                    name: this.user.name,
                    avatar: this.user.avatar,
                    time: 'now',
                    message: this.user.comment,
                });
                this.user.comment = '';
            }
        }
    }
};
</script>

<style scoped></style>