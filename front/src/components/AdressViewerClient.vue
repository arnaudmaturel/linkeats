<template>
    <v-card id="form" rounded="5" elevation="0">
        <div id="header">
            <h5 id="title">
                Liste des adresses
            </h5>
            <div>
                <v-btn rounded="pill" id="btn" elevation="6" @click="addAddr()" icon="mdi-home-plus" />
            </div>
        </div>
        <div id="middle"></div>
        <div id="img">
            <v-card id="infPart" max-height="450px" class="overflow-y-auto">
                <v-expansion-panels>
                    <v-expansion-panel v-for="address in addresses" :key="address">
                        <!-- IN PROGRESS ORDER -->
                            <v-expansion-panel-title>
                                <v-row>
                                    <v-col class="ma-auto" cols="8">
                                        {{ address.name }}
                                    </v-col>

                                    <!-- <v-col cols="5">
                                        {{ address.address }}
                                    </v-col> -->

                                    <v-col cols="2">
                                        <v-btn rounded="pill" id="btn" icon="mdi-home-edit" @click="editAddr(address)"/>
                                    </v-col>

                                    <v-col cols="2" >
                                        <v-btn rounded="pill" id="btn" icon="mdi-home-remove"  @click="onRemoveAddr(address)" />
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-title>

                            <v-expansion-panel-text>
                                <v-row style="vertical-align=middle">
                                    <v-col cols="10">
                                        <v-row>
                                            <v-col>
                                                Addresse : {{ address.address }}
                                            </v-col>
                                            <!-- <v-col>
                                                Code postal : {{  address.cp }}
                                            </v-col> -->
                                        </v-row>
                                        <!-- <v-row>
                                            <v-col>
                                                Latitude : {{ address.lat }}
                                            </v-col>
                                            <v-col>
                                                Longitude : {{ address.long }}
                                            </v-col>
                                        </v-row> -->
                                    </v-col>
                                    <!-- <v-col>
                                        <v-btn icon="mdi-map-clock" />
                                    </v-col> -->
                                </v-row>
                            </v-expansion-panel-text>

                    </v-expansion-panel>
                </v-expansion-panels>

            </v-card>
        </div>


        <!-- DIALOG ADD ADDR -->
        <v-dialog v-model="dialogAddr">
            <addreess-edit ref="fdAddr" :data="dataEdit" @on-close="dialogAddr = false" @on-validated="addrValidated"/>
        </v-dialog>

        <!-- DIALOG SHOW MAP -->
        <v-dialog v-model="dialogMap">
           <view-client-loc-order @on-close="dialogMap = false" />
        </v-dialog>
        
    </v-card>
</template>

<script>

import ALEProgressBar from '@/components/ALEProgressBar.vue'
import AddreessEdit from './AddreessEdit.vue';

const DEFAULT_VALUE = { name: '', lat: 1, long: 50, cp: '', address: '', city: '' };
export default {
    components: {
        ALEProgressBar,
        AddreessEdit
    },
    props: {
    },
    async created()
    {
        await this.refreshData();
    },
    data: () => ({
        scrollInvoked: 0,
        isEdditing : false,
        dialogAddr: false,
        dialogMap: false,
        addresses: [],
                // { name: 'Home', lat: 1.0545682695334841, long: 49.427447623056295,  cp:'76140', address:'106 rue des frères delattres' , city:'Le Petit-Quevilly'  },
                // { name: 'Parent', lat: 1.0700076823176903, long: 49.41908420837877,  cp:'76140', address:'50/52 rue gambetta' , city:'Le Petit-Quevilly'  },
                // { name: 'CESI', lat: 1.075156398367302, long: 49.38240286389411, cp: '76800', address: '80 avenue Edmund Halley Rouen Madrillet Innovation', city: 'Saint - Étienne - du - Rouvray' } 
        // ],
        nameAddr: -1,
        addrSelected: "none",
        dataEdit: { name: '', lat: 1, long: 50, cp: '', address: '', city: '' },
    }),
    methods: {
        async addrValidated() {
            if (this.isEdditing)
                // put => update
            {
                console.log("updating adrress");
                let newAddr = {
                    name: this.dataEdit.name,
                    address: this.dataEdit.address,
                    latitude: this.dataEdit.latitude,
                    longitude: this.dataEdit.longitude,
                };
                await this.$store.dispatch('UpdateAddress', {id:this.dataEdit._id, data: newAddr});
            }
            else
            // post => create
            {
                console.log("adding adrress");
                let newAddr = {
                    name : this.dataEdit.name,
                    address: this.dataEdit.address,
                    latitude: this.dataEdit.latitude,
                    longitude: this.dataEdit.longitude,
                    IDUser: localStorage.getItem('userId'),
                    UserRole: 1,
                };
                await this.$store.dispatch('CreateAddress', newAddr);
            }

            this.dialogAddr = false;
            await this.refreshData();
        },
        addAddr()
        {
            this.isEdditing = false;
            Object.assign(this.dataEdit, DEFAULT_VALUE);
            this.dialogAddr = true;
        },
        editAddr(value)
        {
            this.isEdditing = true;
            this.dataEdit = {};
            Object.assign(this.dataEdit, value);
            this.dialogAddr = true;
        },
        async onRemoveAddr(addr) {
            await this.$store.dispatch('DeletedAddress', addr._id);
            await this.refreshData();
        },
        async refreshData()
        {
            await this.$store.dispatch('getAddressInfo', localStorage.getItem('userId'));
            this.addresses = this.$store.state.adresses.addresses;
        }
    },

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
</style>