<template>
    <v-card id="form" rounded="5" elevation="0">
        <div id="header">
            <h5 id="title">
                Discount à récuperer
            </h5>
            <div>
                <v-btn rounded="pill" id="btn" elevation="6" icon="mdi-close-thick" @click="this.$emit('on-close')" />
            </div>
        </div>
        <div id="middle"></div>
        <div id="img">
            <v-card id="infPart" :max-height="maxHeight" class="overflow-y-auto">
                <v-card v-for="discount in unclaimedDiscount" :key="discount" class="mb-4" rounded="pill" style="background-color: rgb(228, 228, 228); padding: 5px;" >
                    <v-card style="background-color: white; padding:15px; padding-left: 50px;" rounded="pill" elevation="0">
                        <v-row>
                            <v-col cols="2" class="ma-auto">
                                    <h5>{{ discount.Name }}</h5>
                            </v-col>

                            <v-col class="ma-auto">
                               Description : {{ discount.Description }}
                            </v-col>
                            
                            <v-col cols="3" class="ma-auto" style="text-align: right;">
                                Value : {{ (discount.Value/100) }}€
                            </v-col>                        
                            <v-col cols="1" class="ma-auto" style="text-align: right;">
                                <v-btn id="btn" icon="mdi-cash-100" @click="onClaimedDiscount(discount)" size="x-large"/>
                            </v-col>
                        </v-row>
                        
                    </v-card>
                </v-card>
            </v-card>
        </div>
    </v-card>
</template>

<script>
import DiscountState from "@/store/DiscountStatus";

export default {
    name: 'DiscountViewer',
    props: {
        maxHeight: null,
    },
    async created() {
    },
    data: () => ({
        
    }),
    props: {
        unclaimedDiscount: [],
    },
    methods: {
        async onClaimedDiscount(discount)
        {
            console.log("claiming discount");

            const infoC = {
                ClientWallet: this.$store.state.client.client.ClientWallet +  discount.Value,
            };

            discount.State = DiscountState.Claimed;

            this.$store.commit('UPDATE_CLIENT', infoC);

            await this.$store.dispatch("saveClient");
            await this.$store.dispatch("saveDisount",{id :discount._id, discount:discount});
            this.$emit("on-refresh");
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

#chipAdder {
    display: flex;
}

#chipAdderHeader {
    width: 95%;
}
</style>