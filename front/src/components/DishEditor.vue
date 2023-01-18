<template>
    <v-card id="form" rounded="5" elevation="0">
        <div id="header">
            <h5 id="title">
                Editeur de plat / boisson
            </h5>
            <div>
                <v-btn rounded="pill" id="btn" elevation="6" icon="mdi-close-thick" @click="this.$emit('on-close')" />
            </div>
        </div>
        <div id="middle"></div>


        <div id="img">
            <v-card id="infPart" :max-height="maxHeight" class="overflow-y-auto">

                <v-row>
                    <v-col class="ma-auto">
                        <h6>Nom du plat/boisson</h6>
                        <v-text-field v-model="dish.name" clearable placeholder="Entrez le nom du plat ou de la boisson"
                            variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>
                    <v-col class="ma-auto">
                        <h6>Prix</h6>
                        <v-text-field v-model="price" clearable placeholder="Entrez le prix du plat ou boisson"
                            variant="outlined" color="rgb(255, 152, 0)">
                        </v-text-field>
                    </v-col>
                </v-row>


                <v-row>
                    <v-col class="ma-auto" style="text-align:center">
                        PICTURES
                    </v-col>
                </v-row>


                <v-row>
                    <v-col>
                        <h6>Description</h6>
                        <v-textarea v-model="dish.Description"
                            placeholder="Entrez la description du plat ou de la boisson" variant="outlined"
                            color="rgb(255, 152, 0)" />
                    </v-col>
                </v-row>


                <div>
                    <div id="chipAdder">
                        <div id="chipAdderHeader">
                            <h6>Tags</h6>
                            <v-text-field  v-model="newTag" clearable placeholder="Entrez un tag" 
                            variant="outlined" color="rgb(255, 152, 0)" @keydown.enter="addTag()"/>
                        </div>
                        <v-btn icon="mdi-plus-thick" style="top:30px;" @click="addTag()"/>
                    </div>
                    <v-card>
                        <v-chip v-for="tag in tags" :key="tag" class="ma-2" style="color:white; background-color: rgb(252, 152, 0);" closable @click:close="removeTag(tag)">{{ tag }}</v-chip>
                    </v-card>
                </div>
                <br/>
                <div>
                    <div id="chipAdder">
                        <div id="chipAdderHeader">
                            <h6>Allergènes</h6>
                            <v-text-field  v-model="newAllgerne" clearable placeholder="Entrez un allergène" 
                            variant="outlined" color="rgb(255, 152, 0)" @keydown.enter="addAllergen()"/>
                        </div>
                        <v-btn icon="mdi-plus-thick" style="top:30px;" @click="addAllergen()"/>
                    </div>
                    <v-card>
                        <v-chip v-for="tag in allergenes" :key="tag" class="ma-2" style="color:white; background-color: rgb(252, 152, 0);" closable @click:close="removeAllergen(tag)">{{ tag }}</v-chip>
                    </v-card>
                </div>

                <v-row>
                    <v-col  class="ma-auto" style="text-align:center">
                        <v-btn icon="mdi-check-bold" style="color:white; background-color: rgb(252, 152, 0);" @click="saveModif"></v-btn>
                    </v-col>
                </v-row>

            </v-card>
        </div>
    </v-card>
</template>

<script>
export default {
    name: 'DishEditor',
    props: {
        maxHeight: null,
        width:null,
        dish: {
            name: String,
            price: Number,
            PicturePaths: String,
            Description: String,
            Tags: String,
            Allergens: String,
            Wheight: Number,
        },
    },
    mounted() {
        if (this.dish.Tags.trim()!='')
        this.tags = this.dish.Tags.split(';');
        if (this.dish.Allergens.trim()!='')
            this.allergenes = this.dish.Allergens.split(';');
        this.price = this.dish.price / 100;
    },
    data: () => ({
        newTag: '',
        newAllgerne: '',
        tags:[],// this.dish.Tags.split(';'),
        allergenes: [],
        price : 0,
    }),
    methods: {
        addTag() {
            if (!this.newTag || this.newTag.trim() == '') return;
            this.tags.push(this.newTag);
            this.newTag = '';
        },
        removeTag(tag) {
            var i = this.tags.indexOf(tag);
            if (i == -1)
                return;
            this.tags.splice(i, 1);
        },
        addAllergen() {
            if (!this.newAllgerne || this.newAllgerne.trim() == '') return;

            this.allergenes.push(this.newAllgerne);
            this.newAllgerne = '';
        },
        removeAllergen(allergen) {
            var i = this.allergenes.indexOf(allergen);
            if (i == -1)
                return;
            this.allergenes.splice(i, 1);
        },
        saveModif()
        {
            console.log(this.dish);
            this.dish.Tags = this.tags.join(';');
            this.dish.Allergens = this.allergenes.join(';');
            this.dish.price = this.price * 100;
            this.$emit('on-save')
        }


    }
}
</script>


<style>
#rowTitle {

    padding: 20px;
    padding-bottom: 20px;
}

#middle {
    background-color: rgb(228, 228, 228);
    height: 3px;
    width: 100%;
}

#infPart {
    width: 100%;
    padding: 5%;
    padding-top: 2%;
}


#form {
    border: solid 3px rgb(228, 228, 228);
    background-color: white;
    font-family: MyFont;
}

#img {
    background-image: url('../assets/linkEats_transp10.png');
    background-size: contain;
    background-position: center;
    /* opacity: 0.2; */
}

#title {
    text-align: center;
}

#orderStateSelected {
    background-color: rgb(255, 152, 0);
    color: white !important;
}

#orderState {
    color: black !important;
    background-color: white;
}

#chipAdder{
    display: flex;
}

#chipAdderHeader{
    width: 95%;
}
</style>