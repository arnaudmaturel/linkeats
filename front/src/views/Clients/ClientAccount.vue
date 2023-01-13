<template>
    <div>

        <v-container>
            <v-row>
                <v-col class="ma-auto" id="account-title">
                        <h1>Mon compte</h1>
                </v-col>
            </v-row>

            <v-tabs id="tabMenu" centered grow v-model="tab" dir="Horizontale" hide-slider="true" color="transparent"
                active-class="active">
                <v-tab id="tabItem" v-for="menu in menus" :key="menu" :value="menu.title" ripple="false">
                    <div id="tabItemDiv">
                        <v-btn id="tabItemBtn" :class="(tab == menu.title) ? 'tabItemDivActic' : 'tabItemDiv'"
                            rounded="pill" width="100%">
                            <v-icon start>
                                mdi-account
                            </v-icon>
                            {{ menu.title }}
                        </v-btn>
                    </div>
                </v-tab>
            </v-tabs>
            <br />


            <div id="contentMainCard" class="d-flex">
                <v-window id="tabWindow" v-model="tab">
                    <v-window-item v-for="menu in menus" :key="menu" :value="menu.title" :ref="menu.title">
                        <div v-if="menu.component == 'GeneralInfoClient'">
                            <GeneralInfoClient />
                        </div>
                        <div v-else-if="menu.component == 'CredentialInfo'">
                            <CredentialInfo/>
                        </div>
                        <div v-else>
                            Not general client
                        </div>
                    </v-window-item>
                </v-window>

            </div>
        </v-container>
    </div>
</template>




<!-- SCRPIT -->
<script lang="js">

// Components
import GeneralInfoClient from '@/components/GeneralInfoClient.vue'
import CredentialInfo from '@/components/CredentialInfo.vue';

export default {
    name: 'ClientAccount',
    userRole: "Client",
    components: {
        GeneralInfoClient,
        CredentialInfo,
    },
    data: () => ({
        tab: 'Général',
        width: 100,
        menus: [
            { 'title': 'Général', 'component': "GeneralInfoClient" },
            { 'title': 'Sécurité', 'component': "CredentialInfo" },
            { 'title': 'Commandes', 'component': "GeneralInfoClient" },
            { 'title': 'Addresses', 'component': "GeneralInfoClient" },
            { 'title': 'Stars (preview)', 'component': "" },
            { 'title': 'Linker (preview)', 'component': "" }
        ]
    }),
    setCurrentTab(value) {
        activTitle = value;
    }
}
</script>





<!-- STYLE -->
<style>
#account-title {
    vertical-align: middle;
    text-align: center;
    justify-content: center;
    display: flex;
    padding-top: 40px;
    padding-bottom: 40px;
}

#borderMainCard {
    background-color: rgb(255, 152, 0);
    height: 80%;
}


#backgroundMainCard {
    background-color: white;
    color: rgb(0, 0, 0);
    height: 100%;
}

#contentMainCard {
    height: 650px;
    justify-content: center;
}

#tabMenu:hover {
    padding-left: 0px;
    background-color: transparent !important;
    /* color: transparent !important;
    color: rgb(249, 250, 250) !important; */
    color-scheme: transparent !important;
}

.tabItemDiv {
    color: black !important;
}

.tabItemDivActic {
    color: white !important;
    background-color: rgb(255, 152, 0) !important;
}


#tabWindow {
    width: 50%;
}

#btnTab {
    color: rgb(255, 152, 0);
}
</style>