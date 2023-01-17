<template>
    <v-card id="form" rounded="5" elevation="0">
        <div id="header">
            <h5 id="title">
                Liste des adresses
            </h5>
            <div>
                <v-btn rounded="pill" id="btn" elevation="6" @click="dataEdit = { name: '', lat: 1, long: 50, cp: '', address: '', city: '' }; dialogAddr=true" icon="mdi-home-plus" />
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
                                    <v-col>
                                        {{ address.name }}
                                    </v-col>

                                    <v-col cols="5">
                                        {{ address.address }}
                                    </v-col>

                                    <v-col offset="3">
                                        <v-btn rounded="pill" icon="mdi-home-edit" @click="onEditAddr(address)"/>
                                    </v-col>

                                    <v-col >
                                        <v-btn rounded="pill" icon="mdi-home-remove"  @click="onRemoveAddr(address)" />
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-title>

                            <v-expansion-panel-text>
                                <v-row style="vertical-align=middle">
                                    <v-col cols="10">
                                        <v-row>
                                            <v-col>
                                                City : {{ address.city }}
                                            </v-col>
                                            <v-col>
                                                Code postal : {{  address.cp }}
                                            </v-col>
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
                                    <v-col>
                                        <v-btn icon="mdi-map-clock" />
                                    </v-col>
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
           <view-client-loc-order @on-close="dialog = false" />
        </v-dialog>
        
    </v-card>
</template>

<script>

import ALEProgressBar from '@/components/ALEProgressBar.vue'
import AddreessEdit from './AddreessEdit.vue';

export default {
    components: {
        ALEProgressBar,
        AddreessEdit
    },
    props: {
    },
    data: () => ({
        scrollInvoked: 0,
        dialogAddr: false,
        dialogMap: false,
        addresses: [
            { name: 'Home', lat: 1.0545682695334841, long: 49.427447623056295,  cp:'76140', address:'106 rue des frères delattres' , city:'Le Petit-Quevilly'  },
            { name: 'Parent', lat: 1.0700076823176903, long: 49.41908420837877,  cp:'76140', address:'50/52 rue gambetta' , city:'Le Petit-Quevilly'  },
            { name: 'CESI', lat: 1.075156398367302, long: 49.38240286389411, cp: '76800', address: '80 avenue Edmund Halley Rouen Madrillet Innovation', city: 'Saint - Étienne - du - Rouvray' } 
        ],
        nameAddr: -1,
        addrSelected: "none",
        dataEdit: { name: '', lat: 1, long: 50, cp: '', address: '', city: '' },
    }),
    methods: {
        addrValidated() {

            let newAddr = {
                name: this.$refs.fdAddr.data.name,
                lat: 1,
                long: 50,
                cp: this.$refs.fdAddr.data.cp,
                address: this.$refs.fdAddr.data.addr,
                city: this.$refs.fdAddr.data.city,
            };

            this.addresses.push(newAddr);
            dialogAddr = false;
        },
        onRemoveAddr(addr) {
            this.addresses.pop(addr);
        },
        onEditAddr(addr) {
            this.dataEdit = {};

            Object.defineProperty(this.dataEdit,'cp', {
                value: addr.cp,
                writable: true
            });

            Object.defineProperty(this.dataEdit, 'name', {
                value: addr.name,
                writable: true
            });

            Object.defineProperty(this.dataEdit, 'city', {
                value: addr.city,
                writable: true
            });

            Object.defineProperty(this.dataEdit, 'addr', {
                value: addr.address,
                writable: true
            });
            // this.dataEdit.cp = addr.cp;
            // this.dataEdit.nameAddr = addr.name;
            // this.dataEdit.city = addr.city;
            // this.dataEdit.addr = addr.address;

            this.dialogAddr = true;
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