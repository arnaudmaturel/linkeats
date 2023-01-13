<template>
    <v-footer id="footer">
        <v-row justify="center" no-gutters id="row" >
            <v-btn v-for="link in links" :key="link" elevation="0" id="btn" :href="link.link">
                {{ link.title }}
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
            {'title':'home','link':'/'},
            {'title': 'Restaurant', 'link':'/restaurant/login'},
            {'title':'Deliveryman','link':'/deliveryman/login'},
            {'title':'About us','link':'/about'},
            {'title':'Confidentiality','link':'/confidentiality'},
            {'title':'Contact Us','link':'/contact-us'},
        ],
    }),
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
</style>>