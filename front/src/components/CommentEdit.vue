<template>
    <v-container>
        <v-card id="form" rounded="5" elevation="0" class="mx-auto">
            <div id="header">
                <h5 id="title">
                    Edition du Commentaire
                </h5>
                <div>
                    <v-btn rounded="pill" id="btn" elevation="6" @click="this.$emit('on-close')"
                        icon="mdi-close-thick" />
                </div>
            </div>
            <div id="middle"></div>
            <div id="img">
                <div id="infPart">
                        <v-row>
                            <v-col class="ma-auto">
                                <h6>Titre :</h6>
                                <v-text-field v-model="e" clearable
                                    placeholder="Entrez le titre du commentaire" variant="outlined" color="black">
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                                <h6>Evaluation :</h6>
                                <v-rating v-model="rating" density="compact" color="rgb(255, 152, 0)" active-color="rgb(255, 152, 0)" half-increments hover size="x-large"/>

                        </v-row>
                        
                        <v-row>
                            <v-col class="ma-auto">
                                <h6>Description :</h6>
                                <v-textarea v-model="data"
                                    placeholder="Entrez le nom de l'adresse" variant="outlined" color="black">
                                </v-textarea>
                            </v-col>
                        </v-row>

                        <br/>

                        <v-row>
                            <v-col class="ma-auto">
                                <div style="justify-content=center; text-align: center;">
                                    <v-btn id="btn" size="large" rounded="pill"
                                        :ripple="{ class: 'text-orange', center: true }">
                                        Valider
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>

                </div>
            </div>
        </v-card>

    </v-container>
</template>

<script>
import hereIcon from '@/assets/homeMarker.png'
import { ref } from 'vue'

export default {
    name: 'CommentEdit',
    props:
    {
    },
    data:() => {
    },
    methods: {
        cancelExpand(e) {
            e.cancelBubble = true;
        },
    },
}
</script>

<style scoped>
#maps {
    width: 100%;
    height: 250px !important;
    padding: 10px;
}

#btn {
    background-color: rgb(255, 152, 0);
    color: white;
}

#rowTitle {

    padding: 20px;
    padding-bottom: 20px;
}

#middle {
    background-color: rgb(228, 228, 228);
    height: 3px;
    width: 100%;
}

#infPart,
#signUpPart {
    padding: 5%;
    padding-top: 2%;
}


#form {
    border: solid 3px rgb(228, 228, 228);
    background-color: white;
    font-family: MyFont;
    width: 22cm;
}

#img {
    background-image: url('../assets/linkEats_transp10.png');
    background-size: contain;
    background-position: center;
}

#title {
    text-align: center;
}
</style>