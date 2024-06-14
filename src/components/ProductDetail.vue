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
                        <v-img src='https://cdn.vuetifyjs.com/images/logos/logo.svg' class="logo mr-2"></v-img>
                        <v-col>
                            <v-row>
                                <div>
                                    <span class="headline">HRGs</span>
                                    <v-chip class="ml-2" small>Web app</v-chip>
                                </div>
                            </v-row>
                            <v-row>
                                <div class="version mr-3">Version 1.0</div>
                            </v-row>
                        </v-col>
                    </div>

                    <!-- Right Side: Version, Heart Icon, and Go Intropage Button -->
                    <div class="d-flex align-center">
                        <v-btn icon @click="toggleFavorite">
                            <v-icon :color="isFavorite ? 'red' : 'grey'">mdi-heart</v-icon>
                        </v-btn>
                        <v-btn @click="goToIntropage" variant="elevated" size="large" color="primary">
                            <span style="color: white;">Go Intropage</span>
                        </v-btn>
                    </div>
                </v-card-title>

                <!-- Dialog Content -->
                <v-card-text class="pb-0">
                    <!-- Carousel Section -->
                    <div class="carousel-wrapper mb-3">
                        <v-carousel class="custom-carousel" hide-delimiters cycle show-arrows height="300px">
                            <v-carousel-item v-for="(image, i) in images" :key="i" :src="image"></v-carousel-item>
                        </v-carousel>
                    </div>


                    <v-row class="tech-tools-section">
                        <!-- Description Section -->
                        <v-col cols="12" sm="6">
                            <v-list-item class="pb-3">
                                <v-list-item-content>
                                    <h4>Description</h4>
                                    Human resource management system, timekeeping, contract, salary calculation for the
                                    organization.
                                    <v-btn text class="mt-2" href="https://your-live-site.com" target="_blank">Open live
                                        site</v-btn>
                                </v-list-item-content>
                            </v-list-item>
                        </v-col>

                        <!-- Technologies & Tools Section -->
                        <v-col cols="12" sm="6">
                            <h4>Technologies</h4>
                            <br/>
                            <v-row>
                                <v-img v-for="technology in technologies" :key="technology" :src="technology.image" class="masterItems"></v-img>
                            </v-row>
                            <br/>
                            <h4>Tools</h4>
                            <br/>
                            <v-row>
                                <v-img v-for="tool in tools" :key="tool" :src="tool.image" class="masterItems"></v-img>
                            </v-row>
                        </v-col>
                    </v-row>
                    <hr />

                    <!-- Comments Section -->
                    <h4>Leave a comment</h4>

                    <v-text-field v-model="comment" label="What do you think?" clearable append-icon="mdi-send"
                        variant="solo" @click:append="addComment" class="mb-3"></v-text-field>

                    <!-- Display Comments -->
                    <v-list dense>
                        <v-list-item v-for="comment in comments" :key="comment">
                            <v-list-item-avatar>
                                <v-avatar :image="comment.avatar" class="masterItems"></v-avatar>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{ comment.name }}</v-list-item-title>
                                <v-list-item-subtitle>{{ comment.message }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <br/>
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
import '../assets/css/ProductDetail.css'

export default {
    data() {
        return {
            dialog: false,
            isFavorite: false,
            //User
            avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
            comment: '',
            technologies: [
                { image: "https://cdn.vuetifyjs.com/images/logos/logo.svg" },
                { image: require("../assets/images/javaIcon.jpg") },
            ],
            tools: [
                { image: require("../assets/images/vscodeIcon.jpg") },
                { image: require("../assets/images/figmaIcon.jpg") }
            ],
            images: [
                require('../assets/images/cubesystem_logo.jpg'),
                'https://via.placeholder.com/300x200',
            ],
            comments: [
                { name: 'Alex', avatar: require('../assets/images/defaultLogo.png'), message: 'Awesome' },
                { name: 'Elijah B', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', message: 'Amazing, I love it' },
                { name: 'Katana', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', message: 'Great job' }
            ]
        };
    },
    methods: {
        toggleFavorite() {
            this.isFavorite = !this.isFavorite;
        },
        goToIntropage() {
            window.location.href = 'https://your-intropage-url.com';
        },
        addComment() {
            if (this.comment) {
                this.comments.push({
                    name: 'New User',
                    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
                    message: this.comment
                });
                this.comment = '';
            }
        }
    }
};
</script>

<style scoped></style>