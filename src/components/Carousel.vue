<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="carousel">
        <div class="inner" ref="inner" :style="innerStyles">
            <div class="card" v-for="card in cards" :key="card">
                <v-img :src=card><v-btn @click="next" variant="text" :ripple="false" style="height:100%; width:50%"></v-btn></v-img>
            </div>
        </div>
    </div>
    <!-- <div class="btn-container">
        <v-btn @click="prev">prev</v-btn>
        <v-btn @click="next">next</v-btn>
    </div> -->
</template>

<script>
export default {
    props:[
        
    ],
    data() {
        return {
            cards: [
                require('../assets/images/cubesystem_logo.jpg'),
                'https://via.placeholder.com/300x200',
                require('../assets/images/cubelogo.jpg'),
            ],
            innerStyles: {},
            step: '',
            transitioning: false
        }
    },
    mounted() {
        this.setStep()
        this.resetTranslate()
    },

    methods: {
        setStep() {
            const innerWidth = this.$refs.inner.scrollWidth
            const totalCards = this.cards.length
            this.step = `${innerWidth / totalCards}px`
        },

        next() {
            if (this.transitioning) return

            this.transitioning = true

            this.moveLeft()

            this.afterTransition(() => {
                const card = this.cards.shift()
                this.cards.push(card)
                this.resetTranslate()
                this.transitioning = false
            })
        },

        prev() {
            if (this.transitioning) return

            this.transitioning = true

            this.moveRight()

            this.afterTransition(() => {
                const card = this.cards.pop()
                this.cards.unshift(card)
                this.resetTranslate()
                this.transitioning = false
            })
        },

        moveLeft() {
            this.innerStyles = {
                transform: `translateX(-${this.step})
                      translateX(-${this.step})`
            }
        },

        moveRight() {
            this.innerStyles = {
                transform: `translateX(${this.step})
                      translateX(-${this.step})`
            }
        },

        afterTransition(callback) {
            const listener = () => {
                callback()
                this.$refs.inner.removeEventListener('transitionend', listener)
            }
            this.$refs.inner.addEventListener('transitionend', listener)
        },

        resetTranslate() {
            this.innerStyles = {
                transition: 'none',
                transform: `translateX(-${this.step})`
            }
        }
    }
}
</script>

<style>
.carousel {
    width: 100%;
    height: 400px;
    overflow: hidden;
}

.inner {
    transition: transform 0.2s;
    white-space: nowrap;
}

.card {
    width: 60%;
    margin-right: 10px;
    display: inline-flex;

    /* optional */
    height: 400px;
    color: white;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
}

.btn-container{
    justify-content: center;
}

@media (max-width: 900px) {
    .carousel {
        width: 100%;
        height: 300px;
    }
    .card{
        height: 300px;
        width: 80%;
    }
}

@media (max-width: 600px) {
    .carousel {
        width: 100%;
        height: 250px;
    }
    .card{
        height: 250px;
        width: 80%;
    }
}

@media (max-width: 400px) {
    .carousel {
        width: 100%;
        height: 200px;
    }
    .card{
        height: 200px;
        width: 80%;
    }
}
</style>