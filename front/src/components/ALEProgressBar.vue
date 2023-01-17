<template>
    <div class="slidecontainer">
        <input type="range" min="1" max="100" :value="valueP" class="slider" id="myRange"/>
        <!-- DEBUG  ONLY -->
        <!-- <v-slider max="100" min="0" v-model="valueP"/>
        <br/>
        {{ this.valueP }}
        <br/>

        {{ new Date() }} -->
    </div>
</template>


<style>
.slidecontainer {
    width: 100%;
}

.slider {
    -webkit-appearance: none;
    width: 100%;
    height: 50px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.slider:hover {
    opacity: 1;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 50px;
    height: 50px;
    background-color: #04AA6D;
    background: url('../assets/deliverymanIcon.gif');
    background-size: 100%;
    cursor: pointer;
}

.slider::-webkit-range{
        width: 50px;
            height: 50px;
            background: #04AA6D;
            cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 50px;
    height: 50px;
    background: #04AA6D;
    cursor: pointer;
}
</style>



<script>
import { timeouts } from 'retry';

export default {
    name:'ALEProgressBar',
    setup() {
        
    },
    props: {
    },
    data: () => ({
        valueP : 50,
    }),
    mounted() {
        console.log("monted");
        this.timerFunction();
    },
    methods:
    {
        async timerFunction()
        {
            this.valueP = 0;
            for (let i = 0; i < 100; i++) {
                this.valueP++;
                await new Promise(r => setTimeout(r, 1000));
            }
        }
    }
}
</script>