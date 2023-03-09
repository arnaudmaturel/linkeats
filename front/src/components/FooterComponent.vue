<template>
    <v-footer id="footer">
        <v-row justify="center" no-gutters id="row" >
            <v-btn v-for="link in links" :key="link" elevation="0" id="btn">
                <router-link :to="link.link">
                    {{ translate(link.title) }}
                </router-link>
            </v-btn>
            <v-btn elevation="0" id="btn" href="http://localhost:3000/api">
                {{ translate("nav_doc") }}
            </v-btn>
            <v-col class="text-center mt-4" cols="12">
                {{ new Date().getFullYear() }} — <strong>LinkEats!</strong>
            </v-col>
        </v-row>
    </v-footer>
</template>


<script>
export default {
    data: () => ({
        links: [
            {'title':'nav_home','link':'/'},
            {'title':'nav_restaurateur', 'link':'/restaurateur/login'},
            {'title':'nav_deliveryman','link':'/deliveryman/login'},
            {'title':'nav_developer','link':'/developper/login'},
            {'title':'nav_about','link':'/about'},
            {'title':'nav_confidentiality','link':'/confidentiality'},
            {'title':'nav_contact','link':'/contact-us'},
        ],
        file: {}
    }),
    created() {
        const fileLang = localStorage.getItem("codeLang") || "FR_fr"
        this.file = require(`@/assets/lang/${fileLang}.json`);  
    },
    methods: {
        translate(wordKey) {
            return this.file[wordKey]
        },
    }
}
</script>


<!--      STYLE -->
<style scoped>
#btn {
    background-color: rgba(255, 153, 0, 0);
    color: white;
}

footer
{
    background-image: linear-gradient(to bottom,rgba(0, 105, 146,1),rgba(39, 71, 110, 1));
    color: white;
    height: 100px;
    width: 100%;
}

a {
    color: white;
    text-decoration: none;
}
</style>